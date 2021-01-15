require("dotenv").config();

const express = require("express")
const routes = require("./routes/routes")
const bodyParser = require("body-parser")
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

app.route("/api/users")
.get(routes.getAllUsers)
.post(routes.createUser)

app.route("/login")
.post(routes.loginUser)


app.get("*", routes.serveSPA)

app.listen(process.env.PORT)