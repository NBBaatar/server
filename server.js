//Require All needed packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");
const colors = require("colors");
const logger = require("./middleware/logger");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const projectRoute = require("./routes/project");
const buildingRoute = require("./routes/building");
const userRoute = require("./routes/user");
const unitRoute = require("./routes/unit");
const waterProofRoute = require("./routes/waterProof");
const electricalRoute = require("./routes/electrical");
const windowRoute = require("./routes/window");
const acRoute = require("./routes/ac");
const doorFramingRoute = require("./routes/doorFraming");
const plumbingRoute = require("./routes/plumbing");
const fireSprinklerRoute = require("./routes/fireSprinkler");
const dryFireCableRoute = require("./routes/dryFireCable");
const fireCableRoute = require("./routes/firCable");
const plasterBoardRoute = require("./routes/plasterBoard");
const kitchenRoute = require("./routes/kitchen");
const wardrobeRoute = require("./routes/wardrobe");
const carpetRoute = require("./routes/carpet");
const paintRoute = require("./routes/paint");
const steelFrameRoute = require("./routes/steelFrame");
const shelfAngleRoute = require("./routes/shelfAngle");
const defectRoute = require("./routes/defect");
const tileRoute = require("./routes/tile");
const checkListRoute = require("./routes/checkList");
const hebelRoute = require("./routes/hebel");
const fs = require("fs");
//Require MongoDb
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
//Loading config files...
dotenv.config({ path: "./config/config.env" });
//Creating Express APP
const app = express();
//Connect MongoDB
connectDB();
//create a write stream
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", //rotate daily
  path: path.join(__dirname, "log"),
});
//Body Parser
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  cors({
    credentials: true,
  })
);
//Logger
app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "15360kb" }));
//Routers
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/buildings", buildingRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/units", unitRoute);
app.use("/api/v1/waterproof", waterProofRoute);
app.use("/api/v1/electrical", electricalRoute);
app.use("/api/v1/windows", windowRoute);
app.use("/api/v1/ac", acRoute);
app.use("/api/v1/doorframing", doorFramingRoute);
app.use("/api/v1/plumbing", plumbingRoute);
app.use("/api/v1/firesprinkler", fireSprinklerRoute);
app.use("/api/v1/dryfirecable", dryFireCableRoute);
app.use("/api/v1/firecable", fireCableRoute);
app.use("/api/v1/plasterboard", plasterBoardRoute);
app.use("/api/v1/kitchen", kitchenRoute);
app.use("/api/v1/wardrobe", wardrobeRoute);
app.use("/api/v1/carpet", carpetRoute);
app.use("/api/v1/paint", paintRoute);
app.use("/api/v1/steelframe", steelFrameRoute);
app.use("/api/v1/shelfangle", shelfAngleRoute);
app.use("/api/v1/defects", defectRoute);
app.use("/api/v1/tiles", tileRoute);
app.use("/api/v1/checklist", checkListRoute);
app.use("/api/v1/hebel", hebelRoute);

//Error Handlers
app.use(errorHandler);
//Setting config.env to env
process.env;
const serverListener = app.listen(
  process.env.PORT,
  console.log(
    `Express starting up with ${process.env.PORT} port`.cyan.underline.bold
  )
);
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error at : ${err.message}`.red.underline.bold);
  serverListener.close(() => {
    process.exit(1);
  });
});
