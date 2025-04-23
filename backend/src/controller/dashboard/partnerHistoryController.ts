import { Request, Response } from "express";
import CommonRes from "../../utils/commonResponse";
import PartnerHistoryDao from "../../dao/dashboard/partnerHistoryDao";
import PartnerHistoryResponseDto from "../../dto/response/dashboard/partnerHistoryResponseDto";
import PartnerWorkStatsResponseDto from "../../dto/response/dashboard/partnerWorkStatsResponseDto";
import { resObj } from "../../utils/types";

class PartnerHistoryController {
    private partnerHistoryDao: PartnerHistoryDao;

    constructor() {
        this.partnerHistoryDao = new PartnerHistoryDao();
    }

    getPartnerWorkingHistory = async (req: Request, res: Response, apiId: string): Promise<void> => {
        const resObj: resObj = {
            apiId,
            action: "GET",
            version: "1.0",
        };

        try {
            const partnerId = parseInt(req.params.id);
            const { page, limit, search } = req.query;

            // Check if user exists and is admin - this check is actually now done in the middleware
            // The middleware will attach the user to req.body.user
            if (!req.body.user) {
                await CommonRes.UNAUTHORISED(
                    "Unauthorized access",
                    resObj,
                    req,
                    res
                );
                return;
            }

            if (isNaN(partnerId) || partnerId <= 0) {
                await CommonRes.BAD_REQUEST(
                    "Invalid partner ID",
                    resObj,
                    req,
                    res
                );
                return;
            }

            const result = await this.partnerHistoryDao.getPartnerWorkingHistory({
                partnerId,
                page: page ? parseInt(page as string) : undefined,
                limit: limit ? parseInt(limit as string) : undefined,
                search: search as string
            });

            const { data, ...pagination } = result;
            // Transform the response using DTO
            const history = data.map((item: any) => new PartnerHistoryResponseDto(item)) || [];

            await CommonRes.SUCCESS(
                "Partner working history retrieved successfully",
                {
                    history,
                    pagination
                },
                resObj,
                req,
                res
            );
        } catch (error: any) {
            if (error.message === "Invalid partner ID") {
                await CommonRes.BAD_REQUEST(
                    error.message,
                    resObj,
                    req,
                    res
                );
                return;
            } else if (error.message === "Partner not found") {
                await CommonRes.NOT_FOUND(
                    error.message,
                    null,
                    resObj,
                    req,
                    res
                );
                return;
            }
            await CommonRes.SERVER_ERROR(error, resObj, req, res);
        }
    };

    getPartnerWorkStats = async (req: Request, res: Response, apiId: string): Promise<void> => {
        const resObj: resObj = {
            apiId,
            action: "GET",
            version: "1.0",
        };

        try {
            const partnerId = parseInt(req.params.id);

            // Check if user exists - this check is actually now done in the middleware
            // The middleware will attach the user to req.body.user
            if (!req.body.user) {
                await CommonRes.UNAUTHORISED(
                    "Unauthorized access",
                    resObj,
                    req,
                    res
                );
                return;
            }

            if (isNaN(partnerId) || partnerId <= 0) {
                await CommonRes.BAD_REQUEST(
                    "Invalid partner ID",
                    resObj,
                    req,
                    res
                );
                return;
            }

            const result = await this.partnerHistoryDao.getPartnerWorkStats(partnerId);

            // Transform the response using DTO
            const stats = new PartnerWorkStatsResponseDto(result);

            await CommonRes.SUCCESS(
                "Partner work statistics retrieved successfully",
                stats,
                resObj,
                req,
                res
            );
        } catch (error: any) {
            if (error.message === "Invalid partner ID") {
                await CommonRes.BAD_REQUEST(
                    error.message,
                    resObj,
                    req,
                    res
                );
                return;
            } else if (error.message === "Partner not found") {
                await CommonRes.NOT_FOUND(
                    error.message,
                    null,
                    resObj,
                    req,
                    res
                );
                return;
            }
            await CommonRes.SERVER_ERROR(error, resObj, req, res);
        }
    };
}

export default PartnerHistoryController; 