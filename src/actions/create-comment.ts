'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

const createCommentSchema = z.object({
    content: z.string().min(4, 'must be at least 4 characters long'),
});

interface CreateCommentFormState {
    errors: {
        content?: string[];
        _form?: string[];
    };
    success?: boolean;
}

export async function createComment(
    { postId, parentId }: { postId: string; parentId?: string },
    formState: CreateCommentFormState,
    formData: FormData
): Promise<CreateCommentFormState> {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ['you must be signed in to leave a comment.'],
            },
        };
    }

    const content = formData.get('content');

    const result = createCommentSchema.safeParse({
        content: content,
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.content,
                postId: postId,
                parentId: parentId,
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
        } else {
            return {
                errors: {
                    _form: ['something went wrong, please try again later.'],
                },
            };
        }
    }

    const topic = await db.topic.findFirst({
        where: { posts: { some: { id: postId } } },
    });

    if (!topic) {
        return {
            errors: {
                _form: ['topic not found, hence failed to revalidate page.'],
            },
        };
    }

    revalidatePath(paths.postShow(topic.slug, postId));
    return {
        errors: {},
        success: true,
    };
}
