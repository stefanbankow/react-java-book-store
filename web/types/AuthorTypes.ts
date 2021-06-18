export interface AuthorProps {
  id: number;
  name: string;
  description?: string;
  yearBorn: number;
  yearOfDeath: number;
  imageURL?: string;
  yearOfRelease?: number;
}

export interface PaginatedAuthorsResponseProps {
  content: AuthorProps[];
  totalPages: number;
  first: boolean;
  last: boolean;
}
