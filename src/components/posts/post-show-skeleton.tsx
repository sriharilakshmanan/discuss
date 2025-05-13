import { Skeleton } from '@nextui-org/react';

function PostShowSkeleton() {
    return (
        <div className="m-4">
            <div className="my-2">
                <Skeleton className="h-6 w-1/2 rounded" />
            </div>
            <div className="p-4 border rounded space-y-2">
                <Skeleton className="h-4 rounded" />
                <Skeleton className="h-4 rounded" />
            </div>
        </div>
    );
}

export default PostShowSkeleton;
