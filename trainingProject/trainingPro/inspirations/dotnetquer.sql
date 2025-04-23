create database bacvdotnet;
use bacvdotnet;

create table UserList
(   
    userId int NOT NULL PRIMARY KEY,
    userName nvarchar(50) NOT NULL,
    loginId nvarchar(50) NOT NULL,
    loginPassword nvarchar(50) NOT NULL,
    isActive bit NOT NULL default(1),
);

select * from UserList;

insert into UserList (userId, userName, loginId, loginPassword) values
(1, 'Gopal Maharjan', 'gopal', 'gopal123'),
(2, 'Srinivas Rao', 'srinivas', 'srinivas123'),
(3, 'Ravi Kumar', 'ravi', 'ravi123'),
(4, 'Suresh Kumar', 'suresh', 'suresh123'),
(5, 'Ravi Teja', 'raviteja', 'raviteja123'),
(6, 'Srinivas Reddy', 'srinivasreddy', 'srinivasreddy123'),
(7, 'Gopal Reddy', 'gopalreddy', 'gopalreddy123'),
(8, 'Ravi Shankar', 'ravishankar', 'ravishankar123'),
(9, 'Srinivas Kumar', 'srinivaskumar', 'srinivaskumar123'),
(10, 'Gopal Teja', 'gopalteja', 'gopalteja123');








