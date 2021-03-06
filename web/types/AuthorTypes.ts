export interface AuthorProps {
  id: number;
  name: string;
  description?: string;
  yearBorn: number;
  yearOfDeath: number;
  imageURL?: string;
}

export interface PaginatedAuthorsResponseProps {
  content: AuthorProps[];
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
}
