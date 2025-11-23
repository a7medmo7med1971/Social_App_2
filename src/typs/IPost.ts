// src/types/IPost.ts

export interface IUser {
  _id: string;
  name: string;
  photo: string;
}

export interface IComment {
  _id: string;
  commentCreator: IUser;
  comment: string;
  createdAt: string;
}

export interface IPost {
  _id: string;
  body: string;
  image: string;
  user: IUser;
  createdAt: string;
  comments: IComment[];
  id: string;
}
