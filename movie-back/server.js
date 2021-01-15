require("dotenv").config();

const express = require("express")
const routes = require("./routes/routes")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.route("/api/test/populate")
.get(routes.prepopulateData)

app.route("/api/users")
.get(routes.getAllUsers)
.post(routes.createUser)
.put(routes.updateUser)
.delete(routes.deleteUser)

app.route("/login")
.get(routes.loginUser)

app.get("*", routes.serveSPA)

app.listen(process.env.PORT)