--create database
create database czz;
--create user 
create user czz@localhost identified by 'sanshishen';
--grant privileges
grant all privileges on czz.* to czz@localhost;
--activte privileges setting
flush privileges;

--create table
create table `todos`(
    `id` int(11) not null auto_increment,
    `title` varchar(50),
    `_order` tinyint(4),
    `done` boolean,
    primary key (`id`)
) engine=MyISAM default charset=utf8;