export interface MyCommentType {
  comment_id: string;
  class_id: string;
  content: string;
  create_at: string;
  title: string;
  image: string[];
  star: number;
  comment_image: string;
}

export interface NewCommentType {
  newContent: string;
  newStar: number;
  commentId: string;
}
