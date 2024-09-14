'use client'; 
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Post({ params }) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch the post data when the component loads
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  // Edit the post
  const editPost = async () => {
    if (confirm('Are you sure you want to edit this post?')) {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${id}`, {
          title: title,  // Use the updated title
          content: content  // Use the updated content
        });
        router.push('/');
      } catch (error) {
        console.error('Error editing post:', error);
      }
    }
  };

  if (loading) {
    return <div className='w-full h-full mx-auto my-auto'>Loading...</div>;
  }

  return (
    <div className='w-full h-full'>
      <div className='w-[750px] flex text-white mx-auto flex-col gap py-8'>
        <label className='mb-3'>ENTER POST TITLE</label>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='mb-6'
        />
        <label className='mt-6 mb-3'>ENTER POST CONTENT</label>
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className='h-auto lg:min-h-[400px]'
        />
        <Button onClick={editPost} className='text-red-800 mt-3'>Save Post</Button>
      </div>
    </div>
  );
}
