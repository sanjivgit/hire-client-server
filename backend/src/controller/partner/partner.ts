import CommonRes from "../../utils/commonResponse";
import { resObj, User } from "../../utils/types";
import { Request, Response } from "express";
import PartnerDao from "../../dao/partner/partnerDao";
import { partnerRegistrationValidation } from "../../requests/partner/partnerRegistrationValidation";
import PartnerRequestDto from "../../dto/request/partner/partnerRequestDto";
import PartnerResponseDto from "../../dto/response/partner/partnerResponseDto";

/**
 * | Author- Sanjiv Kumar
 * | Created for- PARTNER
 * | Created Date- 10-03-2025
 * | Status - Done
 */


interface PartnerRegistrationRequest extends Request {
  body: {
    user: User;
    firstName: string;
    lastName: string;
    serviceIds: number[];
    serviceTypeId: number;
    aadharNumber: string;
    aadharImageId: number;
    additionalDocumentId: number;
  };
}
class PartnerController {
  private partnerDao: PartnerDao;
  private initMsg: string;
  constructor() {
    this.partnerDao = new PartnerDao();
    this.initMsg = "User";
  }

  becomePartner = async (
    req: PartnerRegistrationRequest,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    try {
      const { user, ...details } = req.body;
      const userId = user?.id;

      if (!userId) {
        return CommonRes.UNAUTHORISED(
          "User not authenticated",
          resObj,
          req,
          res
        );
      }

      const partnerRequestDto = new PartnerRequestDto(details);

      // Validate request body
      const { error } = partnerRegistrationValidation.validate(partnerRequestDto);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const partner = await this.partnerDao.becomePartner({ ...partnerRequestDto, user_id: userId });

      const partnerResponseDto = new PartnerResponseDto(partner.toJSON());

      return CommonRes.SUCCESS(
        "Partner created successfully",
        partnerResponseDto,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default PartnerController;
