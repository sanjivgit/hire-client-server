const db = require("../../../db/models/index");
import { Op } from "sequelize";

class AcceptedServicesStatsDao {
    private acceptedServices: any;

    constructor() {
        this.acceptedServices = db.accepted_services;
    }

    getAcceptedServicesStats = async () => {
        try {
            const [
                totalPending,
                totalCompleted,
                totalCancelled
            ] = await Promise.all([
                this.acceptedServices.count({
                    where: {
                        status: {
                            [Op.in]: ['pending', 'in-progress']
                        }
                    }
                }),
                this.acceptedServices.count({
                    where: {
                        status: 'completed'
                    }
                }),
                this.acceptedServices.count({
                    where: {
                        status: 'cancelled'
                    }
                })
            ]);

            return {
                totalPending,
                totalCompleted,
                totalCancelled
            };
        } catch (error) {
            throw error;
        }
    };
}

export default AcceptedServicesStatsDao; 