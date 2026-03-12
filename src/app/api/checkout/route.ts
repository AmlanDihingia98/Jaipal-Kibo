import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        const { items } = await req.json()

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
        }

        // Attempt to get the logged-in user (optional for guest checkout)
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll() { },
                },
            }
        )

        const { data: { user } } = await supabase.auth.getUser()

        // Format line items for Stripe
        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                    images: item.image_url ? [item.image_url] : [],
                },
                unit_amount: item.price, // Already in cents
            },
            quantity: item.quantity,
        }))

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cart`,
            metadata: {
                userId: user?.id || 'guest',
                // Note: You can store the products mapping in metadata or directly in Supabase before creating this session
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (error: any) {
        console.error('Checkout error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
