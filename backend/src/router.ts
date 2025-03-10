import express from "express";
import AuthRoute from "./route/auth/Auth";
import FileUploadRoute from "./route/auth/FileUPloadRoute";
import UserRoute from "./route/user/user";

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

    // new TestPaperRoute().configure(app, "03"); // 03

    // new QuestionTypeRoute().configure(app, "04"); // 04

    // new QuestionRoute().configure(app, "05"); // 05

    // new UserTestPaperRoute().configure(app, "06"); //06

    // new UserAnswerRoute().configure(app, "07"); // 07

    // new PaymentRoute().configure(app, "08"); // 08

    // new APPVersionRoute().configure(app, "09"); // 09
  }
}

export default HireRoute;
