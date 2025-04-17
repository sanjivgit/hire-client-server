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
    private reasons: any;

    constructor() {
        this.partners = db.partners;
        this.users = db.users;
        this.sequelize = db.sequelize;
        this.partner_services = db.partner_services;
        this.services = db.services;
        this.service_types = db.service_types;
        this.files = db.files;
        this.reasons = db.reasons;
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
                },
                {
                    model: this.reasons,
                    as: 'reason',
                    attributes: ['reason']
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

    rejectPartner = async (partnerId: number, reason: string) => {
        // First, check if partner exists
        const partner = await this.partners.findByPk(partnerId);
        if (!partner) {
            return null;
        }

        // Use a transaction to ensure data consistency
        const transaction = await this.sequelize.transaction();

        try {
            // Update partner status to suspended
            await partner.update({
                status: 'suspended'
            }, { transaction });

            // Check if a reason already exists for this partner
            const existingReason = await this.reasons.findOne({
                where: { partner_id: partnerId }
            });

            if (existingReason) {
                // Update the existing reason
                await existingReason.update({
                    reason: reason
                }, { transaction });
            } else {
                // Create a new reason entry
                await this.reasons.create({
                    partner_id: partnerId,
                    reason: reason
                }, { transaction });
            }

            // Commit the transaction
            await transaction.commit();

            // Create a notification for the partner (if you have notification system)
            // This is a placeholder for notification logic
            // await createNotification(partner.user_id, 'Your application has been rejected', reason);

            return { success: true, message: 'Partner application rejected successfully' };
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            throw error;
        }
    };

    approvePartner = async (partnerId: number) => {
        // First, check if partner exists
        const partner = await this.partners.findByPk(partnerId);
        if (!partner) {
            return null;
        }

        // Use a transaction to ensure data consistency
        const transaction = await this.sequelize.transaction();

        try {
            // Update partner status to approved
            await partner.update({
                status: 'approved'
            }, { transaction });

            // Check if a reason exists for this partner and delete it
            const existingReason = await this.reasons.findOne({
                where: { partner_id: partnerId }
            });

            if (existingReason) {
                // Delete the reason as partner is now approved
                await existingReason.destroy({ transaction });
            }

            // Commit the transaction
            await transaction.commit();

            // Create a notification for the partner (if you have notification system)
            // This is a placeholder for notification logic
            // await createNotification(partner.user_id, 'Congratulations! Your application has been approved');

            return { success: true, message: 'Partner application approved successfully' };
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            throw error;
        }
    };

    suspendPartner = async (partnerId: number, reason: string) => {
        // First, check if partner exists
        const partner = await this.partners.findByPk(partnerId);
        if (!partner) {
            return null;
        }

        // Use a transaction to ensure data consistency
        const transaction = await this.sequelize.transaction();

        try {
            // Update partner status to suspended
            await partner.update({
                status: 'suspended'
            }, { transaction });

            // Check if a reason already exists for this partner
            const existingReason = await this.reasons.findOne({
                where: { partner_id: partnerId }
            });

            if (existingReason) {
                // Update the existing reason
                await existingReason.update({
                    reason: reason
                }, { transaction });
            } else {
                // Create a new reason entry
                await this.reasons.create({
                    partner_id: partnerId,
                    reason: reason
                }, { transaction });
            }

            // Commit the transaction
            await transaction.commit();

            // Create a notification for the partner (if you have notification system)
            // This is a placeholder for notification logic
            // await createNotification(partner.user_id, 'Your account has been suspended', reason);

            return { success: true, message: 'Partner suspended successfully' };
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            throw error;
        }
    };
}

export default PartnerDetailDao; 