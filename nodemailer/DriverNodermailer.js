const nodemailer = require("nodemailer");
const path = require("path");

function DriverSendEmail(data, uploadDir) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const attachments = [
            { filename: data.RecentPhotograph, path: path.join(uploadDir, data.RecentPhotograph) },
            { filename: data.CopyofDrivingLicense, path: path.join(uploadDir, data.CopyofDrivingLicense) },
            { filename: data.IDProof, path: path.join(uploadDir, data.IDProof) },
            { filename: data.necessarydocuments, path: path.join(uploadDir, data.necessarydocuments) },
            // { filename: data.fitnesscertificate, path: path.join(uploadDir, data.fitnesscertificate) },
            // { filename: data.visiontest, path: path.join(uploadDir, data.visiontest) },
            ...(data.fitnesscertificate ? [{ filename: data.fitnesscertificate, path: path.join(uploadDir, data.fitnesscertificate) }] : []),
            ...(data.visiontest ? [{ filename: data.visiontest, path: path.join(uploadDir, data.visiontest) }] : []),
        ].filter(Boolean);

        const mailOptions = {
            from: data.email,
            to: process.env.EMAIL,
            subject: `Driver Registration Form Submission from ${data.name}`,
            html: `
                <h2>Driver Registration Form Submission</h2>
                <p><strong>Name:</strong> ${data.name}</p> 
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Message:</strong> ${data.message}</p>
                <p><strong>Date of Birth:</strong> ${data.DateofBirth}</p>
                <p><strong>Aadhar Card Number:</strong> ${data.AadharCardNumber}</p>
                <p><strong>License Number:</strong> ${data.LicenseNumber}</p>
                <p><strong>Date of Issue:</strong> ${data.DateofIssue}</p>
                <p><strong>Expiry Date:</strong> ${data.ExpiryDate}</p>
                <p><strong>Driving License experience:</strong> ${data.drivingexperience}</p>
                <p><strong>Types of vehicles:</strong> ${data.Typesofvehicles}</p>
                <p><strong>Pastwork:</strong> ${data.Pastwork}</p>
                <p><strong>Recent Photograph:</strong> ${data.RecentPhotograph}</p>
                <p><strong>Copy of Driving License:</strong> ${data.CopyofDrivingLicense}</p>
                <p><strong>ID Proof:</strong> ${data.IDProof}</p>
                <p><strong>Necessary Documents:</strong> ${data.necessarydocuments}</p> 
                <p><strong>Fitness certificate:</strong> ${data.fitnesscertificate}</p>
                <p><strong>Vision test:</strong> ${data.visiontest}</p>

            `,
            attachments: attachments,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject({ error: error.message });
            }
            resolve({ message: "Email sent successfully" });
        });
    });
}

module.exports = DriverSendEmail;
