const nodemailer = require("nodemailer");

function SendEmail({ email, name, phone, message }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
    //    to: email,
    //   from: process.env.EMAIL,
      from:email,
      to:process.env.EMAIL, 
      subject: `Contact Form Submission from ${name}`,
      text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject({ error: error.message });
      }
      resolve({ message: "Email sent successfully" });
    });
  });
}

module.exports = SendEmail;
