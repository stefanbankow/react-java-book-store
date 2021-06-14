import { NextApiRequest, NextApiResponse } from "next";

export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/store/books?page=${req.query.page}&size=${req.query.size}&sortBy=${req.query.sortBy}&asc=${req.query.asc}`
    );
    const books = await response.json();
    res.status(200).json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error });
  }
}
