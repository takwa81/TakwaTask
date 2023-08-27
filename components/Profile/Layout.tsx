import React, { ReactNode } from 'react';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    children
}) => {
    return (
        <>
            <section className="relative">
                <div className="m-0 max-w-full max-h-80 w-full h-80 bg-[#3F94F3]   absolute inset-0">
                    <div className="flex items-center justify-center h-screen">
                        {children}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Layout;
