"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/route";
import { ProductsProps } from "@/types/productsTypes";
import { Button } from "@/components/ui/button";
import { LOCAL_STORAGE_FAVORITE_KEY } from "@/lib/utils";
import { toast } from "sonner";
import { LuMinus } from "react-icons/lu";
import { BsCartPlusFill } from "react-icons/bs";

export default function Favorites() {
    const [favorites, setFavorites] = useState<ProductsProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            const storedFavorites = localStorage.getItem(LOCAL_STORAGE_FAVORITE_KEY);
            const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

            if (favoriteIds.length > 0) {
                try {
                    // Fazer múltiplas requisições para obter os produtos favoritos
                    const favoriteProducts = await Promise.all(
                        favoriteIds.map((id) => api.get(`products/${id}`).then((res) => res.data))
                    );
                    setFavorites(favoriteProducts);
                } catch (error) {
                    console.error("Erro ao carregar produtos favoritos:", error);
                }
            }

            setLoading(false);
        };

        fetchFavorites();
    }, []);


    const removeFavorite = (id: number) => {
        const updatedFavorites = favorites.filter((product) => product.id !== id);
        localStorage.setItem(LOCAL_STORAGE_FAVORITE_KEY, JSON.stringify(updatedFavorites.map((product) => product.id)));
        setFavorites(updatedFavorites)

        toast.success("Product removed from favorites !!")
    }

    if (loading) {
        return <div className="min-h-[350px] text-center py-20">Loading favorites...</div>;
    }

    if (favorites.length === 0) {
        return <div className="min-h-[350px] text-center py-20">You haven't added products to favorites yet.</div>;
    }

    return (
        <div className="px-32 pb-16">
            <h1 className="text-2xl text-center font-bold my-10 text-primary-green">Your favorite products ({favorites.length})</h1>
            <div className="flex flex-wrap justify-center gap-4">
                {favorites.map((product) => (
                    <div key={product.id} className="border rounded-lg p-6 gap-4 flex flex-col">
                        <div className="flex flex-col max-w-[300px]">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-20 h-20 object-contain self-center mb-2"
                            />
                            <h2 className="text-lg font-normal truncate max-w-[250px]">{product.title}</h2>
                            <p className="text-gray-500">${product.price}</p>
                        </div>

                        <div className="flex justify-center gap-2">
                            <Button onClick={() => alert(`You buy ${product.title}!`)}>
                                <BsCartPlusFill />
                                Add to cart
                            </Button>

                            <Button variant="destructive" onClick={() => removeFavorite(product.id)}>
                                <LuMinus />
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
