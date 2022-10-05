use yelpRipoff;

insert into appUser
    values
    (2,'idris@mondeixar.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    (3,'roy@blythe.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    (4,'harry@dubois.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
	(5,'audrey@mondeixar.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    (6,'kim@kitsuragi.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    (7,'meagan@foster.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    (8,'emily@kaldwin.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    (9,'morgan@yu.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);

insert into appUserRole
    values
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (7, 1),
    (8, 1),
    (9, 1);
    
insert into location 
	values
    (2,'1545 Wilmore Dr','Charlotte','NC','28203','Home'),
    (3,'2500 Trailhead Dr','Fort Worth','TX','76177','Home'),
    (4,'730 Lolo Rd','Twin Falls','ID','83301','Home'),
    (5,'329 Tamarack St','Gretna','LA','70056','Home'),
    (6,'9305 Thornton Rd J', 'Stockton', 'CA', '95209','Business'),
    (7,'313 Birch St', 'Westwood', 'CA', '96137','Business'),
    (8, '301 Railway Ave', 'Portal', 'ND', '58772','Home'),
    (9, '22988 Berry Dr', 'Mabel', 'MN', '55954','Business'),
    (10, '904 E Main St', 'Horse Cave', 'KY', '42749','Business'),
    (11, '2623 Town Center Blvd N Building G', 'Sugar Land', 'TX', '77479','Business'),
    (12, '707 Nueces St', 'George West', 'TX', '78022','Business'),
    (13, '8008 E 31st St', 'Tulsa', 'OK', '74145','Business'),
    (14, '36 Hunt Club Rd', 'Hattieville', 'AR', '72063','Business');
    
insert into person (personId, firstName, middleName, lastName, suffix, photoName, phone, locationId, appUserId)
	values
	(2, 'Idris','','Mondeixar', 'III', 'Test Picture.jpg', '407-621-3116', 2, 2),
    (3, 'Roy','C.','Blythe', 'Jr.', 'Test Picture.jpg', '386-259-9132', 3, 3),
    (4, 'Harry','','Dubois', 'M.D.', 'Test Picture.jpg', '413-410-0475', 4, 4),
    (5, 'Audrey','Yamina','Mondeixar', '', 'Test Picture.jpg', '704-351-8618', 2, 5),
    (6, 'Kim','','Kitsuragi', '', 'Test Picture.jpg', '804-453-9248', 5, 6),
    (7, 'Meagan','B.','Foster', '', 'Test Picture.jpg', '216-855-2411', 8, 7),
    (8, 'Emily','D.','Kaldwin', '', 'Test Picture.jpg', '410-272-1333', 8, 8),
    (9, 'Morgan','','Yu', '', 'Test Picture.jpg', '917-274-3766', 8, 9);

insert into business (businessId, `name`, `description`, rating, locationId, personId)
	values
    (1, 'Backyard Bowls','This restaurant offers beautiful bowls packed full of goodness.',5,6,1),
    (2, 'Tequila Mockingbird','This Mexican bar and grill serves authentic Mexican cuisine.',8,7,4),
    (3, 'Pies n’ Thighs','Dishes inspired by classic American dishes and Mexican and Californian cuisine.',8,9,9),
    (4, 'Basic Kneads Pizza','A variety of wood fire pizzas.',9,10,6),
    (5, 'Xarbucks','Authentic coffee from countries around the world.',10,11,2),
    (6, 'Cozy Corner BBQ','A warm kitchen that has been infused with the sweet and smoky scent of perfectly cooked meat dishes.',7,12,7),
    (7, 'Honeybloom','Sweet and sticky desserts for all ages.',9,13,3),
    (8, 'Little Soup Shop','A family-owned shop with a soup for every occasion.',7,14,8);
     
insert into `event` (eventId, `name`,`description`,timeDate, businessId)
	 values
     (1, 'Honeybloom 5th Anniversary', 'Enjoy discounted desserts and special menu items!', '2022-11-04 12:00:00', 7),
     (2, 'Mary\'s 10th Birthday Party', 'Happy Birthday Mary! (Have an upcoming birthday? Call now to make a reservation.)', '2022-12-03 13:00:00', 7),
     (3, 'Cafe Concert: The Modal Nodes', 'Join us for a live performance and meet and greet!', '2022-11-02 15:00:00', 5),
     (4, 'Comedy Night', 'Take to the stage with your best stand-up routine! Call to sign up.', '2022-11-12 18:00:00', 5); 

 insert into review (reviewId, content, timeDate, rating, personId, businessId)
	values
    (1, 'Sweet treats and delightful staff! I brought my whole family and everyone enjoyed their experience.','2020-01-15 13:01:40',8,5,7),
    (2, 'THEY CALLED THE POLICE ON ME FOR JUMPING OVER THE FRONT DESK AND EATING EVERYHING FROM THE DISPLAY CABINET! I HATE THIS PLACE!','2021-04-20 16:51:43',1,4,7),
    (3, 'Roy, the owner, is lovely! He gave us an extra cupcake for free with our dozen.','2020-01-01 00:01:00',9,9,7),
    (4, 'Impeccable atmosphere. The coffee is decent.','2022-04-06 15:01:34',6,8,5),
	(5, 'Staff are rude and snobbish. I hate that the coffee is so addictive because I can\'t stop coming back.','2022-07-12 17:31:55',4,6,5);