import "../config/env";
import nodemailer from "nodemailer";

const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;

if (!mailUser || !mailPass) {
  throw new Error("MAIL_USER or MAIL_PASS missing");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

export const sendOtpEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Note App" <${mailUser}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>Note App OTP Verification</h2>
      <p>Your OTP code is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });
};