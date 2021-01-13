import mysql.connector as mysql
import csv
import bcrypt

salt = bcrypt.gensalt()

db = mysql.connect(
    host = "localhost",
    port = "3306",
    user = "root",
    passwd = "password",
    database = 'moviereviewer'
)

cursor = db.cursor()

# tables = cursor.fetchall();

# for table in tables:
#     print(table)

with open('users3.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 1
    for row in csv_reader:
        if line_count != 0:
            hashed = bcrypt.hashpw(row[7].encode('utf-8'), salt)
            row[7] = hashed
            # print(f'Column names are {", ".join(row)}')
            # line_count += 1
            query = "INSERT INTO users (fname, lname, street, city, state, zip_code, email, password, phone) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (f'{row[0]}', f'{row[1]}', f'{row[2]}', f'{row[3]}', f'{row[4]}', f'{row[5]}', f'{row[6]}', f'{row[7]}', f'{row[8]}')

            cursor.execute(query, values)

            print(f'First Name: {row[0]} Last Name: {row[1]} Address: {row[2]} City: {row[3]} State: {row[4]} Zip-code: {row[5]} Email: {row[6]} Password: {row[7]} Phone: {row[8]}.')
            line_count += 1
    print(f'Processed {line_count} lines.')

db.commit()

print(cursor.rowcount, "record inserted")

# # cursor.execute("CREATE TABLE users(id int auto_increment primary key, fname varchar(100), lname varchar(100), street varchar(100), city varchar(100), state varchar(2), zip_code varchar(5), email varchar(100), password varchar(100), phone varchar(50))")

# cursor.execute("SHOW TABLES")