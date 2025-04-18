import { generateRes } from "../../utils/generateRes";
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

    constructor() {
        this.partners = db.partners;
        this.users = db.users;
        this.sequelize = db.sequelize;
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
            userWhereClause[this.sequelize.Op.or] = [
                { name: { [this.sequelize.Op.iLike]: `%${query.search}%` } },
                { 'address.address': { [this.sequelize.Op.iLike]: `%${query.search}%` } }
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
            ],
            attributes: ['id', 'first_name', 'last_name', 'status', 'created_at'],
            order: [['created_at', 'DESC']],
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        return generateRes(
            rows,
            count,
            page,
            limit,
            {
                totalPages
            });
    };
}

export default PartnerListDao; 