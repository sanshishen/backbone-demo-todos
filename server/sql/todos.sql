#create database
create database todos;
#create user 
create user todos@localhost identified by 'sanshishen';
#grant privileges
grant all privileges on todos.* to todos@localhost;
#activte privileges setting
flush privileges;