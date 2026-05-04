import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = 'PLN') {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency,
  }).format(price);
}
