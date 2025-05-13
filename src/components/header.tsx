import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';
import AuthInfo from './auth-info';
import SearchInput from './search-input';

function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href={'/'} className="font-bold">
                    {'> discuss'}
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <SearchInput />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <AuthInfo />
            </NavbarContent>
        </Navbar>
    );
}

export default Header;
