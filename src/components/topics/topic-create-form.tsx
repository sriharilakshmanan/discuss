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
                <Button
                    color="primary"
                    radius="full"
                    variant="flat"
                    className="w-full"
                >
                    create topic
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form
                    className="flex flex-col gap-4 p-4 w-80"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Input
                        name="name"
                        label="name"
                        labelPlacement="outside"
                        placeholder="name of topic"
                        isInvalid={!!formState.errors.name}
                        errorMessage={formState.errors.name?.join(', ')}
                    />
                    <Textarea
                        name="description"
                        label="description"
                        labelPlacement="outside"
                        placeholder="description of topic"
                        isInvalid={!!formState.errors.description}
                        errorMessage={formState.errors.description?.join(', ')}
                    />
                    {formState.errors._form ? (
                        <p className="m-auto text-danger">
                            {formState.errors._form.join(', ')}
                        </p>
                    ) : null}
                    <FormButton isLoading={isPending}>save</FormButton>
                </form>
            </PopoverContent>
        </Popover>
    );
}
