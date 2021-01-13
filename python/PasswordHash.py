# import bcrypt
# import csv
# salt = bcrypt.gensalt()
# with open('users3.csv', 'r') as read_obj:
#     csv_reader = csv.reader(read_obj)
#     with open ('hashedUsers.csv', 'w') as hashedUsers:
#         writer = csv.writer(hashedUsers)
#         for row in csv_reader:
#             hashed = bcrypt.hashpw(row[7].encode('utf-8'), salt)
#             row[7] = hashed
#             writer.writerow(row)
#             # print(hashed)

import os

print(os.getcwd())