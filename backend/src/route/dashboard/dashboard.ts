import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../utils/common";
import DashboardController from "../../controller/dashboard/dashboardController";
import Authorization from "../../middleware/auth";
import PartnerListController from "../../controller/dashboard/partnerList";
import PartnerDetailController from "../../controller/dashboard/partnerDetail";

class DashboardRoute {
    private dashboardController: DashboardController;
    private partnerListController: PartnerListController;
    private partnerDetailController: PartnerDetailController;
    private authorization: Authorization;

    constructor() {
        this.dashboardController = new DashboardController();
        this.partnerListController = new PartnerListController();
        this.partnerDetailController = new PartnerDetailController();
        this.authorization = new Authorization();
    }

    configure(app: express.Application, apiId: string) {
        // Get partner statistics
        app.route(`${baseUrl}/dashboard/partner-statistics`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.dashboardController.getPartnerStatistics(req, res, apiId + "01")
        );

        // Get latest partners
        app.route(`${baseUrl}/dashboard/latest-partners`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.dashboardController.getLatestPartners(req, res, apiId + "02")
        );

        // Get partner list
        app.route(`${baseUrl}/dashboard/partner/list`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerListController.getPartnerList(req, res, apiId + "03")
        );

        // Get partner detail by ID
        app.route(`${baseUrl}/dashboard/partner/:id`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerDetailController.getPartnerDetail(req, res, apiId + "04")
        );
    }
}

export default DashboardRoute; 