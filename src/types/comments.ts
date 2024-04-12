export interface MyCommentType {
  comment_id: string;
  class_id: string;
  content: string;
  create_at: string;
  title: string;
  image: string[];
  star: number;
}

export interface NewCommentType {
  newContent: string;
  commentId: string;
}
