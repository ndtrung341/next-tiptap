import React, { Suspense } from 'react';
import PostDetail from './_components/post-detail';
import Image from 'next/image';

const getImageRandom = async (): Promise<string> => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

  const res = await fetch(url);
  const data = await res.json();

  return (data.urls.raw + '&w=1500&dpr=2') as string;
};

export default async function PostPage() {
  const image = await getImageRandom();

  return (
    <div className='mt-12 mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]'>
      <PostDetail thumb={image} />
      <div className='my-32'>
        <Image
          src={'/doraemon.png'}
          width={350}
          height={350}
          alt=''
          className='mx-auto'
        />
      </div>
    </div>
  );
}
