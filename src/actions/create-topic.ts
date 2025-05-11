'use server';

import type { Topic } from '@prisma/client';
import { z } from 'zod';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
    name: z
        .string()
        .min(2, 'Must be at least 2 characters long')
        .regex(/[a-z-]/, 'Must be lowercase and hyphenated'),
    description: z.string().min(10, 'Must be at least 10 characters long'),
});

interface CreateTopicFormState {
    errors: { name?: string[]; description?: string[]; _form?: string[] };
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to create a topic'],
            },
        };
    }

    const name = formData.get('name');
    const description = formData.get('description');

    const result = createTopicSchema.safeParse({ name, description });
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
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
                _form: ['Something went wrong. Please try again later.'],
            },
        };
    }

    revalidatePath(paths.home());
    redirect(paths.topicShow(topic.slug));
}
