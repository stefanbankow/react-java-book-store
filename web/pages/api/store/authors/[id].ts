import { NextApiRequest, NextApiResponse } from "next";

export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { id },
    } = req;
    const response = await fetch(
      `http://localhost:8080/api/store/authors/${id}`
    );
    if (response.status >= 200 && response.status <= 299) {
      const books = await response.json();
      return res.status(response.status).json(books);
    }

    return res.status(response.status).json(response);
  } catch (error) {
    console.error({ ...error });
    res.status(500).json(error);
  }
}
