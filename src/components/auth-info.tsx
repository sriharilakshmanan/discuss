'use client';
import {
    Avatar,
    Button,
    NavbarItem,
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
            <NavbarItem>
                <Popover placement="bottom" offset={16}>
                    <PopoverTrigger>
                        <Avatar
                            src={session.user.image || ''}
                            className="cursor-pointer"
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <NavbarItem>
                            <form
                                action={actions.signOut}
                                className="px-4 py-2"
                            >
                                <Button
                                    type="submit"
                                    color="default"
                                    variant="light"
                                    radius="full"
                                >
                                    sign out
                                </Button>
                            </form>
                        </NavbarItem>
                    </PopoverContent>
                </Popover>
            </NavbarItem>
        );
    } else {
        authInfo = (
            <>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button type="submit" variant="light" radius="full">
                            sign up
                        </Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button type="submit" variant="flat" radius="full">
                            sign in
                        </Button>
                    </form>
                </NavbarItem>
            </>
        );
    }
    return authInfo;
}
