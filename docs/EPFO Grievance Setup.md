# Back-End Setup

## Required Softwares:
- MySql
- NodeJs
- Git
### Steps to setup api code:
1. Install NodeJs
2. Unzip folder epfo_gr_node.zip into any folder
3. Go to epfo_gr_node folder
4. Open Command Prompt inside that folder (type "cmd" in folder path and enter)
5. Install dependent libraries by using command  ``` npm install ```
6. Run the node server application by using ``` npm start ```

### Database Commands:
# create database commmands
> create database epfo_grievance;
> use epfo_grievance;

# create tables

```bash
create table users (
   user_id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(100) NOT NULL,
   email VARCHAR(100) NOT NULL,
   password VARCHAR(100) NOT NULL,
   role varchar(40) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   PRIMARY KEY ( user_id )
);

create table visitors (
   visitor_id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
   visitor_name VARCHAR(100) NOT NULL,
   visitor_mobile VARCHAR(20) NOT NULL,
   visitor_email VARCHAR(60),
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY ( visitor_id )
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table grievance (
	grievance_id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	visitor_id BIGINT(20) UNSIGNED NOT NULL,
	member_name VARCHAR(100),
	member_mobile VARCHAR(20),
	uan VARCHAR(20),
	pf_account_no VARCHAR(50),
	ppo_number VARCHAR(50),
	establishment_name VARCHAR(100),
	establishment_id VARCHAR(20),
	task_id VARCHAR(10),
	section varchar(50),
	grievance_category VARCHAR(100),
	status VARCHAR(20),
	visited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	closing_remark VARCHAR(500),
	PRIMARY KEY ( grievance_id ),
	FOREIGN KEY ( visitor_id ) REFERENCES visitors(visitor_id) ON DELETE CASCADE
) ENGINE=INNODB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8;

create table visits (
	visit_id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	grievance_id BIGINT(20),
	no_of_visit INT(10),
	attended_at_level VARCHAR(100),
	grievance_details VARCHAR(500),
	visit_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( visit_id )
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table establishment (
	estb_id INT NOT NULL AUTO_INCREMENT,
	establishment_id VARCHAR(60) NOT NULL,
	establishment_name VARCHAR(250) NOT NULL,
	estb_account_task_id  VARCHAR(10) NOT NULL,
	PRIMARY KEY ( estb_id )
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

#insert this records to create login users
insert into users (username,email,password,role, created_at) values ("pradeep", "jadhavpradeep02@gmail.com", "pradeep", "admin",now());
insert into users (username,email,password,role, created_at) values ("sunil", "sunilchivate@gmail.com", "sunil", "admin",now());
insert into users (username,email,password,role, created_at) values ("suhas", "suhassanmukh@gmail.com", "suhas", "admin",now());
insert into users (username,email,password,role, created_at) values ("chetan", "chetankekade@gmail.com", "chetan", "admin", now());

# No need to insert this records - as this are testing purpose
INSERT INTO visitors (visitor_id, visitor_name, visitor_mobile, visitor_email, uan, pf_account_no, establishment_name, created_at) VALUES (NULL,"Mohan","9867153742","mohan@abc.com","1122334455","MH/BAN/0002/25788/29882","9/10/2021 0:24:16");

INSERT INTO visitors (visitor_id, visitor_name, visitor_mobile, visitor_email, uan, pf_account_no, establishment_name, created_at) VALUES (NULL,'Amol Kumar', '9867452312', 'amol.kumar@gmail.com', '112233445566771', 'MH/BAN/0002/25788/12234', 'Infosys', now());

INSERT INTO grievance (grievance_id, visitor_id, grievance_category, no_of_visit, attended_at_level, grievance_details, status, visited_at) VALUES (NULL, 1, "Normal", 1, "Clerk", "Pension not started", "Pending", now())

INSERT INTO grievance (grievance_id, visitor_id, grievance_category, no_of_visit, attended_at_level, grievance_details, status, visited_at) VALUES (NULL, 2, "Major", 1, "Clerk", "PF Transfer not started", "Pending", now())

```

# Front-End Setup

## Requirements
- Node js

### Setup
- Open ```cmd``` window and navigate to ```epfo_gr_ui``` folder
- If this is your first time setting up, run ```npm install```
- Once you have done ```npm install```, do ```npm run start```
- The front-end server will start on port ```8000``` and will launch page : ```http://localhost:8000/#login```
- Done!


### Add column into grievance table
alter table grievance add column closing_remark VARCHAR(500);


### update no of visits after fix
update visits set no_of_visit = 1 where no_of_visit = 2;

update visits set no_of_visit = 2 where no_of_visit = 3;

***Note:***  Backend server need to be running for front-end to work properly.