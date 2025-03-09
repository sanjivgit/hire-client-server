import { Request, Response } from "express";
import CommonRes from "../utils/commonResponse";
import { resObj } from "../utils/types";

class FileUploadController {
  // private questionDao: QuestionDao;
  constructor() {
    // this.questionDao = new QuestionDao();
  }

  uploadSingleDocument = async (req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    // console.log(req.headers);
    // validate
    const testPaperId = Number(req.params.testPaperId);

    // multerUpload(req, res, async (error) => {
    //   if (error) {
    //     return CommonRes.SERVER_ERROR(error, resObj, req, res);
    //   } else {
    //     // const path = "http://localhost:2001" + req.body.file_path;

    //     const questionListFile = `/home/sanjiv/Desktop/QuizzApp/backend/${req.body.file_path}`;

    //     readXlsxFile(questionListFile).then(async (rows) => {
    //       const rowLength = rows.length;
    //       const questionList: any = [];
    //       for (let i = 1; i < rowLength; i++) {
    //         const row = rows[i];
    //         questionList.push({
    //           // id: row[0],
    //           type_id: row[1],
    //           english_ques: row[2],
    //           hindi_ques: row[3],
    //           ques_img_path: row[4],
    //           marks: row[5],
    //           negative_marks: row[6],
    //           correct_answer: row[7],
    //           test_paper_id: testPaperId,
    //           options: [
    //             {
    //               key: 1,
    //               hindi_option: String(row[8]).split("@")[0],
    //               english_option: String(row[9]).split("@")[0],
    //               option_path: String(row[10]).split("@")[0],
    //             },
    //             {
    //               key: 2,
    //               hindi_option: String(row[8]).split("@")[1],
    //               english_option: String(row[9]).split("@")[1],
    //               option_path: String(row[10]).split("@")[1],
    //             },
    //             {
    //               key: 3,
    //               hindi_option: String(row[8]).split("@")[2],
    //               english_option: String(row[9]).split("@")[0],
    //               option_path: String(row[10]).split("@")[2],
    //             },
    //             {
    //               key: 4,
    //               hindi_option: String(row[8]).split("@")[3],
    //               english_option: String(row[9]).split("@")[2],
    //               option_path: String(row[10]).split("@")[3],
    //             },
    //           ],
    //         });
    //       }

    //       const { error } = await questionValidationForMultiple.validate(questionList);

    //      console.log("error" , error?.message)
          

    //      console.log("first 112121212", questionList);
    //       this.questionDao.createMany(questionList);
    //       // console.log("option", questionList[0]);
    //     });

    //     return CommonRes.SUCCESS(
    //       "File Uploaded Successfully",
    //       req.body.file_path,
    //       resObj,
    //       req,
    //       res
    //     );
    //   }
    // });
  };
}

export default FileUploadController;
