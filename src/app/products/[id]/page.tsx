"use client";

import Image from "next/image";
import api from "@/app/api/route";
import { ProductsProps } from "@/types/productsTypes";
import { RiStarSFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { toast } from "sonner";
import { addToCart, LOCAL_STORAGE_FAVORITE_KEY } from "@/utils/cartUtils";

export default function ProductDetails() {

    const pathname = usePathname();
    const id = pathname.split("/").pop(); // Extraindo o ID do final da URL

    // Estado inicial como null para lidar com o carregamento
    const [productId, setProductId] = useState<ProductsProps | null>(null);
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if (id) {
            api.get(`products/${id}`)
                .then((response) => setProductId(response.data))
                .catch((error) => console.error("Erro ao buscar produto:", error));
        }
    }, [id]);

    useEffect(() => {
        // Verificar se o produto atual está nos favoritos
        const storedFavorites = localStorage.getItem(LOCAL_STORAGE_FAVORITE_KEY)
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

        if (Array.isArray(favorites)) {
            setIsFavorite(favorites.includes(Number(id)));
        } else {
            console.log("Favoritos armazenados não são um Array: ", favorites)
        }
    }, [id]);

    const toggleFavorite = () => {
        if (!productId) return;

        // Recuperar favoritos armazenados como array de números
        const storedFavorites = localStorage.getItem(LOCAL_STORAGE_FAVORITE_KEY);
        const favorites: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

        if (Array.isArray(favorites) && favorites.includes(productId.id)) {
            // Remover dos favoritos
            const updatedFavorites = favorites.filter((favId) => favId !== productId.id);
            localStorage.setItem(LOCAL_STORAGE_FAVORITE_KEY, JSON.stringify(updatedFavorites));
            setIsFavorite(false);
            toast.success("Product removed from favorites !!")
        } else {
            // Adicionar aos favoritos
            favorites.push(productId.id);
            localStorage.setItem(LOCAL_STORAGE_FAVORITE_KEY, JSON.stringify(favorites));
            setIsFavorite(true);
            toast.success("Product added to favorites !!")
        }
    };

    // Verificação de produto inexistente ou em carregamento
    if (!productId) {
        return <div className="min-h-[350px] text-center py-20">Loading product...</div>;
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
                    <h1 className="text-md sm:text-lg md:text-xl font-normal">{productId.title}</h1>
                    <h2 className="text-3xl mt-2 font-medium">$ {productId.price}</h2>
                    <div className="flex items-center mt-4 gap-1">
                        <RiStarSFill color="gold" size={25} />
                        <span className="font-medium">
                            {productId.rating?.rate}
                        </span>
                        <span className="text-primary-green">
                            ({productId.rating?.count})
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-md mt-4">{productId.description}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-8">
                        <Button onClick={() => alert(`You buy ${productId.title}`)}>Buy</Button>
                        <Button variant="outline" onClick={() => addToCart(productId.id)}>Add to cart</Button>
                        <span className="cursor-pointer" onClick={toggleFavorite}>
                            {isFavorite ? <GoHeartFill size={28} color="#008E5F" /> : <GoHeart size={28} color="#008E5F" />}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}