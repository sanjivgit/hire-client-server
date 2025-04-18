import express, { NextFunction, Request, Response } from "express";
import PartnerDetailController from "../../controller/dashboard/partnerDetail";
import Authorization from "../../middleware/auth";
import { baseUrl } from "@src/utils/common";

export default class DashboardPartnerDetailRoute {
    private router: express.Router;
    private partnerDetailController: PartnerDetailController;
    private authorization: Authorization;

    constructor() {
        this.router = express.Router();
        this.partnerDetailController = new PartnerDetailController();
        this.authorization = new Authorization();
    }

    configure(app: express.Application, apiId: string) {
        // Get partner details by ID
        app.route(`${baseUrl}/dashboard/partner/:id`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerDetailController.getPartnerDetail(req, res, apiId + "01")
        );
    }
} 