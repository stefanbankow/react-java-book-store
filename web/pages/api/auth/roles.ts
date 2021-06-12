import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

//This is used to check if the logged in user is an admin to display additional functionality on the frontend
export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  if (
    session?.user[`${process.env.AUTH0_AUDIENCE}/roles`].includes(
      "book-store-admin"
    )
  ) {
    return res.status(200).json({ isAdmin: true });
  }
  return res.status(200).json({ isAdmin: false });
}
