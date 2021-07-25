import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function singleBookRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const {
          query: { id },
        } = req;
        const response = await fetch(
          `http://localhost:8080/api/store/books/${id}`
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
      break;
    case "PATCH":
      try {
        const {
          query: { id },
        } = req;
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(
          `http://localhost:8080/api/store/books/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(req.body),
          }
        );
        const book = await response.json();
        res.status(response.status || 200).json(book);
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const {
          query: { id },
        } = req;
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(
          `http://localhost:8080/api/store/books/${id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 204) {
          return res.status(response.status).json({});
        }
        return res.status(response.status || 200).json(response);
      } catch (error) {
        console.error({ ...error });
        res.status(error.status || 500).json({ error: error.message });
      }
      break;
    default:
      break;
  }
}
