create database if not exists moviereviewer;
use moviereviewer;
create table if not exists users(id int auto_increment primary key, fname varchar(100) not null, lname varchar(100) not null, street varchar(100) not null, city varchar(100) not null, state varchar(2) not null, zip_code varchar(5) not null, email varchar(100) not null unique, password varchar(100) not null, phone varchar(50) not null);
create table if not exists reviews(id int auto_increment primary key, user_id int not null, movie_id int, review_body varchar(250), movie_rating int unsigned check (movie_rating < 6), foreign key (user_id) references users(id) on delete cascade)

