import { db } from '@/db';
import { notFound } from 'next/navigation';

interface PostShowProps {
    postId: string;
}

async function PostShow({ postId }: PostShowProps) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const post = await db.post.findFirst({
        where: {
            id: postId,
        },
    });
    if (!post) {
        notFound();
    }
    return (
        <>
            <h1 className="text-2xl font-bold my-2">{post.title}</h1>
            <p className="p-4 border rounded">{post.content}</p>
        </>
    );
}

export default PostShow;
