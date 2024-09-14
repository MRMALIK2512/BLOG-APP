'use client'; 
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Post({ params }) {
  const router = useRouter();
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);



  const deletePost = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${id}`);
        router.push('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='w-full h-full mt-10 '>
      <div className='w-[1080px] flex bg-white rounded-lg text-black mx-auto h-full flex-col gap-y-20 py-8'>
        <h1 className=' mx-auto text-4xl'>{post.title}</h1>
        <p className=' mx-auto text-justify text-xl' >{post.content}</p>
        <Button onClick={deletePost} className='text-red-800 w-[90%] rounded-lg mx-auto'>Delete Post</Button>
      </div>
    </div>
  );
}
