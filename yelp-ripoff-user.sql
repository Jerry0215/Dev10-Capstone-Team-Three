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

insert into appRole (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into appUser (username, passwordHash, disabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);

insert into appUserRole
    values
    (1, 2),
    (2, 1);
