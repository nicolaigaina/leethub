type CreatePost = {
  TableName: string;
  Item: {
    userId: string;
    postId: string;
    content: string;
    attachment: string;
    createdAt: number;
  };
}
