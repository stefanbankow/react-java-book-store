import { User } from "@auth0/auth0-react";
export const isUserAdmin = (user: User | undefined): boolean => {
  if (!user || !user[`${process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}/roles`]) {
    return false;
  }
  return user[`${process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}/roles`].includes(
    "book-store-admin"
  );
};
