import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/products/ProductCard'

// Revalidate this page highly frequently or based on tags if you use standard fetch
export const revalidate = 60

export default async function StorefrontPage() {
    const supabase = await createClient()

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12)

    if (error) {
        console.error('Failed to fetch products:', error.message)
        // graceful fail - will show 'No products found' below
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                    Live a Healthier Life with Nature 🌿
                </h1>
                <p className="max-w-3xl mx-auto text-xl text-gray-500 leading-relaxed">
                    Discover natural wellness products made from powerful herbs like Stevia, Moringa, and Turmeric. Pure, chemical-free supplements designed to support a healthy lifestyle.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                    <a href="#products" className="rounded-full bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition">
                        Shop Now
                    </a>
                    <a href="#products" className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition">
                        Explore Products
                    </a>
                    <a href="#" className="rounded-full px-8 py-3.5 text-base font-semibold text-green-700 hover:bg-green-50 transition">
                        Learn About Natural Wellness <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>

            <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 scroll-mt-24">
                {products?.map((product, i) => (
                    <ProductCard key={product.id} product={product} priority={i < 4} />
                ))}
                {(!products || products.length === 0) && (
                    <p className="col-span-full text-center text-gray-500 py-12">
                        No products found. Please check back later.
                    </p>
                )}
            </div>
        </div>
    )
}
