import { db } from '@/db';
import paths from '@/paths';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

async function TopicList() {
    const topics = await db.topic.findMany();
    const renderedTopics = topics.map((topic) => (
        <Link href={paths.topicShow(topic.slug)} key={topic.id}>
            <Chip color="warning" variant="flat">
                {`> ${topic.slug}`}
            </Chip>
        </Link>
    ));
    return (
        <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>
    );
}

export default TopicList;
