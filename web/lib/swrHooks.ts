import { UserProfile } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import { PaginatedAuthorsResponseProps } from "../types/AuthorTypes";
import { PaginatedBooksResponseProps } from "../types/BookTypes";
import { fetcher } from "./fetcher";

export function useBooks(
  search: string | string[] | undefined,
  page: string | string[] | undefined,
  size: string | string[] | undefined,
  sortBy: string | string[] | undefined,
  asc: string | string[] | undefined
) {
  const { data, error } = useSWR(
    `/api/store/books?search=${search || ""}&page=${page || 0}&size=${
      size || 24
    }&sortBy=${sortBy || "id"}&asc=${asc || false}`,
    fetcher
  );

  return {
    data: data as PaginatedBooksResponseProps,
    isLoading: !error && !data,
    error,
  };
}

export function useBooksAdmin(
  search: string | string[] | undefined,
  page: string | string[] | undefined,
  pageSize: string | string[] | undefined,
  sortBy: string | string[] | undefined,
  asc: string | string[] | undefined,
  isTyping: boolean // This parameter is used to prevent SWR from making requests to the API on every keystroke when searching, this is not required on useBooks and useAuthors
  // because they are rendered through an abstraction component which calls the API only when it's rendered. I didn't deem the abstraction solution a good fit for the admin page
) {
  const { data, error, mutate, isValidating } = useSWR(
    !isTyping
      ? `/api/store/books?search=${search || ""}&page=${page || 0}&size=${
          pageSize || 24
        }&sortBy=${sortBy || "id"}&asc=${asc || false}`
      : null,
    fetcher
  );

  return {
    data: data as PaginatedBooksResponseProps,
    isLoading: !error && !data,
    error,
    mutate,
    isValidating,
  };
}

export function useAuthors(
  search: string | string[] | undefined,
  page: string | string[] | undefined,
  size: string | string[] | undefined,
  sortBy: string | string[] | undefined,
  asc: string | string[] | undefined
) {
  const { data, error } = useSWR(
    `/api/store/authors?search=${search || ""}&page=${page || 0}&size=${
      size || 24
    }&sortBy=${sortBy || "id"}&asc=${asc || false}`,
    fetcher
  );

  return {
    data: data as PaginatedAuthorsResponseProps,
    isLoading: !error && !data,
    error,
  };
}

export function useAuthorsAdmin(
  search: string | string[] | undefined,
  page: string | string[] | undefined,
  pageSize: string | string[] | undefined,
  sortBy: string | string[] | undefined,
  asc: string | string[] | undefined,
  isTyping: boolean
) {
  const { data, error, mutate, isValidating } = useSWR(
    !isTyping
      ? `/api/store/authors?search=${search || ""}&page=${page || 0}&size=${
          pageSize || 24
        }&sortBy=${sortBy || "id"}&asc=${asc || false}`
      : null,
    fetcher
  );

  return {
    data: data as PaginatedAuthorsResponseProps,
    isLoading: !error && !data,
    error,
    mutate,
    isValidating,
  };
}

export const useUserWithRole = () => {
  const { data, error } = useSWR("/api/auth/user", fetcher);
  return {
    data: data as { user: UserProfile; isAdmin: boolean },
    error,
    isLoading: !data && !error,
  };
};
