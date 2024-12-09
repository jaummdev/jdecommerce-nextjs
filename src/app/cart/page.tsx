"use client"

import api from "../api/route";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_CART_KEY } from "@/utils/cartUtils";
import { ProductsProps } from "@/types/productsTypes";
import { toast } from "sonner";
import { Button, handleClick } from "@/components/ui/button";

export default function Cart() {

    const [cart, setCart] = useState<ProductsProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const shippingCost = 14.99

    useEffect(() => {
        const fetchCartItems = async () => {
            const storedCartItems = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            const cartItemIds: number[] = storedCartItems ? JSON.parse(storedCartItems) : [];

            if (cartItemIds.length > 0) {
                try {
                    // Fazer múltiplas requisições para obter os produtos carrinho
                    const cartProducts = await Promise.all(
                        cartItemIds.map((id) => api.get(`products/${id}`).then((res) => res.data))
                    );
                    setCart(cartProducts);

                    // Calculando subtotal
                    const calculatedSubtotal = cartProducts.reduce((acc, product) => acc + product.price, 0)
                    setSubtotal(calculatedSubtotal)

                    const calculatedTotal = calculatedSubtotal + shippingCost
                    setTotal(calculatedTotal)

                } catch (error) {
                    console.error("Erro ao carregar produtos do carrinho:", error);
                }
            }

            setLoading(false);
        };

        fetchCartItems();
    }, []);

    const removeItemCart = (id: number) => {
        // Remover o produto do carrinho no estado
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);

        // Atualizar o localStorage com os novos itens do carrinho
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedCart.map((product) => product.id)));

        // Recalcular subtotal e total
        const newSubtotal = updatedCart.reduce((acc, product) => acc + product.price, 0);
        setSubtotal(newSubtotal);
        const newTotal = newSubtotal + shippingCost;
        setTotal(newTotal);

        // Exibir notificação
        toast.success("Product removed from cart!");
    };

    if (loading) {
        return <div className="min-h-[350px] text-center py-20">Loading products in cart...</div>;
    }

    if (cart.length === 0) {
        return <div className="min-h-[350px] text-center py-20">You haven't added products to your cart yet.</div>;
    }

    return (
        <div className="px-2 md:px-32 md:pb-16">
            <h1 className="text-2xl text-center font-bold my-10 text-primary-green">Your cart ({cart.length})</h1>
            <div className="flex flex-wrap justify-center gap-5">
                <section className="flex flex-col pr-4 gap-6 max-w-[500px] max-h-[600px] overflow-y-auto">
                    {cart.map((product) => (
                        <div
                            key={product.id}
                            className="w-full rounded-lg px-4 flex gap-8 items-center"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="flex w-16 object-contain"
                            />
                            <div className="flex flex-col w-full">
                                <h2 className="text-sm sm:text-lg font-normal">{product.title}</h2>

                                <div className="flex flex-wrap items-center justify-between gap-2 my-4">
                                    <p className="text-xl font-medium">${product.price}</p>

                                    <Button variant="outline" className="hover:bg-red-500 hover:text-ghost-white" onClick={() => removeItemCart(product.id)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ))}
                </section>

                <section className="w-full flex flex-col max-w-[500px] px-4 sm:px-14 sm:py-10">
                    <div className="flex w-full justify-between my-2">
                        <h2 className="text-sm">Subtotal:</h2>
                        <p className="text-lg font-normal">$ {subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex w-full justify-between my-2">
                        <h2 className="text-sm">Estimated shipping:</h2>
                        <p className="text-lg font-normal">$ {shippingCost}</p>
                    </div>
                    <div className="flex border-t w-full my-6 py-6 justify-between">
                        <h2 className="text-xl">Total:</h2>
                        <p className="text-3xl font-semibold text-primary-green">$ {total.toFixed(2)}</p>
                    </div>
                    <Button onClick={handleClick}>
                        Checkout
                    </Button>
                </section>
            </div>
        </div >
    );
}