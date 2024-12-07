import Link from "next/link";
import { Separator } from "./ui/separator";

export function Categorys() {

    return (
        <div className="w-full px-5">
            <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-10 mb-6 text-wrap">
                <Link href="/categorys/man">Man</Link>
                <Link href="/categorys/women">Women</Link>
                <Link href="/categorys/kids">Kids</Link>
                <Link href="/categorys/sports">Sports</Link>
                <Link href="/categorys/brands">Brands</Link>
                <Link href="/categorys/new" className="text-primary-green">New</Link>
            </ul>

            <Separator orientation="horizontal" />
        </div>
    );
}