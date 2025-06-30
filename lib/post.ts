export type PostType = {
  id?: number;
  title: string;
  icon: string | null;
  content: string | null;
  published?: boolean;
  authorId?: string;
  createdAt: Date;
  updatedAt?: Date;
  cover?: string | null;
};

export type PostWithAuthor = PostType & {
  author: {
    name: string | null;
    image: string | null;
  };
};
