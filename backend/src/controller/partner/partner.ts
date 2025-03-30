import CommonRes from "../../utils/commonResponse";
import { resObj, User } from "../../utils/types";
import { Request, Response } from "express";
import PartnerDao from "../../dao/partner/partnerDao";
import { partnerRegistrationValidation } from "../../requests/partner/partnerRegistrationValidation";
import { partnerUpdateValidation } from "../../requests/partner/partnerUpdateValidation";
import PartnerRequestDto from "../../dto/request/partner/partnerRequestDto";
import PartnerUpdateDto from "../../dto/request/partner/partnerUpdateDto";
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

interface PartnerUpdateRequest extends Request {
  body: {
    user: User;
    id: number;
    firstName?: string;
    lastName?: string;
    serviceIds?: number[];
    serviceTypeId?: number;
    aadharNumber?: string;
    aadharImageId?: number;
    additionalDocumentId?: number;
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

  updatePartner = async (
    req: PartnerUpdateRequest,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "PUT",
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

      const partnerUpdateDto = new PartnerUpdateDto(details, userId);

      // Validate request body
      const { error } = partnerUpdateValidation.validate(partnerUpdateDto);
      if (error) {
        return CommonRes.VALIDATION_ERROR(error, resObj, req, res);
      }

      const updatedPartner = await this.partnerDao.updatePartner(partnerUpdateDto);

      const partnerResponseDto = new PartnerResponseDto(updatedPartner);

      return CommonRes.SUCCESS(
        "Partner details updated successfully. Your profile is pending for review.",
        partnerResponseDto,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  getPartnerById = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<any> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const partnerId = parseInt(req.params.id);
      
      if (isNaN(partnerId)) {
        return CommonRes.BAD_REQUEST(
          "Invalid partner ID",
          resObj,
          req,
          res
        );
      }

      const partner = await this.partnerDao.getPartnerById(partnerId);
      
      if (!partner) {
        return CommonRes.NOT_FOUND(
          "Partner not found",
          null,
          resObj,
          req,
          res
        );
      }

      const partnerResponseDto = new PartnerResponseDto(partner);

      return CommonRes.SUCCESS(
        "Partner retrieved successfully",
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
