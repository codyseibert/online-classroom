import React, { FC, ReactNode } from 'react'

type PageHeaderLayoutProps = {
    children: ReactNode
}

const PageLayout: FC<PageHeaderLayoutProps> = ({ children }) => {
    return (
        <main className="container mx-auto p-4 h-[calc(100vh-64px)] mt-16 bg-gradient-to-b from-bgPrimary to-bgSecondary dark:from-bgPrimaryDark dark:to-bgSecondaryDark">
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-full'>
                {children}
            </div>
        </main>
    )
}

export default PageLayout