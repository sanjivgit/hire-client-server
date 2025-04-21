import { Request, Response } from "express";
import CommonRes from "../../utils/commonResponse";
import { resObj } from "../../utils/types";
import DashboardDao from "../../dao/dashboard/dashboardDao";
import PartnerListResponseDto from "../../dto/response/dashboard/partnerListResponseDto";

class DashboardController {
    private dashboardDao: DashboardDao;

    constructor() {
        this.dashboardDao = new DashboardDao();
    }

    getPartnerStatistics = async (req: Request, res: Response, apiId: string): Promise<any> => {
        const resObj: resObj = {
            apiId,
            action: "Get Partner Statistics",
            version: "1.0",
        };

        try {
            const statistics = await this.dashboardDao.getPartnerStatistics();
            return CommonRes.SUCCESS(
                "Partner statistics retrieved successfully",
                statistics,
                resObj,
                req,
                res
            );
        } catch (error: any) {
            return CommonRes.SERVER_ERROR(error, resObj, req, res);
        }
    };

    getLatestPartners = async (req: Request, res: Response, apiId: string): Promise<any> => {
        const resObj: resObj = {
            apiId,
            action: "Get Latest Partners",
            version: "1.0",
        };

        try {
            const latestPartners = await this.dashboardDao.getLatestPartners();

            const formatedLatestPartners = latestPartners.map((partner: any) => new PartnerListResponseDto(partner));

            return CommonRes.SUCCESS(
                "Latest partners retrieved successfully",
                formatedLatestPartners,
                resObj,
                req,
                res
            );
        } catch (error: any) {
            return CommonRes.SERVER_ERROR(error, resObj, req, res);
        }
    };
}

export default DashboardController; 