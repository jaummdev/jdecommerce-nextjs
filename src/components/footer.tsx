import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full h-28 mt-4 flex items-center justify-center border-t-[1px]">
            <p className="text-wrap text-center px-6">
                Made by
                <Link className="text-primary-green mx-2"
                    href="https://github.com/jaummdev" target="_blank">
                    @jaummdev
                </Link>
                | Next JS, Tailwind CSS & FakeStoreAPI
            </p>
        </footer>
    );
}