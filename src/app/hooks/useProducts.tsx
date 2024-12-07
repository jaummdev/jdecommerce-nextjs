import api from "@/app/api/route";
import { useState, useEffect } from "react";
import { ProductsProps } from "@/types/productsTypes";

export function useProducts(limit?: number) {
    const [data, setData] = useState<ProductsProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await api.get(`products?limit=${limit}`);
                setData(response.data);
                setError(null);
                setIsLoading(false);
            } catch (err) {
                console.error("Erro ao carregar produtos:", err);
                setError("Erro ao carregar produtos. Por favor, tente novamente.");
                setIsLoading(false);
            }
        }

        fetchData();
    }, [limit]);

    return { data, isLoading, error };
}
