require("dotenv").config();

const express = require("express")
const routes = require("./routes/routes")
const bodyParser = require("body-parser")
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

app.route("/api/test/populate")
.get(routes.prepopulateData)

app.route("/api/users")
.get(routes.getAllUsers)
.post(routes.createUser)
.put(routes.updateUser)
.delete(routes.deleteUser)

app.route("/api/admin")
.post(routes.toggleAdmin)

app.route("/api/reviews")
.get(routes.getReviews)
.post(routes.createReview)
.put(routes.updateReview)
.delete(routes.deleteReview)

app.route("/login")
.post(routes.loginUser)

app.route("/email")
.get(routes.resetPassword)

app.get("*", routes.serveSPA)

app.listen(process.env.PORT)