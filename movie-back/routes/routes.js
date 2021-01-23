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
                dataSet.username = `${dataSet.fname.toLowerCase()}${dataSet.lname[0].toLowerCase()}`
                dataSet.is_admin = false;
                table.insert(dataSet).execute()
            })
            res.send("Done :)")
        })
}

const getAllUsers = (req, res) => {
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => {
            if(req.query.user_id) {
                return table.select().where(`id=='${req.query.user_id}'`).execute()
            } else {
                return table.select().execute()
            }
        })
        .then(result => res.send(result.fetchAll()))
        .catch(console.error)
}

const createUser = (req, res) => {
    console.log(req.body);
    const {
        username,
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
    if (!fname || !lname || !street || !city || !state || !zip_code || !email || !password || !phone || !username) {
        res.status(400);
        res.send("Invalid parameters")
        return
    }
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => table.insert({
            username,
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
        user_id,
        username,
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
    if (!user_id || !fname || !lname || !street || !city || !state || !zip_code || !email || !old_password || !phone || !username) {
        res.status(400);
        res.send("Invalid parameters")
        return
    }
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => table.select("password").where(`id=='${user_id}'`).execute())
        .then(result => {
            if(!bcrypt.compareSync(old_password, result.fetchOne()[0])) {
                res.status(400)
                res.send("Invalid login information")
                return;
            }
            getDbConn()
            .then(schema => schema.getTable("users"))
            .then(table => {
                if(new_password) {
                    return table.update().where(`id=='${user_id}'`).set('fname', fname).set('lname', lname).set('street', street).set('zip_code', zip_code).set('phone', phone).set('username', username).set('password', bcrypt.hashSync(new_password, 10)).set('email', email).execute()
                } else {
                    return table.update().where(`id=='${user_id}'`).set('fname', fname).set('lname', lname).set('street', street).set('zip_code', zip_code).set('phone', phone).set('username', username).set('email', email).execute()
                }
            })
            .then(result => {
                res.status(200);
                res.json(result);
            })
            .catch(err => {
                res.status(500);
                res.json(err);
            });
        })
        .catch(err => {
            res.status(500);
            res.json(err);
        });
}

const deleteUser = (req, res) => {
    const {id} = req.body;
    if(!id) {
        res.status(400);
        res.send("Invalid Request Body");
        return;
    }
    getDbConn()
    .then(schema => schema.getTable("reviews"))
    .then(table => table.delete().where(`user_id=${id}`).execute())
    .then(result => {
        console.log(result.getWarnings())
        getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => table.delete().where(`id=${id}`).execute())
        .then(result => {
            console.log(result.getWarnings())
            res.status(200);
            res.send({})
        })
        .catch(err => {
            console.log("err")
            res.status(500);
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500);
    })

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
            bcrypt.compare(password, user[9], (err, result) => {
                if (err) {
                    res.send(err)
                    console.error(err)
                } else {
                    console.log(result)
                    res.status(200);
                    if (result) {
                        res.json({
                            userId: user[0],
                            username: user[1],
                            fname: user[2],
                            lname: user[3],
                            street: user[4],
                            city: user[5],
                            state: user[6],
                            zip: user[7],
                            email: user[8],
                            phone: user[10],
                            isAdmin: user[11],
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
            return table.select().where(`user_id==${user_id}`).execute()
        } else if(movie_id) {
            return table.select().where(`movie_id==${movie_id}`).execute()
        } else if(review_id) {
            return table.select().where(`id==${review_id}`).execute()
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
    .then(() => {
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
    const {review_id, review_body, rating} = req.body;
    if(!review_id || !review_body || !rating) {
        res.status(400);
        res.send("Invalid Request Body");
        return;
    }
    getDbConn()
    .then(schema => schema.getTable("reviews"))
    .then(table => table.update().set("review_body", review_body).set("movie_rating", rating).where(`id=${review_id}`).execute())
    .then(result => {
        console.log(result.getWarnings())
        res.status(200);
        res.send({})
    })
    .catch(err => {
        console.log("err")
        res.status(500);
    })
}

const deleteReview = (req, res) => {
    const {review_id} = req.body;
    if(!review_id) {
        res.status(400);
        res.send("Invalid Request Body");
        return;
    }
    getDbConn()
    .then(schema => schema.getTable("reviews"))
    .then(table => table.delete().where(`id=${review_id}`).execute())
    .then(result => {
        console.log(result.getWarnings())
        res.status(200);
        res.send({})
    })
    .catch(err => {
        console.log("err")
        res.status(500);
    })
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

const toggleAdmin = (req,res)=>{
    let {
        id,
        isAdmin
    } = req.body;

    if (!id|!isAdmin) {
        res.status(400);
        res.send("Invalid parameters")
        return
    }

    isAdmin = (isAdmin==="true")
    getDbConn()
        .then(schema => schema.getTable("users"))
        .then(table => {
                return table.update().where(`id=='${id}'`).set('is_admin', !isAdmin).execute()
        })
        .then(result => {
            res.status(200);
            res.json(result);
        })
        .catch(err => {
            res.status(500);
            res.json(err);
        })
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
    deleteReview: deleteReview,
    toggleAdmin:toggleAdmin
}