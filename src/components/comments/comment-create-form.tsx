'use client';

import { useActionState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';

interface CommentCreateFormProps {
    postId: string;
    parentId?: string;
    startOpen?: boolean;
}

export default function CommentCreateForm({
    postId,
    parentId,
    startOpen,
}: CommentCreateFormProps) {
    const [open, setOpen] = useState(startOpen);
    const ref = useRef<HTMLFormElement | null>(null);
    const [formState, action, isPending] = useActionState(
        actions.createComment.bind(null, { postId, parentId }),
        { errors: {} }
    );

    useEffect(() => {
        if (formState.success) {
            ref.current?.reset();

            if (!startOpen) {
                setOpen(false);
            }
        }
    }, [formState, startOpen]);

    const form = (
        <form action={action} ref={ref}>
            <div className="space-y-2 px-1">
                <Textarea
                    name="content"
                    placeholder="what's on your mind?"
                    isInvalid={!!formState.errors.content}
                    errorMessage={formState.errors.content?.join(', ')}
                />

                {formState.errors._form ? (
                    <p className="text-danger">
                        {formState.errors._form.join(', ')}
                    </p>
                ) : null}

                <FormButton isLoading={isPending} size="sm">
                    comment
                </FormButton>
            </div>
        </form>
    );

    return (
        <>
            <Button
                size="sm"
                radius="full"
                variant="flat"
                onPress={() => setOpen(!open)}
            >
                reply
            </Button>
            {open && form}
        </>
    );
}
