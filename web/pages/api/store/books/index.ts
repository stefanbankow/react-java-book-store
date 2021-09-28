import { createEntity } from "./../../../../lib/api/entityRequests";
import { NextApiRequest, NextApiResponse } from "next";
import { getAllEntities } from "../../../../lib/api/entityRequests";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function booksRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getAllEntities("books", req, res);
    case "POST":
      return createEntity("books", req, res);
    default:
      break;
  }
}
