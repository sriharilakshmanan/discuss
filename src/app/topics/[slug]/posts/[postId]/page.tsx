import Link from 'next/link';
import paths from '@/paths';
import PostShow from '@/components/posts/post-show';
import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';

interface PostShowPageProps {
    params: Promise<{
        slug: string;
        postId: string;
    }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
    const { slug, postId } = await params;
    return (
        <div className="space-y-3">
            <Link
                className="decoration-solid underline"
                href={paths.topicShow(slug)}
            >
                {`> ${slug}`}
            </Link>
            <PostShow postId={postId} />
            <CommentCreateForm postId={postId} startOpen />
            <CommentList postId={postId} />
        </div>
    );
}
