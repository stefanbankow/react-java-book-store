import {
  getAllEntities,
  createEntity,
} from "../../../../lib/api/entityRequests";
import { NextApiRequest, NextApiResponse } from "next";

export default async function authorsRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getAllEntities("authors", req, res);
    case "POST":
      return createEntity("authors", req, res);
    default:
      break;
  }
}
