import type { FC } from "react";
import { Toaster } from "react-hot-toast";

interface ContentLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const ContentLayout: FC<ContentLayoutProps> = ({ children, className }) => {
    return (
        <div className={`h-[calc(100vh-85px)] w-screen md:w-full overflow-hidden overflow-y-scroll hide-scrollbar ${className}`}>
            <Toaster />
            {children}
        </div>
    )
}

export default ContentLayout