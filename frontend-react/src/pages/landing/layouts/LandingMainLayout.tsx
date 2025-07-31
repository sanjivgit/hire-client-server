import { Outlet } from "react-router-dom"
import { PageLayout } from "./page-layout"

const LandingMainLayout = () => {
    return (
        <PageLayout>
            <Outlet />
        </PageLayout>
    )
}

export default LandingMainLayout