import { generateRes } from "../../utils/generateRes";
const db = require("../../../db/models/index");

class PartnerDetailDao {
    private partners: any;
    private users: any;
    private sequelize: any;
    private partner_services: any;
    private services: any;
    private service_types: any;
    private files: any;

    constructor() {
        this.partners = db.partners;
        this.users = db.users;
        this.sequelize = db.sequelize;
        this.partner_services = db.partner_services;
        this.services = db.services;
        this.service_types = db.service_types;
        this.files = db.files;
    }

    getPartnerById = async (partnerId: number) => {
        const partner = await this.partners.findOne({
            where: { id: partnerId },
            include: [
                {
                    model: this.users,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'phone', 'address', 'profile_pic']
                },
                {
                    model: this.service_types,
                    as: 'service_type',
                    attributes: ['id', 'name']
                },
                {
                    model: this.files,
                    as: 'aadhar_image',
                    attributes: ['id']
                },
                {
                    model: this.files,
                    as: 'additional_document',
                    attributes: ['id']
                },
                {
                    model: this.services,
                    as: 'services',
                    through: { attributes: [] }, // Exclude the junction table attributes
                    attributes: ['id', 'name']
                }
            ],
            attributes: [
                'id',
                'first_name',
                'last_name',
                'user_id',
                'service_type_id',
                'aadhar_number',
                'aadhar_image_id',
                'additional_document_id',
                'status',
                'created_at',
                'updated_at'
            ]
        });

        if (!partner) {
            return null;
        }

        // If user has profile_pic, fetch the file separately
        if (partner.user && partner.user.profile_pic) {
            const profilePic = await this.files.findByPk(partner.user.profile_pic);
            if (profilePic) {
                partner.user.profilePicData = profilePic;
            }
        }

        return generateRes(partner);
    };
}

export default PartnerDetailDao; 