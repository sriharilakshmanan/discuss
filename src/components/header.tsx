import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';
import AuthInfo from './auth-info';
import SearchInput from './search-input';
import { Suspense } from 'react';

function Header() {
    return (
        <Navbar className="shadow">
            <NavbarBrand>
                <Link href={'/'} className="font-bold">
                    {'> discuss'}
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Suspense>
                        <SearchInput />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <AuthInfo />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default Header;
