const express = require("express");
const cors= require("cors");
const SendEmail = require("../nodemailer/nodemailer");

const app =express();
app.use(cors());
app.use(express.json())
require("dotenv").config()
const contactRouter = express.Router()


contactRouter.post("/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      const response = await SendEmail({ email, name, phone, message });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports= contactRouter;