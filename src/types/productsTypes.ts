export interface ProductsProps {
    id: number,
    title: string,
    image: string,
    price: string,
    rating: {
        rate: number,
        count: number
    },
}