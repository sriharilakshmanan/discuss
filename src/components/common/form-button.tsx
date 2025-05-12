'use client';

import { Button } from '@nextui-org/react';

interface FormButtonProps {
    children: React.ReactNode;
    isLoading: boolean;
}

function FormButton({ children, isLoading }: FormButtonProps) {
    return (
        <Button type="submit" radius="full" isLoading={isLoading}>
            {children}
        </Button>
    );
}

export default FormButton;
