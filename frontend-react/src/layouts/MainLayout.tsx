import AdminLayout from "@/components/layout/admin-layout";
import { Outlet } from "react-router-dom";

const MainLayout = () => {

    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
};

export default MainLayout;
