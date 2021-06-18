import { NextApiRequest, NextApiResponse } from "next";

export default async function getAuthors(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/store/authors?page=${req.query.page}&size=${req.query.size}&sortBy=${req.query.sortBy}&asc=${req.query.asc}`
    );
    const authors = await response.json();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error });
  }
}
