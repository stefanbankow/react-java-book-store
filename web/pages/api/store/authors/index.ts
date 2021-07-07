import { NextApiRequest, NextApiResponse } from "next";

export default async function getAuthors(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const response = await fetch(
          `http://localhost:8080/api/store/authors?search=${
            req.query.search || ""
          }&page=${req.query.page}&size=${req.query.size}&sortBy=${
            req.query.sortBy
          }&asc=${req.query.asc}`
        );
        const authors = await response.json();
        res.status(response.status || 200).json(authors);
      } catch (error) {
        console.error(error.message);
        res.status(error.status || 500).json(error);
      }
      break;
    default:
      break;
  }
}
