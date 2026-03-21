import { ReactNode } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Package, LogOut, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <Link href="/admin" className="text-xl font-bold tracking-tight text-indigo-600">
                        Admin Panel
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/admin" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition">
                        <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400" />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition">
                        <Package className="w-5 h-5 mr-3 text-gray-400" />
                        Products
                    </Link>
                    <Link href="/admin/orders" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition">
                        <ShoppingBag className="w-5 h-5 mr-3 text-gray-400" />
                        Orders
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <Link href="/" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition">
                        <ArrowLeft className="w-5 h-5 mr-3 text-gray-400" />
                        Back to Store
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 sm:px-8">
                    {/* Add a logout or profile button here if full auth is implemented */}
                    <span className="text-sm text-gray-500 mr-2">Admin Mode</span>
                </header>

                <div className="flex-1 overflow-auto p-6 sm:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
