import nodemailer from "nodemailer";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, SERVER_URL, EMAIL } =
  process.env as {
    [key: string]: string;
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
    from: `${EMAIL} - REST API`,
    to: email,
    subject: "Confirm your account",

    html: `
            <h2>Hi ${name}! click on the next link to confirm your account: </h2>
            <a href="${SERVER_URL}/auth/${token}">Confirm Account</a>
        `,
  });
};
