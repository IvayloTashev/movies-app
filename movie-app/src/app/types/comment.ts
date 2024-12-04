export interface Author {
    _id: string;
    email: string;
    username: string;
}

export interface CommentInterface {
    _ownerId: string;
    content: string;
    movieId: string;
    _createdOn: string;
    _id: string;
    author: Author
  }