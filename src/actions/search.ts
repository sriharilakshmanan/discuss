'use server';

import { redirect } from 'next/navigation';

export async function search(formData: FormData) {
    const key = formData.get('key');
    if (!key || typeof key !== 'string') {
        redirect('/');
    }
    redirect(`/search?key=${key}`);
}
