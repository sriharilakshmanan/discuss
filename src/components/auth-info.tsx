'use client';
import {
    Avatar,
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import * as actions from '@/actions';
import { useSession } from 'next-auth/react';

export default function AuthInfo() {
    const { data: session, status } = useSession();
    let authInfo: React.ReactNode;
    if (status === 'loading') {
        authInfo = null;
    } else if (session?.user) {
        authInfo = (
            <Popover placement="bottom" offset={16}>
                <PopoverTrigger>
                    <Avatar
                        src={session.user.image || ''}
                        className="cursor-pointer"
                        size="sm"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <form action={actions.signOut} className="px-4 py-2">
                        <Button
                            type="submit"
                            color="default"
                            variant="flat"
                            radius="full"
                            size="sm"
                        >
                            sign out
                        </Button>
                    </form>
                </PopoverContent>
            </Popover>
        );
    } else {
        authInfo = (
            <form action={actions.signIn}>
                <Button type="submit" variant="flat" radius="full" size="sm">
                    sign in
                </Button>
            </form>
        );
    }
    return authInfo;
}
