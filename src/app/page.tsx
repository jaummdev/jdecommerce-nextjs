"use client"
import { useProducts } from "./hooks/useProducts";
import { Product } from "@/components/product";

export default function Home() {

  const { data: products, isLoading, error } = useProducts();

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      {isLoading ? (
        <p className="min-h-[350px] text-center py-20">Loading products...</p>
      ) : (
        <section className="flex flex-wrap my-12 md:px-20 gap-0 sm:gap-6 pb-10 w-full justify-center">
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
