export default function Loading() {
    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-white opacity-50 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    )
}