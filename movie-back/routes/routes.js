require("dotenv").config();

const path = require("path");
const mysql = require("@mysql/xdevapi");
const frontEndFolderRelativePath = "../movie-react-front/build";

const serveSPA = (req, res) => {
    res.sendFile(path.resolve(`${frontEndFolderRelativePath}`));
}

const getAllUsers = (req, res) => {
    const config = {
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        schema: process.env.DBDATABASE
    }
    mysql.getSession(config)
    .then(session => {
        return session.getSchema(config.schema)
    })
    .then(schema => schema.getTable("users"))
    .then(table => table.select().execute())
    .then(result => res.send(result.fetchAll()))
    .catch(console.error)
}

const loginUser = (req, res) => {

}

module.exports = {
    serveSPA: serveSPA,
    getAllUsers: getAllUsers,
    loginUser: loginUser
}