import { sample } from '@/sample-data';
import { Post } from '@/types';
import { useEffect, useState } from 'react';

const getPost = (): Promise<Post> => {
  return new Promise<Post>((resolve) => {
    setTimeout(() => {
      const post: Post | null = JSON.parse(
        window.localStorage.getItem('post') ?? null
      );
      const title = post ? post?.title : sample.title;
      const content = post?.content || sample.content;
      resolve({ content, title });
    }, 200);
  });
};

export function usePost() {
  const [post, setPost] = useState<Post | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);

    (async () => {
      const post = await getPost();
      setPost(post);
      setIsFetching(false);
    })();
  }, []);

  return { post, isFetching };
}
