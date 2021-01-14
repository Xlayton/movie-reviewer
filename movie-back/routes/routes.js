const path = require("path");
const mysql = require("@mysql/xdevapi");
const frontEndFolderRelativePath = "../movie-react-front/build";

const serveSPA = (req, res) => {
    res.sendFile(path.resolve(`${frontEndFolderRelativePath}`));
}

const getAllUsers = (req, res) => {
    const con = mysql.getSession({
        host:process.env.DBHOST,
        user:process.env.DBUSER,
        password:process.env.DBPASS,
        schema:process.env.DBDATABASE,
        collection:"users"
    }).then(session => {
        let results = session.find().execute()
        console.log(results)
    }).catch(console.log);
}

const getUser = (req, res) => {
    
}

module.exports = {
    serveSPA: serveSPA,
    getAllUsers: getAllUsers
}