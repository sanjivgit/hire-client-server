import { Request, Response } from "express";
import CommonRes from "../../utils/commonResponse";
import PartnerDetailDao from "../../dao/dashboard/partnerDetailDao";
import PartnerDetailResponseDto from "../../dto/response/dashboard/partnerDetailResponseDto";
import { resObj } from "../../utils/types";

class PartnerDetailController {
    private partnerDetailDao: PartnerDetailDao;

    constructor() {
        this.partnerDetailDao = new PartnerDetailDao();
    }

    getPartnerDetail = async (req: Request, res: Response, apiId: string): Promise<void> => {
        const resObj: resObj = {
            apiId,
            action: "GET",
            version: "1.0",
        };

        try {
            const partnerId = req.params.id;

            // Check if user is admin
            if (!req.body.user || req.body.user.role !== 'admin') {
                await CommonRes.UNAUTHORISED(
                    "Unauthorized access - Admin role required",
                    resObj,
                    req,
                    res
                );
                return;
            }

            if (!partnerId || isNaN(Number(partnerId))) {
                await CommonRes.BAD_REQUEST(
                    "Invalid partner ID",
                    resObj,
                    req,
                    res
                );
                return;
            }

            const result = await this.partnerDetailDao.getPartnerById(Number(partnerId));

            if (!result) {
                await CommonRes.NOT_FOUND(
                    "Partner not found",
                    null,
                    resObj,
                    req,
                    res
                );
                return;
            }

            // Transform the response using DTO
            const partnerDetail = new PartnerDetailResponseDto(result);

            await CommonRes.SUCCESS(
                "Partner details retrieved successfully",
                partnerDetail,
                resObj,
                req,
                res
            );
        } catch (error: any) {
            await CommonRes.SERVER_ERROR(error, resObj, req, res);
        }
    };
}

export default PartnerDetailController; 