import {
  getEntityById,
  updateEntity,
  deleteEntity,
} from "../../../../lib/api/entityRequests";
import { NextApiRequest, NextApiResponse } from "next";

export default async function singleAuthorRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getEntityById("authors", req, res);
    case "PATCH":
      return updateEntity("authors", req, res);
    case "DELETE":
      return deleteEntity("authors", req, res);
    default:
      break;
  }
}
