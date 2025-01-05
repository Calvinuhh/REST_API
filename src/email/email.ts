import nodemailer from "nodemailer";

process.loadEnvFile();
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, SERVER_URL } =
  process.env as {
    MAIL_HOST: string;
    MAIL_PORT: string;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    SERVER_URL: string;
  };

const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

export const enviarEmail = async (
  name: string,
  email: string,
  token: string
) => {
  await transport.sendMail({
    from: "REST API",
    to: email,
    subject: "Confirm your account",

    html: `
            <h2>Hi ${name}! click on the next link to confirm your account: </h2>
            <a href="${SERVER_URL}/auth/${token}">Confirm Account</a>
        `,
  });
};
