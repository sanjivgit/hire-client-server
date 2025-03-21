import { Response } from "express";

type resObj = {
  action: string;
  apiId: string;
  version: string;
};

interface CandidateType {
  id: string;
  name: string;
  skills: string | string[];
  experience: string;
  profilePic?: string;
}

interface ApiResponse {
  json: any;
  responseCode: number;
  res: Response;
  status?: boolean | true;
}

interface User {
  id: number;
}

export type {
  resObj,
  CandidateType,
  ApiResponse,
  User,
};
