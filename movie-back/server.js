require("dotenv").config();

const express = require("express")
const routes = require("./routes/routes")

const app = express();

app.route("/api/users")
.get(routes.getAllUsers)

app.get("*", routes.serveSPA)

app.listen(process.env.PORT)