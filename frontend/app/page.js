'use client'; 

import axios from 'axios';
import { useState, useEffect } from 'react';
import BlogCard from './components/BlogCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts`);
        setPosts(data); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); 


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='w-full h-full'>
        {
      (
        <div className='max-w-[1080px] mx-auto h-full mt-6 py-6'>
      <h1 className="text-2xl font-bold mb-6">All Blog Posts</h1>
      <div className='w-full grid grid-cols-2 grid-flow-row gap-8'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
      )
    }
    </div>  
  );
}
