import { NextApiRequest, NextApiResponse } from "next";

export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("http://localhost:8080/api/store/books");
    const products = await response.json();
    res.status(200).json(products);
  } catch (error) {
    console.log("Error called");
    console.error(error.message);
    res.status(400).json(error);
  }
}
