require("dotenv").config();

const path = require("path");
const mysql = require("@mysql/xdevapi");
const bcrypt = require("bcrypt");
const fs = require("fs");
const csvParse = require("csv-parse/lib/sync");
const frontEndFolderRelativePath = "../movie-react-front/build";

const serveSPA = (req, res) => {
    res.sendFile(path.resolve(`${frontEndFolderRelativePath}`));
}

const prepopulateData = (req, res) => {
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => {
            let csv = fs.readFileSync(__dirname + "/users3.csv").toString();
            let parseData = csvParse(csv, {
                columns: true
            });
            parseData.forEach((dataSet, i) => {
                dataSet.password = bcrypt.hashSync(dataSet.password, 10);
                table.insert(dataSet).execute()
            })
            res.send("Done :)")
        })
}

const getAllUsers = (req, res) => {
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => table.select().execute())
        .then(result => res.send(result.fetchAll()))
        .catch(console.error)
}

const createUser = (req, res) => {
    const {
        fname,
        lname,
        street,
        city,
        state,
        zip_code,
        email,
        password,
        phone
    } = req.body;
    if (!fname || !lname || !street || !city || !state || !zip_code || !email || !password || !phone) {
        res.status(400);
        res.send("Invalid parameters")
        return
    }
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => table.insert({
            fname,
            lname,
            street,
            city,
            state,
            zip_code,
            email,
            password: bcrypt.hashSync(password, 10),
            phone
        }).execute())
        .then(result => {
            res.status(200);
            res.json(result)
        })
}

const updateUser = (req, res) => {
    const {
        fname,
        lname,
        street,
        city,
        state,
        zip_code,
        email,
        old_password,
        phone,
        new_password
    } = req.body;
    if (!fname || !lname || !street || !city || !state || !zip_code || !email || !old_password || !phone) {
        res.status(400);
        res.send("Invalid parameters")
        return
    }
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => table.select("password").where(`email=='${email}'`).execute())
        .then(result => console.log(result.fetchOne()[0]))

    //TODO FInish update
}

const deleteUser = (req, res) => {

}

const loginUser = (req, res) => {

    email = req.body.email;
    password = req.body.password;

    console.log(email, password);

    getDbConn()
        .then(schema => schema.getTable("users"))
        .then((table) => table.select().where('email = :email').bind('email', email).execute())
        .then(result => {
            user = result.toArray()[0];

            // console.log(password, user[8])

            // userPassword = user[8].slice(2, user[8].length - 1)

            // console.log(userPassword);
            bcrypt.compare(password, user[8], (err, result) => {
                if (err) {
                    res.send(err)
                    console.error(err)
                } else {
                    console.log(result)
                    res.status(200);
                    if (result) {
                        res.json({
                            userId: user[0],
                            fname: user[1],
                            lname: user[2],
                            street: user[3],
                            city: user[4],
                            state: user[5],
                            zip: user[6],
                            email: user[7],
                            phone: user[9],
                        })
                    }
                    else {
                        res.json(false)
                    }
                }
            })
        })
        .catch(err=>{
            console.log("email not exist")
            res.json(false);
        })

}

const getReviews = (req, res) => {
    getDbConn()
    .then(schema => schema.getTable("reviews"))
    .then(table => {
        const {user_id, movie_id, review_id} = req.query;
        if(user_id) {
            return table.select().where(`user_id=${user_id}`).execute()
        } else if(movie_id) {
            return table.select().where(`movie_id=${movie_id}`).execute()
        } else if(review_id) {
            return table.select().where(`id=${review_id}`).execute()
        } else {
            res.status(400);
            res.send("Invalid Params")
        }
    })
    .then(result => {
        if(result) {
            res.status(200);
            res.json(result.fetchAll());
        }
    })
    .catch(err => {
        res.status(500);
        res.json(err);
    });
}

const createReview = (req, res) => {
    const {user_id, movie_id, review_body, rating} = req.body;
    if(!user_id || !movie_id || !review_body || !rating) {
        res.status(400);
        res.send("Invalid Request Body")
        return;
    }
    getDbConn()
    .then(schema => schema.getTable("reviews"))
    .then(table => table.insert("user_id", "movie_id", "review_body", "movie_rating").values(user_id, movie_id, review_body, rating).execute())
    .then(result => {
        res.status(200);
        res.send({})
    })
    .catch(err => {
        console.log(err)
        res.status(500);
        res.send("Server Error");
    })
}

const updateReview = (req, res) => {
    
}

const deleteReview = (req, res) => {

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
        .then(session => session.getSchema(process.env.DBDATABASE))
        .catch(console.log)
}

module.exports = {
    serveSPA: serveSPA,
    getAllUsers: getAllUsers,
    loginUser: loginUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    prepopulateData: prepopulateData,
    getReviews: getReviews,
    createReview: createReview,
    updateReview: updateReview,
    deleteReview: deleteReview
}