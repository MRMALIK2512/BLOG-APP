'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts`, { title, content });
       if(response){
        router.push('/');
       }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='w-full '>
      
      <form onSubmit={handleSubmit} className='max-w-[750px] mx-auto my-16 h-full'>
        <label className = 'mb-3 '> ENTER POST TITLE </label>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)
          }
          required
          className = 'mb-6'
        />
        <label className = 'mt-8 mb-3'> ENTER POST CONTENT </label>
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
           className = 'h-auto lg:min-h-[400px] '
        />
        <Button type="submit" className = 'mt-6'>Create Post</Button>
      </form>
    </div>
  );
}
