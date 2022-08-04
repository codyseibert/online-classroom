import React, { FC, ReactNode } from 'react'

type PageSectionLayoutProps = {
    children: ReactNode

}

const PageSectionLayout: FC<PageSectionLayoutProps> = ({ children }) => {
    return (
        <div className='h-[calc(100vh-64px)] container mx-auto p-4 bg-gradient-to-b from-bgPrimary to-bgSecondary dark:from-bgPrimaryDark dark:to-bgSecondaryDark'>
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                {children}
            </div>
        </div>
    )
}

export default PageSectionLayout