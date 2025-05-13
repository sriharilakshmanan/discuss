'use client';
import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

function SearchInput() {
    const searchParams = useSearchParams();
    return (
        <form action={actions.search}>
            <Input
                name="key"
                placeholder="search"
                defaultValue={searchParams.get('key') || ''}
            />
        </form>
    );
}

export default SearchInput;
