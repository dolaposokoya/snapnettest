require('dotenv').config()
require('./DB')
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userSchema = require('./routes/user.routes')
const citizen = require('./routes/citizen.routes')
const states = require('./routes/state.routes')
const lgas = require('./routes/lga.routes')
const ward = require('./routes/ward.routes')

const PORT = process.env.PORT || 5100
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(morgan("combined"));

app.use("/api/v1/user", userSchema);
app.use("/api/v1/access", userSchema);
app.use("/api/v1/citizen", citizen);
app.use("/api/v1/state", states);
app.use("/api/v1/lga", lgas);
app.use("/api/v1/ward", ward);
// app.use("/api/user", userRoute);

app.listen(PORT, () => {
    console.log(`App listen at http://localhost:${PORT}/`)
})
