'use client';
import { useActionState } from 'react';
import * as actions from '@/actions';
import {
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
} from '@nextui-org/react';
import FormButton from '../common/form-button';

interface PostCreateFormProps {
    topicSlug: string;
}

function PostCreateForm({ topicSlug }: PostCreateFormProps) {
    const [formState, action, isPending] = useActionState(
        actions.createPost.bind(null, topicSlug),
        {
            errors: {},
        }
    );
    return (
        <Popover placement="bottom" backdrop="opaque">
            <PopoverTrigger>
                <Button
                    color="primary"
                    radius="full"
                    variant="flat"
                    className="w-full"
                >
                    Create Post
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form
                    action={action}
                    noValidate
                    className="flex flex-col gap-4 p-4 w-80"
                >
                    <h3 className="text-lg">Create Post</h3>
                    <Input
                        name="title"
                        label="Title"
                        labelPlacement="outside"
                        placeholder="Title of the post"
                        isInvalid={!!formState.errors.title}
                        errorMessage={formState.errors.title?.join(', ')}
                    />
                    <Textarea
                        name="content"
                        label="Content"
                        labelPlacement="outside"
                        placeholder="Content of the post"
                        isInvalid={!!formState.errors.content}
                        errorMessage={formState.errors.content?.join(', ')}
                    />
                    {formState.errors._form ? (
                        <p className="m-auto text-danger">
                            {formState.errors._form.join(', ')}
                        </p>
                    ) : null}
                    <FormButton isLoading={isPending}>Save</FormButton>
                </form>
            </PopoverContent>
        </Popover>
    );
}

export default PostCreateForm;
