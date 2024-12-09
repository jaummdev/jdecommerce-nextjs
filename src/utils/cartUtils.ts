export const LOCAL_STORAGE_FAVORITE_KEY = "@jdcommerce_favorite"
export const LOCAL_STORAGE_CART_KEY = "@jdcommerce_cart"

import { toast } from "sonner";

export function addToCart(productId: number) {
    if (!productId) return;

    // Recuperar carrinho armazenado
    const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    const cart: number[] = storedCart ? JSON.parse(storedCart) : [];

    console.log("Carrinho atual:", cart);

    if (Array.isArray(cart) && cart.includes(productId)) {
        console.log(`Produto ${productId} já está no carrinho.`); // Debug
        toast.error("Error or the product is in the cart!");
    } else {
        // Adicionar ao carrinho
        cart.push(productId);
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
        console.log(`Produto ${productId} adicionado ao carrinho.`); // Debug

        // Redirecionar para a página do carrinho
        window.location.assign("/cart");
    }
}