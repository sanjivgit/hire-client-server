import { useMutation } from '@tanstack/react-query';
import apiClient from '@/utils/apiService';
import { AUTH } from '@/utils/apis';

export interface LoginCredentials {
    phone: string;
    password: string;
}

export interface SignupCredentials {
    name: string;
    phone: string;
    password: string;
}

export interface OtpVerificationCredentials {
    phone: string;
    otp: string;
}

export interface ForgotPasswordCredentials {
    phone: string;
    password: string;
    otp: string;
}

export interface ResetPasswordCredentials {
    phone: string;
    otp: string;
    newPassword: string;
}

export interface SendOtpCredentials {
    phone: string;
}

export interface LoginResponse {
    data: {
        token: string;
        user: {
            id: number;
            name: string;
            profilePicId: number | null;
            phone: string;
            fcmToken: string | null;
            address: {
                address: string;
                pincode: string;
                state: string;
                city: string;
            };
            partner: {
                id: number;
                firstName: string;
                lastName: string;
                aadharNumber: string;
                aadharImageId: number;
                additionalDocumentId: number;
                status: 'rejected' | 'approved' | 'pending'; // Assuming status options
                serviceTypeId: number;
                services: {
                    id: number;
                    name: string;
                }[];
            };
        };
    };
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await apiClient.post<LoginResponse>(AUTH.LOGIN, credentials);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("data >>>", data)
            // Save token to localStorage
            localStorage.setItem('token', data.data.token);
            // You can also save user data if needed
            localStorage.setItem('user', JSON.stringify(data.data.user));
        },
    });
};

export const useSignup = () => {
    return useMutation({
        mutationFn: async (credentials: SignupCredentials) => {
            const response = await apiClient.post(AUTH.REGISTER, credentials);
            return response.data;
        },
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (credentials: ForgotPasswordCredentials) => {
            const response = await apiClient.post(AUTH.FORGOT_PASSWORD, credentials);
            return response.data;
        },
    });
};

export const useSendOtp = () => {
    return useMutation({
        mutationFn: async (credentials: SendOtpCredentials) => {
            const response = await apiClient.post(AUTH.PHONE__SEND_OTP, credentials);
            return response.data;
        },
    });
};
