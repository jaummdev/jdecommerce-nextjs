import Image from "next/image";
import Link from "next/link";
import { ProductsProps } from "@/types/productsTypes";
import { RiStarSFill } from "react-icons/ri";

export function Product({ id, title, image, price, rating }: ProductsProps) {

    return (
        <section className="flex flex-col mb-3 max-w-[300px]">
            <Link href={`/products/${id}`}>
                <div className="flex w-[300px] h-[300px] items-center justify-center  hover:border-primary-green transition-colors px-10 py-6 rounded-md">
                    <Image className="rounded w-60 h-60 p-2 object-contain" width={150} height={150} src={image} alt="Product" />
                </div>

                <div className="flex flex-wrap justify-between px-3 mt-2">
                    <h2 className="font-normal text-lg truncate">{title}</h2>
                    <h1 className="flex w-full justify-between font-semibold text-2xl">
                        <span>$ {price}</span>
                        <span className="flex items-center text-lg font-normal">
                            <RiStarSFill color="gold" size={25} />
                            {rating.rate}
                        </span>
                    </h1>
                </div>
            </Link>
        </section>
    );
}