"use client"
import { Categorys } from "@/components/categorys";
import { Header } from "@/components/header";
import { useProducts } from "./hooks/useProducts";
import { Product } from "@/components/product";

export default function Home() {

  const { data: products, isLoading, error } = useProducts();

  return (
    <div>
      <Header />
      <Categorys />

      {error && <p className="text-red-600">{error}</p>}
      {isLoading ? (
        <p className="text-center mt-20">Carregando produtos...</p>
      ) : (
        <section className="flex flex-wrap my-12 px-20 gap-5 w-full justify-center">
          {products.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              description={item.description}
            />
          ))}
        </section>
      )}
    </div>
  );
}
