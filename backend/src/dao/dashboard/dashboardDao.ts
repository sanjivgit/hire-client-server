import { generateRes } from "../../utils/generateRes";
const db = require("../../../db/models/index");

class DashboardDao {
    private partners: any;
    private users: any;
    private sequelize: any;

    constructor() {
        this.partners = db.partners;
        this.users = db.users;
        this.sequelize = db.sequelize;
    }

    getPartnerStatistics = async () => {
        try {
            const [
                totalPartners,
                pendingPartners,
                rejectedPartners,
                activePartners
            ] = await Promise.all([
                this.partners.count(),
                this.partners.count({ where: { status: 'pending' } }),
                this.partners.count({ where: { status: 'rejected' } }),
                this.partners.count({ where: { status: 'approved' } })
            ]);

            return {
                totalPartners,
                pendingPartners,
                rejectedPartners,
                activePartners
            };
        } catch (error) {
            throw error;
        }
    };

    getLatestPartners = async () => {
        try {
            const latestPartners = await this.partners.findAll({
                include: [
                    {
                        model: this.users,
                        as: 'user',
                        attributes: ['profile_pic', 'name']
                    }
                ],
                order: [['created_at', 'DESC']],
                limit: 10,
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                    'status',
                    'created_at'
                ]
            });

            return latestPartners.map((partner: any) => ({
                id: partner.id,
                name: partner.user?.name || `${partner.first_name} ${partner.last_name}`,
                profilePic: partner.user?.profile_pic || null,
                status: partner.status,
                timestamp: partner.created_at
            }));
        } catch (error) {
            throw error;
        }
    };
}

export default DashboardDao; 