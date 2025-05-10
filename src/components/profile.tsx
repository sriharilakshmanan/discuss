'use client';

import { useSession } from 'next-auth/react';

function Profile() {
    const { data: session } = useSession();
    return (
        <>
            <p>From Client: </p>
            {session ? (
                <pre>{JSON.stringify(session, null, 2)}</pre>
            ) : (
                <p>Not signed in</p>
            )}
        </>
    );
}

export default Profile;
