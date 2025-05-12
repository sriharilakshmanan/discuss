'use server';
import type { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

const createPostSchema = z.object({
    title: z.string().min(2, 'must be at least 2 characters long'),
    content: z.string().min(10, 'must be at least 10 characters long'),
});

interface CreatePostFormState {
    errors: { title?: string[]; content?: string[]; _form?: string[] };
}

export async function createPost(
    topicSlug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ['you must be signed in to create a post'],
            },
        };
    }

    const title = formData.get('title');
    const content = formData.get('content');

    const result = createPostSchema.safeParse({ title, content });
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const topic = await db.topic.findFirst({
        where: { slug: topicSlug },
    });

    if (!topic) {
        return {
            errors: {
                _form: ['topic not found'],
            },
        };
    }
    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                topicId: topic.id,
                userId: session.user.id,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
        }
        return {
            errors: {
                _form: ['something went wrong, please try again later.'],
            },
        };
    }
    revalidatePath(paths.topicShow(topic.slug));
    redirect(paths.postShow(topic.slug, post.id));
}
