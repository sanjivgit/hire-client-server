import express from "express";
import AuthRoute from "./route/auth/Auth";
import FileUploadRoute from "./route/auth/FileUPloadRoute";
import UserRoute from "./route/user/user";
import ServiceTypeRoute from "./route/serviceType";
import ServiceRoute from "./route/service";
import PartnerRoute from "./route/partner/partner";
import ServiceRequestRoute from "./route/serviceRequest";
import AcceptedServiceRoute from "./route/acceptedService";
import HistoryRoute from "./route/history";
import NotificationsRoute from "./route/notifications";

/*
|--------------------------------------------------------------------------
| API Routes
| Author- Sanjiv Kumar
| Created On- 02-03-2025 
| Created for- Hire
| Module status- Open
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/
/**
 * | Comman Route for Hire
 */

class HireRoute {
  constructor(app: express.Application) {
    new FileUploadRoute().configure(app, "00"); // 00

    new AuthRoute().configure(app, "01"); // 01

    new UserRoute().configure(app, "02"); // 02

    new ServiceTypeRoute().configure(app, "03"); // 03

    new ServiceRoute().configure(app, "04"); // 04

    new PartnerRoute().configure(app, "05"); // 05

    new ServiceRequestRoute().configure(app, "06"); // 06

    new AcceptedServiceRoute().configure(app, "07"); // 07
    
    new HistoryRoute().configure(app, "08"); // 08

    new NotificationsRoute().configure(app, "09"); // 09

    // new QuestionTypeRoute().configure(app, "04"); // 04

    // new QuestionRoute().configure(app, "05"); // 05

    // new UserTestPaperRoute().configure(app, "06"); //06

    // new UserAnswerRoute().configure(app, "07"); // 07

    // new PaymentRoute().configure(app, "08"); // 08

    // new APPVersionRoute().configure(app, "09"); // 09
  }
}

export default HireRoute;
