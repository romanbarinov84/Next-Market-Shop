export interface ProductCardProps {
    id: number;
    img: string;
    name: string;
    description: string;
    basePrice: number;
    discountPercent: number;
    rating: number;
    weight?: string;
    volume?: string;
}
