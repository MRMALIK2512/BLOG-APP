import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

const BlogCard = ({ post }) => {
  return (
    <Card className="mb-4 flex flex-col justify-between">
      <CardHeader>
        <h3 className="text-lg font-bold">{post.title}</h3>
        <CardDescription>{post.content.substring(0, 100)}...</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <Link href={`/posts/${post.id}`} className="text-blue-800 hover:scale-[1.1]">
          View Post
        </Link>
        <Link href={`/edit/${post.id}`} className="text-blue-800 hover:scale-[1.1]">
          Edit Post
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
