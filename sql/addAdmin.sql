use moviereviewer;
    
alter table users add column is_admin boolean after phone;

update users set is_admin = null where id>0;
update users set is_admin = true where id=10;