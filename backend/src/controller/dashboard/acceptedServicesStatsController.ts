import { Request, Response } from "express";
import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";
import AcceptedServicesStatsDao from "../../dao/dashboard/acceptedServicesStatsDao";
import AcceptedServicesStatsDto from "../../dto/response/dashboard/acceptedServicesStatsDto";

class AcceptedServicesStatsController {
    private acceptedServicesStatsDao: AcceptedServicesStatsDao;

    constructor() {
        this.acceptedServicesStatsDao = new AcceptedServicesStatsDao();
    }

    getAcceptedServicesStats = async (req: Request, res: Response, apiId: string): Promise<any> => {
        const resObj: resObj = {
            apiId,
            action: "Get Accepted Services Statistics",
            version: "1.0",
        };

        try {
            const statistics = await this.acceptedServicesStatsDao.getAcceptedServicesStats();
            const statsDto = new AcceptedServicesStatsDto(statistics);

            return CommonRes.SUCCESS(
                "Accepted services statistics retrieved successfully",
                statsDto,
                resObj,
                req,
                res
            );
        } catch (error: any) {
            return CommonRes.SERVER_ERROR(error, resObj, req, res);
        }
    };
}

export default AcceptedServicesStatsController; 