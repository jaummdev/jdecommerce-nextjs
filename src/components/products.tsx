import { ProductsProps } from "@/types/productsTypes";
import Image from "next/image";
import Link from "next/link";
import { RiStarSFill } from "react-icons/ri";

export function Products(props: ProductsProps) {

    return (
        <section className="flex flex-col mb-3 max-w-[300px]">
            <Link href="/">
                <div className="flex w-[300px] h-[300px] items-center justify-center border-[1px] border-gray-300 px-10 py-6 rounded-md">
                    <Image className="rounded max-h-[300px] w-full p-2" width={150} height={150} src={props.image} alt="Product" />
                </div>

                <div className="flex flex-wrap justify-between px-3 mt-2">
                    <h2 className="font-normal text-lg truncate">{props.title}</h2>
                    <h1 className="flex w-full justify-between font-semibold text-2xl">
                        <span>${props.price}</span>
                        <span className="flex items-center text-lg font-normal">
                            <RiStarSFill color="gold" size={25} />
                            {props.rating.rate}
                        </span>
                    </h1>
                </div>
            </Link>
        </section>
    );
}