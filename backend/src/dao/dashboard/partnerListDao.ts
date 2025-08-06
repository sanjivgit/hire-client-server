import { Op } from "sequelize";
import { generateRes, generateResForPagination } from "../../utils/generateRes";
const db = require("../../../db/models/index");

interface PartnerListQuery {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
}

class PartnerListDao {
    private partners: any;
    private users: any;
    private sequelize: any;
    private service_types: any;
    private accepted_services: any;

    constructor() {
        this.partners = db.partners;
        this.users = db.users;
        this.sequelize = db.sequelize;
        this.service_types = db.service_types;
        this.accepted_services = db.accepted_services;
    }

    getPartnerList = async (query: PartnerListQuery) => {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const offset = (page - 1) * limit;

        let whereClause: any = {};
        let userWhereClause: any = {};

        // Add status filter if provided
        if (query.status && query.status !== 'all') {
            whereClause.status = query.status;
        }

        // Add search filter if provided
        if (query.search) {
            userWhereClause[Op.or] = [
                { name: { [Op.iLike]: `%${query.search}%` } },
                { 'address.address': { [Op.iLike]: `%${query.search}%` } }
            ];
        }

        const { count, rows } = await this.partners.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: this.users,
                    as: 'user',
                    required: true,
                    where: userWhereClause,
                    attributes: ['name', 'email', 'profile_pic', 'address'],
                },
                {
                    model: this.service_types,
                    as: 'service_type',
                    required: true,
                    attributes: ['name'],
                }
            ],
            attributes: ['id', 'first_name', 'last_name', 'status', 'created_at'],
            order: [['created_at', 'DESC']],
            limit,
            offset,
            raw: true,
            nest: true
        });

        const totalPages = Math.ceil(count / limit);

        return generateResForPagination(
            rows,
            count,
            page,
            limit,
            {
                totalPages: totalPages
            });
    };

    getPartnerListWithServiceStats = async (query: PartnerListQuery) => {
        try {
            const page = query.page || 1;
            const limit = query.limit || 10;
            const offset = (page - 1) * limit;

            // Using Sequelize's query parameters to prevent SQL injection
            const queryParams = {
                limit,
                offset,
                status: query.status && query.status !== 'all' ? query.status : null,
                search: query.search ? `%${query.search}%` : null
            };

            // Using raw SQL query with parameterized queries
            const query_sql = `
                SELECT 
                    p.id,
                    p.first_name,
                    p.last_name,
                    p.status,
                    p.created_at,
                    u.name,
                    u.profile_pic,
                    st.name as service_type_name,
                    COUNT(CASE WHEN as2.status = 'accepted' THEN 1 ELSE NULL END) as pending_count,
                    COUNT(CASE WHEN as2.status = 'completed' THEN 1 ELSE NULL END) as completed_count,
                    COUNT(CASE WHEN as2.status = 'cancelled' THEN 1 ELSE NULL END) as cancelled_count,
                    COALESCE(SUM(CASE WHEN as2.status = 'completed' THEN as2.amount ELSE 0 END), 0) as total_earnings
                FROM partners p
                JOIN users u ON p.user_id = u.id
                JOIN service_types st ON p.service_type_id = st.id
                LEFT JOIN accepted_services as2 ON p.id = as2.partner_id
                WHERE 1=1
                ${queryParams.status ? 'AND p.status = :status' : ''}
                ${queryParams.search ? 'AND (u.name ILIKE :search OR u.address->>\'address\' ILIKE :search)' : ''}
                GROUP BY p.id, p.first_name, p.last_name, p.status, p.created_at, u.name, u.profile_pic, st.name
                ORDER BY p.created_at DESC
                LIMIT :limit OFFSET :offset
            `;

            const count_sql = `
                SELECT COUNT(DISTINCT p.id) as total
                FROM partners p
                JOIN users u ON p.user_id = u.id
                WHERE 1=1
                ${queryParams.status ? 'AND p.status = :status' : ''}
                ${queryParams.search ? 'AND (u.name ILIKE :search OR u.address->>\'address\' ILIKE :search)' : ''}
            `;

            // Execute the queries with parameters
            const [rows, countResult] = await Promise.all([
                this.sequelize.query(query_sql, {
                    replacements: queryParams,
                    type: this.sequelize.QueryTypes.SELECT
                }),
                this.sequelize.query(count_sql, {
                    replacements: queryParams,
                    type: this.sequelize.QueryTypes.SELECT
                })
            ]);

            const count = parseInt(countResult[0]?.total || '0');
            const totalPages = Math.ceil(count / limit);

            return generateResForPagination(
                rows,
                count,
                page,
                limit,
                {
                    totalPages: totalPages
                });
        } catch (error) {
            console.error("Error in getPartnerListWithServiceStats:", error);
            throw error;
        }
    };
}

export default PartnerListDao; 