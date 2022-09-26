drop database if exists yelpRipoff;
create database yelpRipoff;
use yelpRipoff;

drop table if exists appUserRole;
drop table if exists appRole;
drop table if exists appUser;

create table appUser (
    appUserId int primary key auto_increment,
    username varchar(50) not null unique,
    passwordHash varchar(2048) not null,
    disabled bit not null default(0)
);

create table appRole (
    appRoleId int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table appUserRole (
    appUserId int not null,
    appRoleId int not null,
    constraint pk_appUserRole
        primary key (appUserId, appRoleId),
    constraint fk_appUserRole_UserId
        foreign key (appUserId)
        references appUser(appUserId),
    constraint fk_appUserRole_RoleId
        foreign key (appRoleId)
        references appRole(appRoleId)
);

create table location (
	locationId int primary key auto_increment,
	address varchar(100) null,
	city varchar(50) null,
	state char(2) null,
	zipCode varchar(5) null,
	addressType varchar(50) null
);

create table person (
	personId int primary key auto_increment,
	firstName varchar(25) not null,
<<<<<<< HEAD
    middleName varchar(25) null,
	lastName varchar(25) not null,
    suffix varchar(10) null,
    photo blob null,
=======
	lastName varchar(25) not null,
>>>>>>> e8f7b6f (repo and service for location and event)
	phone varchar(20) not null,
    locationId int not null,
    appUserId int not null,
constraint fk_person_location_id
	foreign key (locationId)
	references location(locationId),
constraint fk_person_appUser_id
	foreign key (appUserId)
	references appUser(appUserId)
);

create table personPerson (
    userId int not null,
    followingId int not null,
    constraint pk_personPerson
        primary key(userId, followingId),
    constraint fk_personPerson_userId
        foreign key (userId)
        references person(personId),
    constraint fk_personPerson_followingId
        foreign key (followingId)
        references person(personId)
);

create table business (
businessId int primary key auto_increment,
`name` varchar(50) not null,
 `description` varchar(100) not null,
<<<<<<< HEAD
 photo blob null,
=======
>>>>>>> e8f7b6f (repo and service for location and event)
 rating int not null,
 locationId int not null,
 personId int not null,
 constraint fk_business_location_id
	foreign key (locationId)
	references location(locationId),
 constraint fk_business_person_id
	foreign key (personId)
	references person(personId)
);

create table `event` (
	eventId int primary key auto_increment,
	`name` varchar(50) not null,
	`description` varchar(100) not null,
	timeDate datetime not null,
	locationId int not null,
	businessId int not null,
constraint fk_event_location_id
	foreign key (locationId)
	references location(locationId),
constraint fk_event_business_id
	foreign key (businessId)
	references business(businessId)
);

create table review (
    reviewId int primary key auto_increment,
    content varchar(500) not null,
	timeDate datetime not null,
    rating int not null,
    personId int not null,
    businessId int not null,
constraint fk_review_person_id
	foreign key (personId)
	references person(personId),  
constraint fk_review_business_id
	foreign key (businessId)
	references business(businessId)
);