"use client";

import Image from "next/image";
import api from "@/app/api/route";
import { ProductsProps } from "@/types/productsTypes";
import { RiStarSFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function ProductDetails() {
    const pathname = usePathname();
    const id = pathname.split("/").pop(); // Extraindo o ID do final da URL

    // Estado inicial como null para lidar com o carregamento
    const [productId, setProductId] = useState<ProductsProps | null>(null);
    const [favorite, setFavorite] = useState<boolean>(false)

    useEffect(() => {
        if (id) {
            api.get(`products/${id}`)
                .then((response) => setProductId(response.data))
                .catch((error) => console.error("Erro ao buscar produto:", error));
        }
    }, [id]);

    // Verificação de produto inexistente ou em carregamento
    if (!productId) {
        return <div className="text-center py-20">Carregando...</div>;
    }

    return (
        <div className="flex items-center justify-center p-5 w-full sm:p-12">
            <div className="flex w-full lg:w-fit flex-wrap items-center justify-center border-[1px] border-slate-300 rounded-xl px-10 py-10 gap-20">
                {/* Imagem do Produto */}
                <div>
                    <Image
                        className="rounded-lg"
                        src={productId.image}
                        alt={productId.title}
                        width={300}
                        height={300}
                    />
                </div>

                {/* Detalhes do Produto */}
                <div className="max-w-[500px] pb-10">
                    <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl font-normal">{productId.title}</h1>
                    <h2 className="text-3xl mt-2 font-medium">$ {productId.price}</h2>
                    <div className="flex items-center mt-4">
                        <RiStarSFill color="gold" size={25} />
                        <span className="ml-2">{productId.rating?.rate} ({productId.rating?.count})</span>
                    </div>
                    <p className="text-sm sm:text-md md:text-base mt-4">{productId.description}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-8">
                        <Button onClick={() => alert("Você comprou!")}>Comprar</Button>
                        <Button variant="outline" onClick={() => alert("Você adicionou ao carrinho!")}>Adicionar ao carrinho</Button>
                        <span className="cursor-pointer" onClick={() => setFavorite(!favorite)}>
                            {favorite ? <GoHeartFill size={28} color="#008E5F" /> : <GoHeart size={28} color="#008E5F" />}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
