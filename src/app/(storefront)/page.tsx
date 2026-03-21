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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Hero Section */}
            <div className="relative isolate pt-16 pb-24 sm:pt-28 sm:pb-36 overflow-hidden rounded-3xl bg-sage-800 text-white shadow-2xl mb-24">
                {/* Decorative background glow */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                <div className="absolute top-0 right-0 -z-10 w-[40rem] h-[40rem] opacity-30 bg-brand-500 blur-[100px] rounded-full mix-blend-screen pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 -z-10 w-[30rem] h-[30rem] opacity-20 bg-gold-400 blur-[100px] rounded-full mix-blend-screen pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

                <div className="mx-auto max-w-4xl text-center px-6 lg:px-8">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
                        Live a Healthier Life <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-gold-300 to-brand-100">
                            with Nature 🌿
                        </span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl md:text-2xl text-sage-100 leading-relaxed font-light mb-12">
                        Discover natural wellness products made from powerful herbs like Stevia, Moringa, and Turmeric. Pure, chemical-free supplements designed to support a healthy lifestyle.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <a href="#products" className="rounded-full bg-brand-500 px-10 py-4 text-lg font-semibold text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:-translate-y-1 hover:bg-brand-400 transition-all duration-300">
                            Shop Now
                        </a>
                        <a href="#products" className="rounded-full bg-white/10 backdrop-blur border border-white/20 px-10 py-4 text-lg font-semibold text-white hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                            Explore Products
                        </a>
                    </div>
                </div>
            </div>

            {/* Products Section Header */}
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-sage-800 sm:text-4xl mb-4">Our Premium Selection</h2>
                <div className="w-24 h-1.5 bg-brand-500 mx-auto rounded-full mb-4"></div>
                <p className="text-lg text-sage-800/80">Carefully curated natural wellness products just for you.</p>
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
