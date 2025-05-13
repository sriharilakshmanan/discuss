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
        <div>
            <h1>Search: {key}</h1>
        </div>
    );
}

export default SearchPage;
