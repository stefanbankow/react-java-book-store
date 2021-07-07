import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const response = await fetch(
          `http://localhost:8080/api/store/books?search=${
            req.query.search || ""
          }&page=${req.query.page}&size=${req.query.size}&sortBy=${
            req.query.sortBy
          }&asc=${req.query.asc}`
        );
        const books = await response.json();
        res.status(response.status || 200).json(books);
      } catch (error) {
        console.error(error.message);
        res.status(error.status || 500).json(error);
      }
      break;
    case "POST":
      try {
        const { accessToken } = await getAccessToken(req, res);

        const response = await fetch(`http://localhost:8080/api/store/books`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(req.body),
        });
        const book = await response.json();
        res.status(response.status || 200).json(book);
      } catch (error) {
        console.error(error.message);
        res.status(error.status || 500).json(error);
      }
      break;
    default:
      break;
  }
}
