import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../utils/common";
import DashboardController from "../../controller/dashboard/dashboardController";
import Authorization from "../../middleware/auth";
import PartnerListController from "../../controller/dashboard/partnerList";
import PartnerDetailController from "../../controller/dashboard/partnerDetail";
import AcceptedServicesStatsController from "../../controller/dashboard/acceptedServicesStatsController";

class DashboardRoute {
    private dashboardController: DashboardController;
    private partnerListController: PartnerListController;
    private partnerDetailController: PartnerDetailController;
    private acceptedServicesStatsController: AcceptedServicesStatsController;
    private authorization: Authorization;

    constructor() {
        this.dashboardController = new DashboardController();
        this.partnerListController = new PartnerListController();
        this.partnerDetailController = new PartnerDetailController();
        this.acceptedServicesStatsController = new AcceptedServicesStatsController();
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

        // Get accepted services statistics
        app.route(`${baseUrl}/dashboard/accepted-services-statistics`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.acceptedServicesStatsController.getAcceptedServicesStats(req, res, apiId + "08")
        );

        // Get partner list
        app.route(`${baseUrl}/dashboard/partner/list`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerListController.getPartnerList(req, res, apiId + "03")
        );

        // Get partner list with service stats
        app.route(`${baseUrl}/dashboard/partner/list-with-stats`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerListController.getPartnerListWithServiceStats(req, res, apiId + "09")
        );

        // Get partner detail by ID
        app.route(`${baseUrl}/dashboard/partner/:id`).get(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerDetailController.getPartnerDetail(req, res, apiId + "04")
        );

        // Reject partner application
        app.route(`${baseUrl}/dashboard/partner/:id/reject`).put(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerDetailController.rejectPartnerApplication(req, res, apiId + "05")
        );

        // Approve partner application
        app.route(`${baseUrl}/dashboard/partner/:id/approve`).put(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerDetailController.approvePartnerApplication(req, res, apiId + "06")
        );

        // Suspend partner
        app.route(`${baseUrl}/dashboard/partner/:id/suspend`).put(
            async (req: Request, res: Response, next: NextFunction) => {
                await this.authorization.jwtVerifyIsAdmin(req, res, next);
            },
            (req: Request, res: Response) =>
                this.partnerDetailController.suspendPartner(req, res, apiId + "07")
        );
    }
}

export default DashboardRoute; 