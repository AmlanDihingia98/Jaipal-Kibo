import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import CartIcon from '@/components/cart/CartIcon'

export default function StorefrontLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <Image src="/logo.png" alt="Jaipal Kibo Logo" width={200} height={80} className="object-contain h-16 sm:h-20 w-auto" priority />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <CartIcon />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="mx-auto max-w-7xl px-4 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} Jaipal Kibo. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
