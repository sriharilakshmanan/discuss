import CommentShow from '@/components/comments/comment-show';
import { CommentWithAuthor } from '@/db/queries/comments';

interface CommentListProps {
    fetchComments: () => Promise<CommentWithAuthor[]>;
}

async function CommentList({ fetchComments }: CommentListProps) {
    const comments = await fetchComments();

    const topLevelComments = comments.filter(
        (comment) => comment.parentId === null
    );
    const renderedComments = topLevelComments.map((comment) => {
        return (
            <CommentShow
                key={comment.id}
                commentId={comment.id}
                comments={comments}
            />
        );
    });

    return (
        <div className="space-y-3">
            <h1 className="text-lg font-bold">{comments.length} comments</h1>
            {renderedComments}
        </div>
    );
}

export default CommentList;
