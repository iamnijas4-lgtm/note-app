import bcrypt from "bcryptjs";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashOtp = async (otp: string) => {
  return bcrypt.hash(otp, 10);
};

export const compareOtp = async (otp: string, hashedOtp: string) => {
  return bcrypt.compare(otp, hashedOtp);
};