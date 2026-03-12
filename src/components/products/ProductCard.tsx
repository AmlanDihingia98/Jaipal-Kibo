import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
import BuyNowButton from './BuyNowButton'

interface ProductCardProps {
    product: {
        id: string
        name: string
        price: number
        image_url: string
        description: string
    }
    priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <Link href={`/products/${product.id}`} className="relative h-64 w-full bg-gray-50 overflow-hidden">
                <Image
                    src={product.image_url || '/placeholder.png'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority={priority}
                />
            </Link>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight">
                    <Link href={`/products/${product.id}`} className="hover:text-indigo-600 transition-colors">
                        {product.name}
                    </Link>
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-4 mt-auto">
                    <span className="text-xl font-bold text-gray-900">
                        ₹{(product.price / 100).toFixed(2)}
                    </span>
                </div>

                <div className="flex gap-2">
                    <AddToCartButton product={product} />
                    <BuyNowButton product={product} />
                </div>
            </div>
        </div>
    )
}
