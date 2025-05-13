import PostList from '@/components/posts/post-list';
import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { fetchTopPosts } from '@/db/queries/posts';
import { Divider } from '@nextui-org/react';

export default async function Home() {
    return (
        <div className="grid grid-cols-4 gap-4 p-4 justify-end">
            <div className="col-span-3">
                <h1 className="text-2xl font-bold mb-4">top posts</h1>
                <PostList fetchPosts={() => fetchTopPosts()} />
            </div>
            <div>
                <TopicCreateForm />
                <Divider className="my-2" />
                <h3 className="text-xl font-bold my-2">topics</h3>
                <TopicList />
            </div>
        </div>
    );
}
