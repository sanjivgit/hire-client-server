import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../utils/common";
import DashboardController from "../../controller/dashboard/dashboardController";
import Authorization from "../../middleware/auth";

class DashboardRoute {
    private dashboardController: DashboardController;
    private authorization: Authorization;

    constructor() {
        this.dashboardController = new DashboardController();
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
    }
}

export default DashboardRoute; 