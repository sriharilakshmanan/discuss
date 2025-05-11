import Link from 'next/link';
import {
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';
import AuthInfo from './auth-info';

function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href={'/'} className="font-bold">
                    Discuss
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Input placeholder="Search" />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <AuthInfo />
            </NavbarContent>
        </Navbar>
    );
}

export default Header;
