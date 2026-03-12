'use client'

import { useCartStore } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalAmount, clearCart } = useCartStore()
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true)
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            })

            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                alert(data.error || 'Something went wrong')
            }
        } catch (err) {
            console.error(err)
            alert('Checkout failed')
        } finally {
            setIsCheckingOut(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center min-h-[60vh]">
                <ShoppingBag className="w-24 h-24 text-gray-200 mb-6" />
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h1>
                <p className="text-gray-500 mb-8 max-w-md text-center">
                    Looks like you haven't added anything to your cart yet. Let's find some amazing products!
                </p>
                <Link
                    href="/"
                    className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={item.image_url || '/placeholder.png'}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                        <Link href={`/products/${item.id}`} className="hover:text-indigo-600 transition">
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <p className="text-lg font-bold text-gray-900 ml-4 whitespace-nowrap">
                                        ₹{(item.price / 100).toFixed(2)}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                        <dl className="space-y-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <dt>Subtotal</dt>
                                <dd className="font-medium text-gray-900">₹{(totalAmount() / 100).toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt>Shipping</dt>
                                <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-bold text-gray-900">Total</dt>
                                <dd className="text-base font-bold text-gray-900">₹{(totalAmount() / 100).toFixed(2)}</dd>
                            </div>
                        </dl>

                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut || items.length === 0}
                            className="mt-8 w-full bg-indigo-600 !text-white hover:bg-indigo-700 disabled:bg-gray-400 py-4 px-4 rounded-xl font-semibold flex items-center justify-center transition"
                        >
                            {isCheckingOut ? (
                                <>Processing... <Loader2 className="w-5 h-5 ml-2 animate-spin" /></>
                            ) : (
                                <>Checkout with Stripe <ArrowRight className="w-5 h-5 ml-2" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
