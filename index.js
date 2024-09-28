const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const contactRouter = require("./Routes/Contact");
const driveRouter = require("./Routes/Driver");
const VehicleRouter = require("./Routes/Vehicle");

const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5400;


app.use("/contactRouter",contactRouter)
app.use("/driveRouter",driveRouter)
app.use("/vehicleRouter",VehicleRouter)



app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})





