import { Op } from "sequelize";
import { generateRes, generateResForPagination } from "../../utils/generateRes";
const db = require("../../../db/models/index");

interface PartnerHistoryQuery {
    partnerId: number;
    page?: number;
    limit?: number;
    search?: string;
}

class PartnerHistoryDao {
    private sequelize: any;
    private accepted_services: any;
    private service_requests: any;
    private services: any;
    private users: any;

    constructor() {
        this.sequelize = db.sequelize;
        this.accepted_services = db.accepted_services;
        this.service_requests = db.service_requests;
        this.services = db.services;
        this.users = db.users;
    }

    getPartnerWorkingHistory = async (query: PartnerHistoryQuery) => {
        try {
            const partnerId = query.partnerId;
            const page = query.page || 1;
            const limit = query.limit || 10;
            const offset = (page - 1) * limit;

            if (isNaN(partnerId) || partnerId <= 0) {
                throw new Error("Invalid partner ID");
            }

            // Using Sequelize's query parameters to prevent SQL injection
            const queryParams = {
                partnerId,
                limit,
                offset,
                search: query.search ? `%${query.search}%` : null
            };

            // Using raw SQL query with parameterized queries
            const query_sql = `
                SELECT 
                    as2.id,
                    as2.status,
                    as2.amount,
                    as2.created_at,
                    as2.updated_at,
                    u.address,
                    s.name as service_name,
                    u.name as user_name,
                    u.profile_pic as user_profile_pic
                FROM accepted_services as2
                JOIN service_requests sr ON as2.service_request_id = sr.id
                JOIN services s ON sr.service_id = s.id
                JOIN users u ON sr.user_id = u.id
                WHERE as2.partner_id = :partnerId
                ${queryParams.search ? 'AND (s.name ILIKE :search OR u.address ILIKE :search OR u.name ILIKE :search)' : ''}
                ORDER BY as2.created_at DESC
                LIMIT :limit OFFSET :offset
            `;

            const count_sql = `
                SELECT COUNT(*) as total
                FROM accepted_services as2
                JOIN service_requests sr ON as2.service_request_id = sr.id
                JOIN services s ON sr.service_id = s.id
                JOIN users u ON sr.user_id = u.id
                WHERE as2.partner_id = :partnerId
                ${queryParams.search ? 'AND (s.name ILIKE :search OR u.address ILIKE :search OR u.name ILIKE :search)' : ''}
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
            console.error("Error in getPartnerWorkingHistory:", error);
            throw error;
        }
    };

    getPartnerWorkStats = async (partnerId: number) => {
        try {
            if (isNaN(partnerId) || partnerId <= 0) {
                throw new Error("Invalid partner ID");
            }

            // Using Sequelize's query parameters to prevent SQL injection
            const queryParams = {
                partnerId
            };

            // Using raw SQL query with parameterized queries
            const query_sql = `
                SELECT 
                    COALESCE(SUM(as2.amount), 0) as total_amount,
                    COUNT(CASE WHEN as2.status = 'completed' THEN 1 ELSE NULL END) as completed_count,
                    COUNT(CASE WHEN as2.status = 'pending' THEN 1 ELSE NULL END) as pending_count,
                    COUNT(CASE WHEN as2.status = 'cancelled' THEN 1 ELSE NULL END) as cancelled_count,
                    p.id as partner_id,
                    p.first_name,
                    p.last_name,
                    p.status as partner_status,
                    u.name as user_name,
                    u.profile_pic,
                    u.email,
                    st.name as service_type_name
                FROM accepted_services as2
                JOIN partners p ON as2.partner_id = p.id
                JOIN users u ON p.user_id = u.id
                JOIN service_types st ON p.service_type_id = st.id
                WHERE as2.partner_id = :partnerId
                GROUP BY p.id, p.first_name, p.last_name, p.status, u.name, u.profile_pic, u.email, st.name
            `;

            // Execute the query with parameters
            const result = await this.sequelize.query(query_sql, {
                replacements: queryParams,
                type: this.sequelize.QueryTypes.SELECT
            });

            if (result.length === 0) {
                // If no services found, get partner info only
                const partnerSql = `
                    SELECT 
                        p.id as partner_id,
                        p.first_name,
                        p.last_name,
                        p.status as partner_status,
                        u.name as user_name,
                        u.profile_pic,
                        u.email,
                        st.name as service_type_name
                    FROM partners p 
                    JOIN users u ON p.user_id = u.id
                    JOIN service_types st ON p.service_type_id = st.id
                    WHERE p.id = :partnerId
                `;

                const partnerInfo = await this.sequelize.query(partnerSql, {
                    replacements: queryParams,
                    type: this.sequelize.QueryTypes.SELECT
                });

                if (partnerInfo.length === 0) {
                    throw new Error("Partner not found");
                }

                return {
                    ...partnerInfo[0],
                    total_amount: 0,
                    completed_count: 0,
                    pending_count: 0,
                    cancelled_count: 0
                };
            }

            return result[0];
        } catch (error) {
            console.error("Error in getPartnerWorkStats:", error);
            throw error;
        }
    };
}

export default PartnerHistoryDao; 