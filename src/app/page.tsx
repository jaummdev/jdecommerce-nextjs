"use client"
import { useEffect, useState } from "react";
import { Categorys } from "@/components/categorys";
import { Header } from "@/components/header";
import { Products } from "@/components/products";
import api from "./api/route";
import { ProductsProps } from "@/types/productsTypes";

export default function Home() {

  const [products, setProducts] = useState<ProductsProps[]>([])

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get<ProductsProps[]>("products?limit=20")

        setProducts(response.data)
      }
      catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    loadProducts()

  }, []);

  return (
    <div>
      <Header />
      <Categorys />

      <section className="flex flex-wrap my-12 px-20 gap-5 w-full justify-center">
        {products.map((item) => (
          <Products
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </section>
    </div>
  );
}