import mysql.connector as mysql

db = mysql.connect(
    host = "localhost",
    port = "3306",
    user = "root",
    passwd = "P@ssw0rd"
)

print(db)

cursor = db.cursor()

cursor.execute("SHOW DATABASES")

# cursor.execute("CREATE TABLE users(id int auto_increment primary key, fname varchar(100), lname varchar(100), street varchar(100), city varchar(100), state varchar(2), zip_code varchar(5), email varchar(100), password varchar(100), phone varchar(50))")

cursor.execute("SHOW TABLES")