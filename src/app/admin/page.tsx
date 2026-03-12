export default function AdminDashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="mt-2 text-3xl font-semibold text-gray-900">₹0.00</dd>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Orders</dt>
                    <dd className="mt-2 text-3xl font-semibold text-gray-900">0</dd>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <dt className="text-sm font-medium text-gray-500 truncate">Products in Catalog</dt>
                    <dd className="mt-2 text-3xl font-semibold text-gray-900">Manage ➔</dd>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <p className="text-gray-500 text-sm">Dashboard is ready. Next up: Configure products.</p>
            </div>
        </div>
    )
}
