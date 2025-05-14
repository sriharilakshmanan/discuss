import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';

interface TopicShowPageProps {
    params: Promise<{
        slug: string;
    }>;
}
async function TopicShowPage({ params }: TopicShowPageProps) {
    const { slug } = await params;
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-1 md:col-span-8">
                <h1 className="text-2xl font-bold mb-4">{`> ${slug}`}</h1>
                <PostList fetchPosts={() => fetchPostsByTopicSlug(slug)} />
            </div>
            <div className="col-span-1 md:col-span-4">
                <PostCreateForm topicSlug={slug} />
            </div>
        </div>
    );
}

export default TopicShowPage;
