require("dotenv").config();

const express = require("express")
const routes = require("./routes/routes")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.route("/api/users")
.get(routes.getAllUsers)
.post(routes.createUser)

app.route("/login")
.post(routes.loginUser)

app.route("/postreview")
.post(routes.postReview)

app.get("*", routes.serveSPA)

app.listen(process.env.PORT)