class ApiUrls {
  private static readonly BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  static readonly AUTH = {
    SIGNUP: `${ApiUrls.BASE_URL}/auth/signup`,
    LOGIN: `${ApiUrls.BASE_URL}/auth/login`,
    VERIFY_OTP: `${ApiUrls.BASE_URL}/auth/verify-otp`,
    RESEND_OTP: `${ApiUrls.BASE_URL}/auth/resend-otp`,
    FORGOT_PASSWORD: `${ApiUrls.BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${ApiUrls.BASE_URL}/auth/reset-password`,
  };

  static readonly NOTES = {
    CREATE: `${ApiUrls.BASE_URL}/notes`,
    GET_ALL: `${ApiUrls.BASE_URL}/notes`,
    UPDATE: (id: string) => `${ApiUrls.BASE_URL}/notes/${id}`,
    DELETE: (id: string) => `${ApiUrls.BASE_URL}/notes/${id}`,
  };
}

export default ApiUrls;