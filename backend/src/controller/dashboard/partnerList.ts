import { Request, Response } from "express";
import CommonRes from "../../utils/commonResponse";
import PartnerListDao from "../../dao/dashboard/partnerListDao";
import PartnerListResponseDto from "../../dto/response/dashboard/partnerListResponseDto";
import { resObj } from "../../utils/types";

class PartnerListController {
    private partnerListDao: PartnerListDao;

    constructor() {
        this.partnerListDao = new PartnerListDao();
    }

    getPartnerList = async (req: Request, res: Response, apiId: string): Promise<void> => {
        const resObj: resObj = {
            apiId,
            action: "GET",
            version: "1.0",
        };

        try {
            const { page, limit, status, search } = req.query;

            // Check if user is admin
            if (!req.body.user) {
                await CommonRes.UNAUTHORISED(
                    "unauthorised access",
                    resObj,
                    req,
                    res
                );
                return;
            }

            const result = await this.partnerListDao.getPartnerList({
                page: page ? parseInt(page as string) : undefined,
                limit: limit ? parseInt(limit as string) : undefined,
                status: status as string,
                search: search as string
            });

            const { data, ...pagination } = result;
            // Transform the response using DTO
            const partners = data.map((partner: any) => new PartnerListResponseDto(partner)) || [];

            await CommonRes.SUCCESS(
                "Partner list retrieved successfully",
                {
                    partners,
                    pagination
                },
                resObj,
                req,
                res
            );
        } catch (error: any) {
            await CommonRes.SERVER_ERROR(error, resObj, req, res);
        }
    };
}

export default PartnerListController; 