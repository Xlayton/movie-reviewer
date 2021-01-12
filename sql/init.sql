create database if not exists moviereviewer;
use moviereviewer;
create table if not exists users(id int auto_increment primary key, fname varchar(100), lname varchar(100), street varchar(100), city varchar(100), state varchar(2), zip_code varchar(5), email varchar(100), password varchar(100), phone varchar(50));
