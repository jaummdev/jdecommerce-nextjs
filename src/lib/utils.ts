import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const LOCAL_STORAGE_FAVORITE_KEY = "@jdcommerce_favorite"
export const LOCAL_STORAGE_CART_KEY = "@jdcommerce_cart"
