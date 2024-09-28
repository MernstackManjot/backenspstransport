
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors())
app.use(express.json())
const DriverSendEmail = require("../nodemailer/DriverNodermailer");
require("dotenv").config();

const driveRouter = express.Router();
const uploadDir = path.join(__dirname, 'uploads'); 

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

driveRouter.post("/drive", upload.fields([
    { name: 'RecentPhotograph', maxCount: 1 },
    { name: 'CopyofDrivingLicense', maxCount: 1 },
    { name: 'IDProof', maxCount: 1 },
    { name: 'necessarydocuments', maxCount: 1 },
    { name: 'fitnesscertificate', maxCount: 1 },
    { name: 'visiontest', maxCount: 1 }

]), async (req, res) => {
    try {
        const { name, email, phone, message, DateofBirth, AadharCardNumber, LicenseNumber, DateofIssue, ExpiryDate, drivingexperience, Typesofvehicles, Pastwork } = req.body;

        const response = await DriverSendEmail({
            name,
            email,
            phone,
            message,
            DateofBirth,
            AadharCardNumber,
            LicenseNumber,
            DateofIssue,
            ExpiryDate,
            drivingexperience,
            Typesofvehicles,
            Pastwork,
            RecentPhotograph: req.files.RecentPhotograph ? req.files.RecentPhotograph[0].filename : null,
            CopyofDrivingLicense: req.files.CopyofDrivingLicense ? req.files.CopyofDrivingLicense[0].filename : null,
            IDProof: req.files.IDProof ? req.files.IDProof[0].filename : null,
            necessarydocuments: req.files.necessarydocuments ? req.files.necessarydocuments[0].filename : null,
            fitnesscertificate: req.files.fitnesscertificate ? req.files.fitnesscertificate[0].filename : null,
            visiontest: req.files.visiontest ? req.files.visiontest[0].filename : null,

        }, uploadDir); 

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = driveRouter;
