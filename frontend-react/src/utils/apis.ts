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
        PARTNER_LIST_WITH_STATS: '/dashboard/partner/list-with-stats?page=',
        ACCEPTED_SERVICES_STATISTICS: '/dashboard/accepted-services-statistics',
        PARTNER_WORK_HISTORY: (id: string) => `/dashboard/partner/${id}/history?page=`,
        PARTNER_WORK_STATS: (id: string) => `/dashboard/partner/${id}/work-stats`,
        SERVICE_HISTORY: '/dashboard/service-history',
    },
    FILES: {
        FILE: (id: string) => `file/${id}`,
        FILE_WITHOUT_TOKEN: (id: string) => `file-without-token/${id}`
    },
    SERVICE_TYPES: {
        LIST: '/service-types',
        CREATE: '/service-types/create',
        UPDATE: (id: number) => `/service-types/update/${id}`,
        DELETE: (id: number) => `/service-types/delete/${id}`
    },
    SERVICES: {
        LIST: '/services',
        CREATE: '/services/create',
        UPDATE: (id: number) => `/services/update/${id}`,
        DELETE: (id: number) => `/services/delete/${id}`
    },
    FILES_UPLOAD: {
        UPLOAD: '/file/upload'
    }
}

export const { AUTH, DASHBOARD, FILES, SERVICE_TYPES, SERVICES, FILES_UPLOAD } = APIs;

export default APIs