require("dotenv").config();

const path = require("path");
const mysql = require("@mysql/xdevapi");
const bcrypt = require("bcrypt");
const frontEndFolderRelativePath = "../movie-react-front/build";

const serveSPA = (req, res) => {
    res.sendFile(path.resolve(`${frontEndFolderRelativePath}`));
}

const getAllUsers = (req, res) => {
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => table.select().execute())
        .then(result => res.send(result.fetchAll()))
        .catch(console.error)
}

const createUser = (req, res) => {
    const {fname, lname, street, city, state, zip_code, email, password, phone} = req.body;
    if(!fname || !lname || !street || !city || !state || !zip_code || !email || !password || !phone) {
        res.status(400);
        res.send("Invalid parameters")
        return
    }
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => table.insert({fname, lname, street, city, state, zip_code, email, password: bcrypt.hashSync(password, 10), phone}).execute())
        .then(result => {
            res.status(200);
            res.json(result)
        })
}

const loginUser = (req, res) => {

}

let getDbConn = () => {
    const config = {
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        schema: process.env.DBDATABASE
    }
    return mysql.getSession(config)
        .then(session => session.getSchema(config.schema))
}

const getUser = (req, res) => {
    
}

module.exports = {
    serveSPA: serveSPA,
    getAllUsers: getAllUsers,
    loginUser: loginUser,
    createUser: createUser
}