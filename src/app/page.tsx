import { Button } from '@nextui-org/react';
import * as actions from '@/actions';
import { auth } from '@/auth';
import Profile from '@/components/profile';

export default async function Home() {
    const session = await auth();

    return (
        <>
            <form action={actions.signIn}>
                <Button type="submit">Sign In</Button>
            </form>
            <form action={actions.signOut}>
                <Button type="submit">Sign Out</Button>
            </form>
            <p>From Server: </p>
            {session ? (
                <pre>{JSON.stringify(session, null, 2)}</pre>
            ) : (
                <p>Not signed in</p>
            )}
            <Profile />
        </>
    );
}
