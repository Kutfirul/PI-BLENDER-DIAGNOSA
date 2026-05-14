const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const gejalaRoute = require("./routes/gejala");
const kerusakanRoute = require("./routes/kerusakan");
const dashboardRoute = require("./routes/dashboard");
const ruleRoute = require("./routes/rule");
const diagnosaRoute = require("./routes/diagnosa");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/gejala", gejalaRoute);
app.use("/api/kerusakan", kerusakanRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/rule", ruleRoute);
app.use("/api/diagnosa", diagnosaRoute);
app.use("/api", authRoute);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
