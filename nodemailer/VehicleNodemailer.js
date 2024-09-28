const nodemailer = require("nodemailer");
const path = require("path");

function VehicleSendEmail(data, uploadDir) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const attachments = [
            { filename: data.InsuranceDetails, path: path.join(uploadDir, data.InsuranceDetails) },
            { filename: data.PermitExpiry, path: path.join(uploadDir, data.PermitExpiry) },
            { filename: data.FitnessCertificate, path: path.join(uploadDir, data.FitnessCertificate) },
            { filename: data.PollutionUnder, path: path.join(uploadDir, data.PollutionUnder) },
            { filename: data.FrontSide, path: path.join(uploadDir, data.FrontSide) },
            { filename: data.BackSide, path: path.join(uploadDir, data.BackSide) },
            { filename: data.SideViews, path: path.join(uploadDir, data.SideViews) },
        ].filter(Boolean);

        const mailOptions = {
            from: data.email,
            to: process.env.EMAIL,
            subject: `Vehicle Registration Form Submission from ${data.name}`,
            html: `
                <h2>Vehicle Registration Form Submission</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Message:</strong> ${data.message}</p>
                <p><strong>Vehicle Type:</strong> ${data.VehicleType}</p>
                <p><strong>ID Proof Number:</strong> ${data.IDProofNumber}</p>
                <p><strong>Vehicle Registration:</strong> ${data.VehicleRegistration}</p>
                <p><strong>Year of Manufacture:</strong> ${data.YearofManufacture}</p>
                <p><strong>Chassis Number:</strong> ${data.ChassisNumber}</p>
                <p><strong>Engine Number:</strong> ${data.EngineNumber}</p>
                <p><strong>Vehicle Lifting Capacity:</strong> ${data.VehicleLiftingCapacity}</p> 
                <p><strong>Insurance Details:</strong> ${data.InsuranceDetails}</p>
                <p><strong>Permit Expiry:</strong> ${data.PermitExpiry}</p>
                <p><strong>Fitness Certificate:</strong> ${data.FitnessCertificate}</p>
                <p><strong>Pollution Under:</strong> ${data.PollutionUnder}</p>
                <p><strong>Front Side:</strong> ${data.FrontSide}</p>
                <p><strong>Back Side:</strong> ${data.BackSide}</p>
                <p><strong>Permit Expiry:</strong> ${data.PermitExpiry}</p>
                <p><strong> Side Views:</strong> ${data. SideViews}</p>

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

module.exports = VehicleSendEmail;
