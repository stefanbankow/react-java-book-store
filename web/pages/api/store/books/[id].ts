import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteEntity,
  getEntityById,
  updateEntity,
} from "../../../../lib/api/entityRequests";

export default async function singleBookRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getEntityById("books", req, res);
    case "PATCH":
      return updateEntity("books", req, res);
    case "DELETE":
      return deleteEntity("books", req, res);
    default:
      break;
  }
}
