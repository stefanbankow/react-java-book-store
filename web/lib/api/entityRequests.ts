import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export const getAllEntities = async (
  collectionName: "books" | "authors",
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/store/${collectionName}?search=${
        req.query.search || ""
      }&page=${req.query.page}&size=${req.query.size}&sortBy=${
        req.query.sortBy
      }&asc=${req.query.asc}`
    );
    const entities = await response.json();
    return res.status(response.status || 200).json(entities);
  } catch (error) {
    console.error(error.message);
    return res.status(error.status || 500).json(error);
  }
};

export const getEntityById = async (
  collectionName: "books" | "authors",
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const response = await fetch(
    `http://localhost:8080/api/store/${collectionName}/${req.query.id}`
  );
  if (response.status >= 200 && response.status <= 299) {
    const entities = await response.json();
    return res.status(response.status).json(entities);
  }

  return res.status(response.status).json(response);
};

export const createEntity = async (
  collectionName: "books" | "authors",
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { accessToken } = await getAccessToken(req, res);

    const response = await fetch(
      `http://localhost:8080/api/store/${collectionName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(req.body),
      }
    );
    const entity = await response.json();
    return res.status(response.status || 200).json(entity);
  } catch (error) {
    console.error(error.message);
    return res.status(error.status || 500).json(error);
  }
};

export const updateEntity = async (
  collectionName: "books" | "authors",
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(
      `http://localhost:8080/api/store/${collectionName}/${req.query.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(req.body),
      }
    );
    const entity = await response.json();
    return res.status(response.status || 200).json(entity);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ error: error.message });
  }
};

export const deleteEntity = async (
  collectionName: "books" | "authors",
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(
      `http://localhost:8080/api/store/${collectionName}/${req.query.id}`,
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
    console.error(error);
    return res.status(error.status || 500).json({ error: error.message });
  }
};
