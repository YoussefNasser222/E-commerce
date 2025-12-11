import nodemailer from "nodemailer";
import { devConfig } from "../../config/local.config";
import { MailOptions } from "nodemailer/lib/json-transport";

export const sendMail = async (mailOption: MailOptions) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: devConfig.EMAIL_USER,
      pass: devConfig.EMAIL_PASSWORD,
    },
  });
  (mailOption.from = `E-commerce <${devConfig.EMAIL_USER}>`),
    await transport.sendMail(mailOption);
};
