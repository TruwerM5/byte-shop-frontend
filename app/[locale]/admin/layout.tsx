import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admin',
}

export default async function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className='admin'>
            {children}
        </div>
    )
}