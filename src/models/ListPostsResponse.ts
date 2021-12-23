type ListPostsResponse = {
  body: string;
  id: string;
  imageUrl: string;
  title: string;
  user: {
    name: string | null;
    id: string;
    email: string;
  };
};

export { ListPostsResponse };
