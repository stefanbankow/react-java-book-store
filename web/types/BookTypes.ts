import { AuthorProps } from "./AuthorTypes";
export interface BookProps {
  id: number;
  title: string;
  description?: string;
  price: number;
  coverArtURL?: string;
  yearOfRelease?: number;
  forSale: boolean;
  author: AuthorProps;
}

export interface PaginatedBooksResponseProps {
  content: BookProps[];
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
}
