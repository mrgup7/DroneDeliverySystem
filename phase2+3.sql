-- Database Schema
-- Restaurant Drone Delivery System
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;
drop database if exists restaurant_supply_express;
create database if not exists restaurant_supply_express;
use restaurant_supply_express;
-- -----------------------------------------------
-- table structures
-- -----------------------------------------------
create table users (
username varchar(40) not null,
first_name varchar(100) not null,
last_name varchar(100) not null,
address varchar(500) not null,
birthdate date not null,
primary key (username)
) engine = innodb;

create table employees (
username varchar(40) not null,
GTID varchar(40) not null,
hired date not null,
experience integer not null,
primary key (username),
unique key (GTID)
) engine = innodb;

create table pilots (
username varchar(40) not null,
licenseID varchar(40) not null,
experience integer not null,
primary key (username),
unique key (licenseID)
) engine = innodb;

create table workers (
username varchar(40) not null,
primary key (username)
) engine = innodb;

create table packages (
barcode varchar(40) not null,
iname varchar(100) not null,
weight integer not null,
primary key (barcode)
) engine = innodb;

create table locations (
label varchar(40) not null,
x_coord integer not null,
y_coord integer not null,
space integer not null,
primary key (label)
) engine = innodb;

create table restaurants (
long_name varchar(40) not null,
rating integer not null,
spent integer not null,
location varchar(40) not null,
primary key (long_name)
) engine = innodb;

create table delivery_services (
id varchar(40) not null,
long_name varchar(100) not null,
home_base varchar(40) not null,
manager varchar(40) not null,
primary key (id),
unique key (manager)
) engine = innodb;

create table drones (
id varchar(40) not null,
tag integer not null,
fuel integer not null,
capacity integer not null,
sales integer not null,
flown_by varchar(40) default null,
swarm_id varchar(40) default null,
swarm_tag integer default null,
hover varchar(40) not null,
primary key (id, tag)
) engine = innodb;

create table payload (
id varchar(40) not null,
tag integer not null,
barcode varchar(40) not null,
quantity integer not null,
price integer not null,
primary key (id, tag, barcode)
) engine = innodb;

create table work_for (
username varchar(40) not null,
id varchar(40) not null,
primary key (username, id)
) engine = innodb;
-- -----------------------------------------------
-- referential structures
-- -----------------------------------------------
alter table employees add constraint fk1 foreign key (username) references users 
(username)
on update cascade on delete cascade;

alter table pilots add constraint fk3 foreign key (username) references employees 
(username)
on update cascade on delete cascade;

alter table workers add constraint fk4 foreign key (username) references employees 
(username)
on update cascade on delete cascade;

alter table restaurants add constraint fk10 foreign key (location) references 
locations (label)
on update cascade;

alter table delivery_services add constraint fk11 foreign key (home_base)
references locations (label) 
on update cascade;

alter table delivery_services add constraint fk15 foreign key (manager)
references workers (username);

alter table drones add constraint fk5 foreign key (id) references delivery_services
(id);

alter table drones add constraint fk13 foreign key (flown_by) references pilots 
(username);

alter table drones add constraint fk14 foreign key (swarm_id, swarm_tag)
references drones (id, tag) on update cascade 
on delete cascade;

alter table drones add constraint fk16 foreign key (hover) references locations 
(label)
on update cascade;

alter table payload add constraint fk6 foreign key (id, tag) references drones (id,
tag);

alter table payload add constraint fk7 foreign key (barcode) references packages
(barcode);

alter table work_for add constraint fk8 foreign key (username) references employees
(username);

alter table work_for add constraint fk9 foreign key (id) references 
delivery_services (id);

-- -----------------------------------------------
-- table data
-- -----------------------------------------------
insert into users values
('jstone5', 'Jared', 'Stone', '101 Five Finger Way', '1961-01-06'),
('sprince6', 'Sarah', 'Prince', '22 Peachtree Street', '1968-06-15'),
('awilson5', 'Aaron', 'Wilson', '220 Peachtree Street', '1963-11-11'),
('lrodriguez5', 'Lina', 'Rodriguez', '360 Corkscrew Circle', '1975-04-02'),
('tmccall5', 'Trey', 'McCall', '360 Corkscrew Circle', '1973-03-19'),
('eross10', 'Erica', 'Ross', '22 Peachtree Street', '1975-04-02'),
('hstark16', 'Harmon', 'Stark', '53 Tanker Top Lane', '1971-10-27'),
('echarles19', 'Ella', 'Charles', '22 Peachtree Street', '1974-05-06'),
('csoares8', 'Claire', 'Soares', '706 Living Stone Way', '1965-09-03'),
('agarcia7', 'Alejandro', 'Garcia', '710 Living Water Drive', '1966-10-29'),
('bsummers4', 'Brie', 'Summers', '5105 Dragon Star Circle', '1976-02-09'),
('cjordan5', 'Clark', 'Jordan', '77 Infinite Stars Road', '1966-06-05'),
('fprefontaine6', 'Ford', 'Prefontaine', '10 Hitch Hikers Lane', '1961-01-28'),
('mrobot1', 'Mister', 'Robot', '10 Autonomy Trace', '1988-11-02'),
('mrobot2', 'Mister', 'Robot', '10 Clone Me Circle', '1988-11-02'),
('ckann5', 'Carrot', 'Kann', '64 Knights Square Trail', '1972-09-01'),
('rlopez6', 'Radish', 'Lopez', '8 Queens Route', '1999-09-03');

insert into employees values
('awilson5', '111-11-1111', '2020-03-15', 9),
('lrodriguez5', '222-22-2222', '2019-04-15', 20),
('tmccall5', '333-33-3333', '2018-10-17', 29),
('eross10', '444-44-4444', '2020-04-17', 10),
('hstark16', '555-55-5555', '2018-07-23', 20),
('echarles19', '777-77-7777', '2021-01-02', 3),
('csoares8', '888-88-8888', '2019-02-25', 26),
('agarcia7', '999-99-9999', '2019-03-17', 24),
('bsummers4', '000-00-0000', '2018-12-06', 17),
('fprefontaine6', '121-21-2121', '2020-04-19', 5),
('mrobot1', '101-01-0101', '2015-05-27', 8),
('mrobot2', '010-10-1010', '2015-05-27', 8),
('ckann5', '640-81-2357', '2019-08-03', 27),
('rlopez6', '123-58-1321', '2017-02-05', 51);

insert into pilots values
('awilson5', '314159', 41), ('lrodriguez5', '287182', 67),
('tmccall5', '181633', 10), ('agarcia7', '610623', 38),
('bsummers4', '411911', 35), ('fprefontaine6', '657483', 2),
('echarles19', '236001', 10), ('csoares8', '343563', 7),
('mrobot1', '101010', 18), ('rlopez6', '235711', 58);

insert into workers values
('tmccall5'), ('eross10'), ('hstark16'), ('echarles19'),
('csoares8'), ('mrobot2'), ('ckann5');

insert into packages values
('pr_3C6A9R', 'prosciutto', 6), ('ss_2D4E6L', 'saffron', 3),
('hs_5E7L23M', 'truffles', 3), ('clc_4T9U25X', 'caviar', 5),
('ap_9T25E36L', 'foie gras', 4), ('bv_4U5L7M', 'balsamic vinegar', 4);

insert into locations values
('plaza', 5, 12, 20), ('midtown', 1, 4, 3), ('highpoint', 7, 0, 2),
('southside', 3, -6, 3), ('mercedes', 1, 1, 2), ('avalon', 2, 16, 5),
('airport', -2, -9, 4), ('buckhead', 3, 8, 4);

insert into restaurants values
('Lure', 5, 20, 'midtown'), 
('Ecco', 3, 0, 'buckhead'),
('South City Kitchen', 5, 30, 'midtown'), 
('Tre Vele', 4, 10, 'plaza'),
('Fogo de Chao', 4, 30, 'buckhead'), 
('Hearth', 4, 0, 'avalon'),
('Il Giallo', 4, 10, 'mercedes'), 
('Bishoku', 5, 10, 'plaza'),
('Casi Cielo', 5, 30, 'plaza'), 
('Micks', 2, 0, 'southside');

insert into delivery_services values
('osf', 'On Safari Foods', 'southside', 'eross10'),
('hf', 'Herban Feast', 'southside', 'hstark16'),
('rr', 'Ravishing Radish', 'avalon', 'echarles19');

insert into drones values
('osf', 1, 100, 9, 0, 'awilson5', null, null, 'airport'),
('hf', 1, 100, 6, 0, 'fprefontaine6', null, null, 'southside'),
('hf', 5, 27, 7, 100, 'fprefontaine6', null, null, 'buckhead'),
('hf', 8, 100, 8, 0, 'bsummers4', null, null, 'southside'),
('hf', 16, 17, 5, 40, 'fprefontaine6', null, null, 'buckhead'),
('rr', 3, 100, 5, 50, 'agarcia7', null, null, 'avalon'),
('rr', 7, 53, 5, 100, 'agarcia7', null, null, 'avalon'),
('rr', 8, 100, 6, 0, 'agarcia7', null, null, 'highpoint');

insert into drones values
('osf', 2, 75, 7, 0, null, 'osf', 1, 'airport'),
('hf', 11, 25, 10, 0, null, 'hf', 5, 'buckhead'),
('rr', 11, 90, 6, 0, null, 'rr', 8, 'highpoint');

insert into payload values
('osf', 1, 'pr_3C6A9R', 5, 20),
('osf', 1, 'ss_2D4E6L', 3, 23),
('osf', 2, 'hs_5E7L23M', 7, 14),
('hf', 1, 'ss_2D4E6L', 6, 27),
('hf', 5, 'hs_5E7L23M', 4, 17),
('hf', 5, 'clc_4T9U25X', 1, 30),
('hf', 8, 'pr_3C6A9R', 4, 18),
('hf', 11, 'ss_2D4E6L', 3, 19),
('rr', 3, 'hs_5E7L23M', 2, 15),
('rr', 3, 'clc_4T9U25X', 2, 28);

insert into work_for values
('eross10', 'osf'), ('hstark16', 'hf'), ('echarles19', 'rr'),
('tmccall5', 'hf'), ('awilson5', 'osf'), ('fprefontaine6', 'hf'),
('bsummers4', 'hf'), ('agarcia7', 'rr'), ('mrobot1', 'osf'),
('mrobot1', 'rr'), ('ckann5', 'osf'), ('rlopez6', 'rr');


set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

use restaurant_supply_express;

-- -----------------------------------------------------------------------------
-- stored procedures and views
-- -----------------------------------------------------------------------------
/* Standard Procedure: If one or more of the necessary conditions for a procedure to
be executed is false, then simply have the procedure halt execution without changing
the database state. */


-- add_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new employee without any designated pilot or
worker roles.  A new employee must have a unique username unique tax identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_employee;
delimiter //
create procedure add_employee (in ip_username varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date,
    in ip_GTID varchar(40), in ip_hired date, in ip_employee_experience integer)
sp_main: begin
	if (ip_username is NULL or ip_first_name is NULL or ip_last_name is NULL or ip_address is NULL or ip_birthdate is NULL)
		then leave sp_main; end if; 
	if (ip_GTID is NULL or ip_hired is NULL or ip_employee_experience is NULL)
		then leave sp_main; end if; 
        
    if (select count(*) from users where username = ip_username) > 0 
		then leave sp_main; end if; 
    if (select count(*) from employees where GTID = ip_GTID) > 0 
		then leave sp_main; end if; 
        
    insert into users values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);
    insert into employees values (ip_username, ip_GTID, ip_hired, ip_employee_experience);
        
end //
delimiter ;

-- add_pilot_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the pilot role to an existing employee.  The
employee/new pilot must have a unique license identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_pilot_role;
delimiter //
create procedure add_pilot_role (in ip_username varchar(40), in ip_licenseID varchar(40),
	in ip_pilot_experience integer)
sp_main: begin
	if (ip_licenseID is NULL or ip_pilot_experience is NULL)
		then leave sp_main; end if; 

    if (select count(*) from employees where username = ip_username) < 1 
		then leave sp_main; end if; 
        
	if (select count(*) from pilots where username = ip_username) > 0 
		then leave sp_main; end if;     
    if (select count(*) from pilots where licenseID = ip_licenseID) > 0 
		then leave sp_main; end if;     
        
	insert into pilots values (ip_username, ip_licenseID, ip_pilot_experience);
        
end //
delimiter ;

-- add_worker_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the worker role to an existing employee. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_worker_role;
delimiter //
create procedure add_worker_role (in ip_username varchar(40))
sp_main: begin
	if (select count(*) from employees where username = ip_username) < 1 
		then leave sp_main; end if;    
        
	if (select count(*) from workers where username = ip_username) > 0
		then leave sp_main; end if;     
        
    insert into workers values (ip_username);
end //
delimiter ;

-- add_ingredient()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new ingredient.  A new ingredient must have a
unique barcode. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_ingredient;
delimiter //
create procedure add_ingredient (in ip_barcode varchar(40), in ip_iname varchar(100),
	in ip_weight integer)
sp_main: begin
	if (ip_barcode is NULL or ip_iname is NULL or ip_weight is NULL)
		then leave sp_main; end if;
	if (select count(*) from packages where barcode = ip_barcode) > 0 
		then leave sp_main; end if;     
	
    insert into packages values (ip_barcode, ip_iname, ip_weight);
end //
delimiter ;

-- add_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new drone.  A new drone must be assigned 
to a valid delivery service and must have a unique tag.  Also, it must be flown
by a valid pilot initially (i.e., pilot works for the same service), but the pilot
can switch the drone to working as part of a swarm later. And the drone's starting
location will always be the delivery service's home base by default. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_drone;
delimiter //
create procedure add_drone (in ip_id varchar(40), in ip_tag integer, in ip_fuel integer,
	in ip_capacity integer, in ip_sales integer, in ip_flown_by varchar(40))
sp_main: begin
	if (ip_tag is NULL or ip_fuel is NULL or ip_capacity is NULL or ip_sales is NULL) 
		then leave sp_main; end if;
	if (select count(*) from drones where id = ip_id and tag = ip_tag) > 0 
		then leave sp_main; end if; 
    if (select count(*) from delivery_services where id = ip_id) < 1 
		then leave sp_main; end if; 
    if (select count(*) from pilots where username = ip_flown_by) < 1 
		then leave sp_main; end if; 
	if (select count(*) from work_for where ip_flown_by = username and ip_id = id) < 1
		then leave sp_main; end if;
        
	insert into drones values (ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_flown_by, NULL, NULL, (select home_base from delivery_services where id = ip_id));
end //
delimiter ;

-- add_restaurant()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new restaurant.  A new restaurant must have a
unique (long) name and must exist at a valid location, and have a valid rating. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_restaurant;
delimiter //
create procedure add_restaurant (in ip_long_name varchar(40), in ip_rating integer,
	in ip_spent integer, in ip_location varchar(40))
sp_main: begin
	if (ip_rating is NULL or ip_spent is NULL)
		then leave sp_main; end if;
	if (select count(*) from restaurants where long_name = ip_long_name) > 0 
		then leave sp_main; end if; 
	if (select count(*) from locations where label = ip_location) < 1 
		then leave sp_main; end if; 
    if ip_rating < 1 OR ip_rating > 5
		then leave sp_main; end if; 
        
	insert into restaurants values (ip_long_name, ip_rating, ip_spent, ip_location, NULL);
end //
delimiter ;

-- [8] add_service()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new delivery service.  A new service must have
a unique identifier, along with a valid home base and manager. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_service;
delimiter //
create procedure add_service (in ip_id varchar(40), in ip_long_name varchar(100),
	in ip_home_base varchar(40), in ip_manager varchar(40))
sp_main: begin
	-- ensure new delivery service doesn't already exist
    -- ensure that the home base location is valid
    -- ensure that the manager is valid
    if (ip_id is NULL or ip_long_name is NULL or ip_home_base is NULL or ip_manager is NULL) then leave sp_main; end if;
    
    if (select count(*) from delivery_services where ip_id = id) > 0 then leave sp_main; end if;
    if (select count(*) from locations where ip_home_base = label) < 1 then leave sp_main; end if;
    if (select count(*) from workers where ip_manager = username) < 1 then leave sp_main; end if;
    if (select count(*) from work_for where ip_manager = username and ip_id != id) > 0 then leave sp_main; end if;
    
    INSERT INTO delivery_services (id, long_name, home_base, manager) 
    VALUES(ip_id, ip_long_name, ip_home_base, ip_manager);
    
end //
delimiter ;

-- add_location()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new location that becomes a new valid drone
destination.  A new location must have a unique combination of coordinates.  We
could allow for "aliased locations", but this might cause more confusion that
it's worth for our relatively simple system. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_location;
delimiter //
create procedure add_location (in ip_label varchar(40), in ip_x_coord integer,
	in ip_y_coord integer, in ip_space integer)
sp_main: begin
	-- ensure new location doesn't already exist
    -- ensure that the coordinate combination is distinct
    if (ip_label is NULL or ip_x_coord is NULL or ip_y_coord is NULL or ip_space is NULL) then leave sp_main; end if;
    
    if (select count(*) from locations where ip_label = label) > 0 then leave sp_main; end if;
    if (select count(*) from locations where ip_x_coord = x_coord and ip_y_coord = y_coord) > 0 then leave sp_main; end if;
    
    INSERT INTO locations (label, x_coord, y_coord, space) 
    VALUES(ip_label, ip_x_coord, ip_y_coord, ip_space);
end //
delimiter ;

-- hire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure hires an employee to work for a delivery service.
Employees can be combinations of workers and pilots. If an employee is actively
controlling drones or serving as manager for a different service, then they are
not eligible to be hired.  Otherwise, the hiring is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists hire_employee;
delimiter //
create procedure hire_employee (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
	-- ensure that the employee hasn't already been hired
	-- ensure that the employee and delivery service are valid
    -- ensure that the employee isn't a manager for another service
	-- ensure that the employee isn't actively controlling drones for another service
    
    IF ((ip_username in (select username from work_for where id = ip_id))) THEN leave sp_main; end if;
    IF ((ip_username not in (SELECT username from users))) THEN leave sp_main; end if;
    If (ip_id NOT IN (SELECT id from delivery_services)) THEN leave sp_main; end if;
    If (ip_username IN (SELECT manager from delivery_services)) THEN leave sp_main; end if;
    If (ip_username IN (SELECT flown_by FROM drones)) THEN leave sp_main; end if;

INSERT INTO work_for
(username, id) 
VALUES 
(ip_username, ip_id);

end //
delimiter ;


-- remove_Student()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a student who is currently working for a delivery
service.  The only restrictions are that the student must not be: [1] actively
controlling one or more drones; or, [2] serving as a manager for the service.
Otherwise, the removing is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_Student;
delimiter //
create procedure remove_Student (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
	-- ensure that the employee is currently working for the service
    -- ensure that the employee isn't an active manager
	-- ensure that the employee isn't controlling any drones
   
    IF (ip_username NOT IN (SELECT username FROM work_for)) THEN  leave sp_main; end if; 
	IF (ip_username IN (SELECT manager FROM delivery_services)) THEN  leave sp_main; end if;
	IF (ip_username IN (SELECT flown_by FROM drones)) THEN  leave sp_main; end if;
	
	DELETE FROM work_for where (username, id) = (ip_username, ip_id);
	DELETE FROM workers WHERE (username = ip_username);
        
end //
delimiter ;

-- manage_service()
-- -----------------------------------------------------------------------------
/* This stored procedure appoints an employee who is currently hired by a delivery
service as the new manager for that service.  The only restrictions are that: [1]
the employee must not be working for any other delivery service; and, [2] the
employee can't be flying drones at the time.  Otherwise, the appointment to manager
is permitted.  The current manager is simply replaced.  And the employee must be
granted the worker role if they don't have it already. */
-- -----------------------------------------------------------------------------
drop procedure if exists manage_service;
delimiter //
create procedure manage_service (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
	if (ip_username is NULL or ip_id is NULL) then leave sp_main; end if;
	-- ensure that the employee is currently working for the service
	-- ensure that the employee is not flying any drones
    -- ensure that the employee isn't working for any other services
    -- add the worker role if necessary
    if (select count(*) from work_for where ip_username = username and ip_id = id) < 1 then leave sp_main; end if;
    if (select count(*) from work_for where ip_username = username and ip_id != id) > 0 then leave sp_main; end if;
	if (select count(*) from drones where ip_username = flown_by) > 0 then leave sp_main; end if;
    
    if (select count(*) from workers where ip_username = username) < 1 then INSERT into workers (username) VALUES (ip_username); end if;
    
    UPDATE IGNORE delivery_services
    SET manager = ip_username
    WHERE id = ip_id;
end //
delimiter ;

-- takeover_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a valid pilot to take control of a lead drone owned
by the same delivery service, whether it's a "lone drone" or the leader of a swarm.
The current controller of the drone is simply relieved of those duties. And this
should only be executed if a "leader drone" is selected. */
-- -----------------------------------------------------------------------------
drop procedure if exists takeover_drone;
delimiter //
create procedure takeover_drone (in ip_username varchar(40), in ip_id varchar(40),
	in ip_tag integer)
sp_main: begin
	if (ip_username is NULL or ip_id is NULL or ip_tag is NULL) then leave sp_main; end if;
	-- ensure that the employee is currently working for the service
	-- ensure that the selected drone is owned by the same service and is a leader and not follower
	-- ensure that the employee isn't a manager
    -- ensure that the employee is a valid pilot
    if (select count(*) from work_for where ip_username = username and ip_id = id) < 1 then leave sp_main; end if;
    if (select count(*) from pilots where ip_username = username) < 1 then leave sp_main; end if;
    if (select count(*) from delivery_services where ip_username = manager) > 0 then leave sp_main; end if;
    
	if (select count(*) from drones where ip_id = id and ip_tag = tag and swarm_id is NULL) > 0 then
    UPDATE IGNORE drones
    SET flown_by = ip_username
    WHERE id = ip_id and tag = ip_tag; end if;

end //
delimiter ;

-- join_swarm()
-- -----------------------------------------------------------------------------
/* This stored procedure takes a drone that is currently being directly controlled
by a pilot and has it join a swarm (i.e., group of drones) led by a different
directly controlled drone. A drone that is joining a swarm connot be leading a
different swarm at this time.  Also, the drones must be at the same location, but
they can be controlled by different pilots. */
-- -----------------------------------------------------------------------------
drop procedure if exists join_swarm;
delimiter //
create procedure join_swarm (in ip_id varchar(40), in ip_tag integer,
	in ip_swarm_leader_tag integer)
sp_main: begin
	-- ensure that the swarm leader is a different drone
    if (ip_swarm_leader_tag = ip_tag) then leave sp_main; end if;
	-- ensure that the drone joining the swarm is valid and owned by the service
    if (select count(*) from drones where tag = ip_tag and id = ip_id) = 0 then leave sp_main; end if;
    -- ensure that the drone joining the swarm is not already leading a swarm
    if (select count(*) from drones where swarm_tag = ip_tag and swarm_id = ip_id) > 0 then leave sp_main; end if;
	-- ensure that the swarm leader drone is directly controlled
    if (select flown_by from drones where tag = ip_swarm_leader_tag and id = ip_id) is NULL then leave sp_main; end if;
    
	-- ensure that the drones are at the same location
    select hover into @loc1 from drones where tag = ip_tag and id = ip_id;
    select hover into @loc2 from drones where tag = ip_swarm_leader_tag and id = ip_id;
    if @loc1 != @loc2 then leave sp_main; end if;
    
    UPDATE drones
    SET swarm_tag = ip_swarm_leader_tag
    WHERE tag = ip_tag and id = ip_id;
    
    UPDATE drones
    SET swarm_id = ip_id
    WHERE tag = ip_tag and id = ip_id;
    
    UPDATE drones
    SET flown_by = NULL
    WHERE tag = ip_tag and id = ip_id;
end //
delimiter ;

-- leave_swarm()
-- -----------------------------------------------------------------------------
/* This stored procedure takes a drone that is currently in a swarm and returns
it to being directly controlled by the same pilot who's controlling the swarm. */
-- -----------------------------------------------------------------------------
drop procedure if exists leave_swarm;
delimiter //
create procedure leave_swarm (in ip_id varchar(40), in ip_swarm_tag integer)
sp_main: begin
	-- ensure that the selected drone is owned by the service and flying in a swarm
	if (select count(*) from drones where id = ip_id and tag = ip_swarm_tag and swarm_tag IS NOT NULL and swarm_id IS NOT NULL) = 0 then leave sp_main; end if;
    select swarm_tag into @swarmTag from drones where id = ip_id and tag = ip_swarm_tag;
    select swarm_id into @swarmID from drones where id = ip_id and tag = ip_swarm_tag;
    select flown_by into @vflown from drones where tag = @swarmTag and id = @swarmID;
    
    UPDATE drones
    SET flown_by = @vflown
    WHERE id = ip_id and tag = ip_swarm_tag;
    
    UPDATE drones
    SET swarm_id = NULL
    WHERE id = ip_id and tag = ip_swarm_tag;
    
    UPDATE drones
    SET swarm_tag = NULL
    WHERE id = ip_id and tag = ip_swarm_tag;
end //
delimiter ;

-- load_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add some quantity of fixed-size packages of
a specific ingredient to a drone's payload so that we can sell them for some
specific price to other restaurants.  The drone can only be loaded if it's located
at its delivery service's home base, and the drone must have enough capacity to
carry the increased number of items.

The change/delta quantity value must be positive, and must be added to the quantity
of the ingredient already loaded onto the drone as applicable.  And if the ingredient
already exists on the drone, then the existing price must not be changed. */
-- -----------------------------------------------------------------------------
drop procedure if exists load_drone;
delimiter //
create procedure load_drone (in ip_id varchar(40), in ip_tag integer, in ip_barcode varchar(40),
	in ip_more_packages integer, in ip_price integer)
sp_main: begin
	-- ensure that the drone being loaded is owned by the service
    if (select count(*) from drones where id = ip_id and tag = ip_tag) = 0 then leave sp_main; end if;
	-- ensure that the ingredient is valid
    if (select count(*) from packages where barcode  = ip_barcode) = 0 then leave sp_main; end if;
    -- ensure that the drone is located at the service home base
    select home_base into @serviceBase from delivery_services where id = ip_id;
    if (select hover from drones where id = ip_id and tag = ip_tag) != @serviceBase then leave sp_main; end if;
	-- ensure that the quantity of new packages is greater than zero
    if ip_more_packages <= 0 then leave sp_main; end if;
	-- ensure that the drone has sufficient capacity to carry the new packages
    select capacity into @droneCapacity from drones where id = ip_id and tag = ip_tag;
    select sum(quantity) into @totalQuantity from payload where id = ip_id and tag = ip_tag;
    if (@droneCapacity < @totalQuantity + ip_more_packages) then leave sp_main; end if;
    -- add more of the ingredient to the drone
    select count(*) into @barcodeCount from payload where id = ip_id and tag = ip_tag and barcode = ip_barcode;
    select quantity into @currQuantity from payload where id = ip_id and tag = ip_tag and barcode = ip_barcode;
    if (@barcodeCount > 0) then
		update payload 
        set quantity = @currQuantity +  ip_more_packages
        where id = ip_id and tag = ip_tag and barcode = ip_barcode;
    else
		insert into payload values (ip_id, ip_tag, ip_barcode, ip_more_packages, ip_price);
    end if;
end //
delimiter ;

-- efuel_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add more fuel to a drone. The drone can only
be refueled if it's located at the delivery service's home base. */
-- -----------------------------------------------------------------------------
drop procedure if exists refuel_drone;
delimiter //
create procedure refuel_drone (in ip_id varchar(40), in ip_tag integer, in ip_more_fuel integer)
sp_main: begin
	-- ensure that the drone being switched is valid and owned by the service
    if (select count(*) from drones where id = ip_id and tag = ip_tag) = 0 then leave sp_main; end if;
    -- ensure that the drone is located at the service home base
    select home_base into @serviceHomeBase from delivery_services where id = ip_id;
    if (select hover from drones where id = ip_id and tag = ip_tag) != @serviceHomeBase then leave sp_main; end if;
	select fuel into @currentFuel from drones where id = ip_id and tag = ip_tag;
    UPDATE drones
    SET fuel = @currentFuel + ip_more_fuel
    WHERE id = ip_id and tag = ip_tag;
end //
delimiter ;

-- fly_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to move a single or swarm of drones to a new
location (i.e., destination). The main constraints on the drone(s) being able to
move to a new location are fuel and space.  A drone can only move to a destination
if it has enough fuel to reach the destination and still move from the destination
back to home base.  And a drone can only move to a destination if there's enough
space remaining at the destination.  For swarms, the flight directions will always
be given to the lead drone, but the swarm must always stay together. */
-- -----------------------------------------------------------------------------
drop function if exists fuel_required;
delimiter //
create function fuel_required (ip_departure varchar(40), ip_arrival varchar(40))
	returns integer reads sql data
begin
	if (ip_departure = ip_arrival) then return 0;
    else return (select 1 + truncate(sqrt(power(arrival.x_coord - departure.x_coord, 2) + power(arrival.y_coord - departure.y_coord, 2)), 0) as fuel
		from (select x_coord, y_coord from locations where label = ip_departure) as departure,
        (select x_coord, y_coord from locations where label = ip_arrival) as arrival);
	end if;
end //
delimiter ;

drop procedure if exists fly_drone;
delimiter //
create procedure fly_drone (in ip_id varchar(40), in ip_tag integer, in ip_destination varchar(40))
sp_main: begin
	-- ensure that the lead drone being flown is directly controlled and owned by the service
    if (select count(*) from drones where id = ip_id and tag = ip_tag) = 0 then leave sp_main; 
    end if;
    if (select flown_by from drones where id = ip_id and tag = ip_tag) is NULL then leave sp_main; 
    end if;
    -- ensure that the destination is a valid location
    if (select count(*) from locations where label = ip_destination) = 0 then leave sp_main; 
    end if;
    -- ensure that the drone isn't already at the location
    if (select hover from drones where id = ip_id and tag = ip_tag) = ip_destination then leave sp_main; 
    end if;
    -- ensure that the drone/swarm has enough fuel to reach the destination and (then) home base
		select hover into @currentLoc from drones where id = ip_id and tag = ip_tag;
		select min(fuel) into @minFuel from drones where (swarm_id = ip_id and swarm_tag = ip_tag) or (id = ip_id and tag = ip_tag);
		set @reqFuel = fuel_required (@currentLoc, ip_destination);
		set @secondreqFuel = fuel_required (ip_destination, (select home_base from delivery_services where id = ip_id));
		set @thirdreqFuel = @reqFuel + @secondreqFuel;
        if (@minFuel < @thirdreqfuel) then
			leave sp_main;
        end if;
        
        -- ensure that the drone/swarm has enough space at the destination for the flight
        select count(*) into @dronesAtLocation from drones where hover = ip_destination;
		select count(*) into @numOfDrones from drones where (swarm_id = ip_id and swarm_tag = ip_tag) or (id = ip_id and tag = ip_tag);
		if ((select space from locations where label = ip_destination) - @dronesAtLocation) < @numOfDrones then leave sp_main; end if;
        select space into @currentSpace from locations where label = ip_destination;
        

		-- update location
		UPDATE drones
        SET hover = ip_destination
        where (swarm_id = ip_id and swarm_tag = ip_tag) or (id = ip_id and tag = ip_tag);

        -- update fuel
        update drones
		set fuel = fuel - @reqFuel
		where (swarm_id = ip_id and swarm_tag = ip_tag) or (id = ip_id and tag = ip_tag);

		select flown_by into @dronePilot from drones where id = ip_id and tag = ip_tag;
		update pilots
        set experience = experience + 1
		where (username = @dronePilot);

		
end //
delimiter ;

-- purchase_ingredient()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a restaurant to purchase packages from a drone
at its current location.  The drone must have the desired quantity of the ingredient
being purchased.  And the restaurant must have enough money to purchase the
packages.  If the transaction is otherwise valid, then the drone and restaurant
information must be changed appropriately.  Finally, we need to ensure that all
quantities in the payload table (post transaction) are greater than zero. */
-- -----------------------------------------------------------------------------
drop procedure if exists purchase_ingredient;
delimiter //
create procedure purchase_ingredient (in ip_long_name varchar(40), in ip_id varchar(40),
	in ip_tag integer, in ip_barcode varchar(40), in ip_quantity integer)
sp_main: begin
-- ensure that the restaurant is valid
    if (select count(*) from restaurants where long_name = ip_long_name) = 0 then leave sp_main; end if;
    -- ensure that the drone is valid and exists at the resturant's location
    if (select count(*) from drones where id = ip_id and tag = ip_tag) = 0 then leave sp_main; end if;
    select location into @whover from restaurants where long_name = ip_long_name;
	if (select hover from drones where id = ip_id and tag = ip_tag) != @whover then leave sp_main; end if;
	-- ensure that the drone has enough of the requested ingredient
    select quantity into @amount from payload where id = ip_id and tag = ip_tag and barcode = ip_barcode;
    if @amount < ip_quantity then leave sp_main; end if;
    -- update the drone's payload
    
    UPDATE payload
    SET quantity = @amount - ip_quantity
    WHERE id = ip_id and tag = ip_tag and barcode = ip_barcode;
    
    -- update the monies spent and gained for the drone and restaurant
    select price into @moneyPrice from payload where id = ip_id and tag = ip_tag and barcode = ip_barcode;
    select spent into @moneySpent from restaurants where long_name = ip_long_name;
    
    UPDATE restaurants
    SET spent = @moneySpent + (ip_quantity * @moneyPrice)
    WHERE long_name = ip_long_name;
    
    select sales into @droneSales from drones where id = ip_id and tag = ip_tag;
    
    UPDATE drones
	SET sales = @droneSales + (ip_quantity * @moneyPrice)
    WHERE id = ip_id and tag = ip_tag;
    
    -- ensure all quantities in the payload table are greater than zero
     DELETE FROM payload where quantity <= 0;
	
end //
delimiter ;

-- remove_package()
-- -----------------------------------------------------------------------------
/* This stored procedure removes an ingredient from the system.  The removal can
occur if, and only if, the ingredient is not being carried by any drones. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_package;
delimiter //
create procedure remove_package (in ip_barcode varchar(40))
sp_main: begin
	-- ensure that the ingredient exists
    if (select count(*) from packages where barcode = ip_barcode) = 0 then leave sp_main; end if;
    -- ensure that the ingredient is not being carried by any drones
    if (select count(*) from payload where barcode = ip_barcode and quantity > 0) > 0 then leave sp_main; end if;
    
    DELETE FROM packages WHERE barcode = ip_barcode;
end //
delimiter ;

-- remove_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a drone from the system.  The removal can
occur if, and only if, the drone is not carrying any packages, and if it is
not leading a swarm. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_drone;
delimiter //
create procedure remove_drone (in ip_id varchar(40), in ip_tag integer)
sp_main: begin
	-- ensure that the drone exists
    IF (ip_id NOT IN (select id from drones) and ip_tag IN (select ip_tag from drones where ip_id = id)) THEN LEAVE sp_main; END IF;
    -- ensure that the drone is not carrying any packages
    IF (ip_id, ip_tag) IN (select id, tag from payload) THEN LEAVE sp_main; END IF;
	-- ensure that the drone is not leading a swarm
    IF ((ip_id, ip_tag) IN (select swarm_id, swarm_tag from drones)) THEN LEAVE sp_main; END IF;
    DELETE from drones where id = ip_id and tag = ip_tag;
end //
delimiter ;

-- remove_pilot_role()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a pilot from the system.  The removal can
occur if, and only if, the pilot is not controlling any drones.  Also, if the
pilot also has a worker role, then the worker information must be maintained;
otherwise, the pilot's information must be completely removed from the system. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_pilot_role;
delimiter //
create procedure remove_pilot_role (in ip_username varchar(40))
sp_main: begin
	-- ensure that the pilot exists
    if (ip_username not in (select username from pilots)) then leave sp_main; end if;
    -- ensure that the pilot is not controlling any drones
    if (ip_username in (select flown_by from drones where flown_by = ip_username)) then leave sp_main; end if;
    -- remove all remaining information unless the pilot is also a worker
    if (ip_username in (select username from workers))
    then 
    delete from pilots where username = ip_username;
    leave sp_main;
    end if;
    
	delete from users where username = ip_username;
    delete from pilots where username = ip_username;
    
end //
delimiter ;

-- display_employee_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an employee.
For each employee, it includes the username, tax identifier, hiring date and
experience level, along with the license identifer and piloting experience (if
applicable), and a 'yes' or 'no' depending on the manager status of the employee. */
-- -----------------------------------------------------------------------------
create or replace view display_employee_view as
-- why is hired as hired?
select employees.username, GTID, hired as hired, employees.experience as employee_experience, IFNULL(pilots.licenseID, 'n/a') as licenseID, IFNULL(pilots.experience, 'n/a') as piloting_experience,
(case when employees.username in (select manager from delivery_services) then 'yes' ELSE 'no' END) as manager_status
from employees left join pilots on employees.username = pilots.username;

-- display_pilot_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a pilot.
For each pilot, it includes the username, licenseID and piloting experience, along
with the number of drones that they are controlling. */
-- -----------------------------------------------------------------------------
create or replace view display_pilot_view as
select username, licenseID, experience, 

(select count(*) from drones where flown_by = username or 
((swarm_id) in (select id from drones where flown_by = username) and swarm_tag in (select tag from drones where flown_by = username)))
 as num_drones, 

(select count(distinct hover) from drones where flown_by = username) as num_locations
from pilots; 

--  display_location_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a location.
For each location, it includes the label, x- and y- coordinates, along with the
number of restaurants, delivery services and drones at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_location_view as
select label, x_coord, y_coord, 
(select count(long_name) from restaurants where label = location) as num_restaurants,
(select count(id) from delivery_services where label = home_base) as num_delivery_services,
(select count(hover) from drones where label = hover) as num_locations 
from locations;

-- display_ingredient_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of the packages.
For each ingredient that is being carried by at least one drone, it includes a list of
the various locations where it can be purchased, along with the total number of packages
that can be purchased and the lowest and highest prices at which the ingredient is being
sold at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_package_view as
select iname as package_name, 
hover, SUM(quantity) as amount_available, MIN(price) as low_price, MAX(price) as high_price
from payload 
join packages on payload.barcode = packages.barcode
join drones on payload.id = drones.id and payload.tag = drones.tag
group by package_name, hover;

-- display_service_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a delivery
service.  It includes the identifier, name, home base location and manager for the
service, along with the total sales from the drones.  It must also include the number
of unique packages along with the total cost and weight of those packages being
carried by the drones. */
-- -----------------------------------------------------------------------------
create or replace view display_service_view as
select *,
IFNULL((select sum(0 + sales) from drones where drones.id = delivery_services.id), 0) as revenue, 
(select count(distinct packages.barcode) from payload left join packages on payload.barcode = packages.barcode where payload.id = delivery_services.id) as packages_carried,
IFNULL((select sum(0 + quantity * price) from payload where payload.id = delivery_services.id), 0) as cost_carried, 
IFNULL((select sum(0 + quantity * weight) from payload left join packages on payload.barcode = packages.barcode where payload.id = delivery_services.id), 0) as weight_carried
from delivery_services;

