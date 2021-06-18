export interface BookProps {
  id: number;
  title: string;
  description?: string;
  price: number;
  coverArtURL?: string;
  yearOfRelease?: number;
  forSale: boolean;
  author: {
    name: string;
  };
}

export interface PaginatedBooksResponseProps {
  content: BookProps[];
  totalPages: number;
  first: boolean;
  last: boolean;
}
