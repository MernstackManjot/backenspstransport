const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors())
app.use(express.json())
const VehicleSendEmail = require("../nodemailer/VehicleNodemailer");
require("dotenv").config();

const VehicleRouter = express.Router();
const uploadDir = path.join(__dirname, 'vehicleuploads'); 

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

VehicleRouter.post("/vehicle", upload.fields([
    { name: 'InsuranceDetails', maxCount: 1 },
    { name: 'PermitExpiry', maxCount: 1 },
    { name: 'FitnessCertificate', maxCount: 1 },
    { name: 'PollutionUnder', maxCount: 1 },
    { name: 'FrontSide', maxCount: 1 },
    { name: 'BackSide', maxCount: 1 },
    { name: 'SideViews', maxCount: 1 },
    { name: 'VehicleRegistration', maxCount: 1 },

]), async (req, res) => {
    try {
        const {     
            name,
            email,
            phone,
            message,
            VehicleType,
            IDProofNumber,
          
            YearofManufacture,
            ChassisNumber,
            EngineNumber,
            VehicleLiftingCapacity,
            PermitType,
           } = req.body;


        const response = await VehicleSendEmail({
            name,
            email,
            phone,
            message,
            VehicleType,
            IDProofNumber,
            
            YearofManufacture,
            ChassisNumber,
            EngineNumber,
            VehicleLiftingCapacity,
            InsuranceDetails: req.files.InsuranceDetails ? req.files.InsuranceDetails[0].filename : null,
            PermitType,
            PermitExpiry: req.files.PermitExpiry ? req.files.PermitExpiry[0].filename : null,
            FitnessCertificate: req.files.FitnessCertificate ? req.files.FitnessCertificate[0].filename : null,
            PollutionUnder: req.files.PollutionUnder ? req.files.PollutionUnder[0].filename : null,
            FrontSide: req.files.FrontSide ? req.files.FrontSide[0].filename : null,
            BackSide: req.files.BackSide ? req.files.BackSide[0].filename : null,
            SideViews: req.files.SideViews ? req.files.SideViews[0].filename : null,
            VehicleRegistration: req.files.VehicleRegistration ? req.files.VehicleRegistration[0].filename : null,

        }, uploadDir); 

        res.status(200).json(response);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
});

module.exports = VehicleRouter;
