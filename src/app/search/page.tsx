import PostList from '@/components/posts/post-list';
import { fetchPostsBySearchKey } from '@/db/queries/posts';
import { redirect } from 'next/navigation';

interface SearchPageProps {
    searchParams: Promise<{
        key: string;
    }>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
    const { key } = await searchParams;
    if (!key) {
        redirect('/');
    }
    return (
        <>
            <h1 className="text-2xl font-medium mb-4">
                {`search results for "${key}"`}
            </h1>
            <PostList fetchPosts={() => fetchPostsBySearchKey(key)} />
        </>
    );
}

export default SearchPage;
