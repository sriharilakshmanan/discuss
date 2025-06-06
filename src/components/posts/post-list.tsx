import Link from 'next/link';
import paths from '@/paths';
import { PostWithMetadata } from '@/db/queries/posts';

interface PostListProps {
    fetchPosts: () => Promise<PostWithMetadata[]>;
}

async function PostList({ fetchPosts }: PostListProps) {
    const posts = await fetchPosts();
    const renderedPosts = posts.map((post) => {
        const topicSlug = post.topic.slug;

        if (!topicSlug) {
            throw new Error('need a slug to link to a post');
        }

        return (
            <div key={post.id} className="border rounded p-2">
                <Link href={paths.postShow(topicSlug, post.id)}>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <div className="flex flex-row gap-8">
                        <p className="text-xs text-gray-400">
                            by {post.user.name}
                        </p>
                        <p className="text-xs text-gray-400">
                            {post._count.comments} comments
                        </p>
                    </div>
                </Link>
            </div>
        );
    });

    return <div className="space-y-2">{renderedPosts}</div>;
}

export default PostList;
