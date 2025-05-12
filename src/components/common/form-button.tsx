'use client';

import { Button, ButtonProps } from '@nextui-org/react';

function FormButton({ children, isLoading, size }: ButtonProps) {
    return (
        <Button
            type="submit"
            radius="full"
            variant="flat"
            isLoading={isLoading}
            size={size}
        >
            {children}
        </Button>
    );
}

export default FormButton;
