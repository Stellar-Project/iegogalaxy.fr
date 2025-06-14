export type PostType = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
};

export type PostWithAuthor = PostType & {
  author: {
    name: string | null;
  };
};
