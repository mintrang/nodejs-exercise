import nodemailer from "nodemailer"

import dotenv from "dotenv";

dotenv.config()

enum EMAIL_TYPE {
  'acc_create'
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_SENDER,
    pass: process.env.GOOGLE_APP_PASSWORD
  },
});

const setSub = (type: string, content: string) => {
  switch(type) {
    case 'acc_create': {
      return {subject: 'Verify Email', content:`Verify url: ${content}`}
    }
  }
}

const sendEmail = async (type: string, {to, content}: {to: string, content: string}) => {
  const info = await transporter.sendMail({
    from: '"Min-NodeJS" <maddison53@ethereal.email>',
    to: to,
    subject: setSub(type, content)?.subject,
    text:  setSub(type, content)?.content,
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
}

export default sendEmail
