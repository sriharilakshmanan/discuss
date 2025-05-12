'use client';
import {
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
} from '@nextui-org/react';
import * as actions from '@/actions';
import { startTransition, useActionState } from 'react';
import FormButton from '../common/form-button';

export default function TopicCreateForm() {
    const [formState, action, isPending] = useActionState(actions.createTopic, {
        errors: {},
    });
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    }
    return (
        <Popover placement="bottom" backdrop="opaque">
            <PopoverTrigger>
                <Button color="primary" radius="full">
                    Create Topic
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form
                    className="flex flex-col gap-4 p-4 w-80"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <h3 className="text-lg">Create Topic</h3>
                    <Input
                        name="name"
                        label="Name"
                        labelPlacement="outside"
                        placeholder="Name the topic"
                        isInvalid={!!formState.errors.name}
                        errorMessage={formState.errors.name?.join(', ')}
                    />
                    <Textarea
                        name="description"
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Describe the topic"
                        isInvalid={!!formState.errors.description}
                        errorMessage={formState.errors.description?.join(', ')}
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
