import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Logo } from "./ui/logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GoHeart } from "react-icons/go";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Categorys } from "./categorys";

export function Header() {
    return (
        <>
            <header className="flex min-h-[150px] py-8 flex-wrap gap-4 w-full items-center justify-around">
                <Link href="/" className="select-none">
                    <Logo />
                </Link>
                <div className="flex px-4 self-center gap-2">
                    <Input size={50} placeholder="Search your product" />
                    <Button color="var(--primary-green)">
                        <FiSearch />
                    </Button>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#">
                        <PiShoppingCartSimple size={30} />
                    </Link>

                    <Link href="#">
                        <GoHeart size={28} />
                    </Link>

                    <Avatar className="w-[50px] h-[50px]">
                        <AvatarImage src="https://i.pinimg.com/1200x/5d/cf/2d/5dcf2db15693c127637b8ca02bbb9597.jpg" alt="Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <Categorys />
        </>
    );
}