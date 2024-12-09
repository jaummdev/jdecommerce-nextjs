"use client"

import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Logo } from "./ui/logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { BsCart, BsCartFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export function Header() {

    const pathname = usePathname()

    return (
        <>
            <header className="flex min-h-[150px] py-8 flex-wrap gap-4 w-full items-center justify-around border-b">
                <Link href="/" className="select-none">
                    <Logo />
                </Link>
                <div className="flex px-4 self-center gap-2">
                    <Input size={50} placeholder="Search your product" />
                    <Button color="var(--primary-green)" onClick={() => toast.error("Not working this function...")}>
                        <FiSearch />
                    </Button>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/cart">
                        {pathname === "/cart" ? <BsCartFill color="#008E5F" size={30} /> : <BsCart color="#000" size={30} />}
                    </Link>

                    <Link href="/favorites">
                        {pathname === "/favorites" ? <IoHeartSharp color="#008E5F" size={32} /> : <IoHeartOutline color="#000" size={32} />}
                    </Link>

                    <Avatar className="w-[50px] h-[50px]">
                        <AvatarImage src="https://i.pinimg.com/736x/24/08/e1/2408e185ffb7b010eb44b12c8f91c0b0.jpg" alt="Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </header>
        </>
    );
}