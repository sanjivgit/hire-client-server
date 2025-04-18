import express, { NextFunction, Request, Response } from "express";
import PartnerListController from "../../controller/dashboard/partnerList";
import Authorization from "../../middleware/auth";
import { baseUrl } from "@src/utils/common";

export default class DashboardPartnerListRoute {
    private router: express.Router;
    private partnerListController: PartnerListController;
    private authorization: Authorization;

    constructor() {
        this.router = express.Router();
        this.partnerListController = new PartnerListController();
        this.authorization = new Authorization();
    }

    configure(app: express.Application, apiId: string) {
        // Get partner list
        app.route(`${baseUrl}/dashboard/partner/list`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerListController.getPartnerList(req, res, apiId + "01")
        );
    }
} 