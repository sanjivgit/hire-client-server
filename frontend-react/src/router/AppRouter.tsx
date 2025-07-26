
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import DashboardPage from "@/pages/admin/dashboard/Index";
import PartnersPage from "@/pages/admin/partners/PartnersPage";
import PartnerDetailPage from "@/pages/admin/partners/partnerId/PartnerDetailsPage";
import PartnerWorkHistoryPage from "@/pages/admin/partners/partnerId/work-history/PartnerWorkHistoryPage";
import WorkDetailsPage from "@/pages/admin/partners/partnerId/work-history/workId/WorkDetailsPage";
import AssignedWorkPage from "@/pages/admin/partners/assigned-work/AssignedWorkPage";
import ServiceTypesPage from "@/pages/admin/service-types/Index";
import ServicesPage from "@/pages/admin/services/Index";
import SettingsPage from "@/pages/admin/settings/Index";
import PrivacyPolice from "@/pages/PrivacyPolicy";
import DeleteAccountInfo from "@/pages/DeleteAccountInfo";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

                {/* All other routes with layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="/admin/dashboard" element={<DashboardPage />} />
                    <Route path="/admin/partners" element={<PartnersPage />} />
                    <Route path="/admin/partners/:id" element={<PartnerDetailPage />} />
                    <Route path="/admin/partners/:id/work-history" element={<PartnerWorkHistoryPage />} />
                    <Route path="/admin/partners/:id/work-history/:workId" element={<WorkDetailsPage />} />
                    <Route path="/admin/partners/assigned-work" element={<AssignedWorkPage />} />
                    <Route path="/admin/service-types" element={<ServiceTypesPage />} />
                    <Route path="/admin/services" element={<ServicesPage />} />
                    <Route path="/admin/settings" element={<SettingsPage />} />
                </Route>
                <Route path="/privacy-policy" element={<PrivacyPolice />} />
                <Route path="/account-deletion" element={<DeleteAccountInfo />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
