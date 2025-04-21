const APIs = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forget-password',
        PHONE__SEND_OTP: '/auth/phone/send-otp',
    },
    DASHBOARD: {
        PARTNER_STATISTICS: '/dashboard/partner-statistics',
        LATEST_PARTNERS: '/dashboard/latest-partners',
        PARTNER_DETAILS: '/dashboard/partner',
        PARTNER_APPROVE: (id: string) => `dashboard/partner/${id}/approve`,
        PARTNER_REJECT: (id: string) => `/dashboard/partner/${id}/reject`,
        PARTNER_SUSPEND: (id: string) => `/dashboard/partner/${id}/suspend`,
        PARTNER_LIST: '/dashboard/partner/list?page=',
    },
    FILES: {
        FILE: (id: string) => `files/${id}`
    }
}

export const { AUTH, DASHBOARD, FILES } = APIs;

export default APIs