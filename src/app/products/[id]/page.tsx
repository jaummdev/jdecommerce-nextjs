"use client";

import Image from "next/image";
import { ProductsProps } from "@/types/productsTypes";
import { RiStarSFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import api from "@/app/api/route";
import { usePathname } from "next/navigation";

export default function ProductDetails() {
    const pathname = usePathname();
    const id = pathname.split("/").pop(); // Extraindo o ID do final da URL

    if (!id) {
        return <div>Produto não encontrado ou carregando...</div>;
    }

    // Estado inicial como null para lidar com o carregamento
    const [productId, setProductId] = useState<ProductsProps | null>(null);

    useEffect(() => {
        if (id) {
            api.get(`products/${id}`)
                .then((response) => setProductId(response.data))
                .catch((error) => console.error("Erro ao buscar produto:", error));
        }
    }, [id]);

    // Verificação de produto inexistente ou em carregamento
    if (!productId) {
        return <div className="text-center">Carregando...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row">
                {/* Imagem do Produto */}
                <div className="flex-1 p-4">
                    <Image
                        className="rounded-lg"
                        src={productId.image}
                        alt={productId.title}
                        width={400}
                        height={400}
                    />
                </div>

                {/* Detalhes do Produto */}
                <div className="flex-1 p-4">
                    <h1 className="text-3xl font-semibold">{productId.title}</h1>
                    <h2 className="text-xl mt-2 font-normal">$ {productId.price}</h2>
                    <div className="flex items-center mt-4">
                        <RiStarSFill color="gold" size={25} />
                        <span className="ml-2">{productId.rating?.rate}</span>
                    </div>
                    <p className="mt-4">{productId.description}</p>
                </div>
            </div>
        </div>
    );
}
