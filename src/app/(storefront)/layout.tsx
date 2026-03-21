import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import CartIcon from '@/components/cart/CartIcon'

export default function StorefrontLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-sage-50">
            <header className="glass sticky top-0 z-50 border-b border-gray-100/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 sm:h-24 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <Image src="/new-logo.png" alt="Jaipal Kibo Logo" width={160} height={160} className="object-contain h-20 sm:h-24 w-auto scale-110 sm:scale-125 origin-left" priority />
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

            <footer className="bg-sage-100/50 border-t border-gray-200/60 py-12 mt-auto">
                <div className="mx-auto max-w-7xl px-4 text-center text-sage-800">
                    <p className="font-medium">&copy; {new Date().getFullYear()} Jaipal Kibo. All rights reserved.</p>
                    <p className="text-sm mt-2 opacity-70">Natural wellness products for a healthier lifestyle.</p>
                </div>
            </footer>
        </div>
    )
}
