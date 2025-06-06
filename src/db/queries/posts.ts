import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithMetadata = Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number };
};

export function fetchPostsByTopicSlug(
    slug: string
): Promise<PostWithMetadata[]> {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });
}

export function fetchTopPosts(): Promise<PostWithMetadata[]> {
    return db.post.findMany({
        orderBy: { comments: { _count: 'desc' } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
        take: 5,
    });
}

export function fetchPostsBySearchKey(
    key: string
): Promise<PostWithMetadata[]> {
    return db.post.findMany({
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
        where: {
            OR: [{ title: { contains: key } }, { content: { contains: key } }],
        },
    });
}
