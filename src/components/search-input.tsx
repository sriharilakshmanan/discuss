'use client';
import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

function SearchInput() {
    const searchParams = useSearchParams();
    return (
        <Input
            placeholder="search"
            defaultValue={searchParams.get('key') || ''}
        />
    );
}

export default SearchInput;
