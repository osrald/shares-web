![SharesGit-HeaderAPI](https://user-images.githubusercontent.com/36359263/130906976-caa4ccb6-0f4f-4c28-8201-9f576b2fa2b7.png)

This project is a Rest API designed as a backend for shares-system's web and mobile applications. It utilizes Java Spring Boot with MySql database; moreover, cloud infrastructure is composed of linux ubuntu server, nginx and tomcat9 web server. It is also designed to be flexible, scalable, continuous integration and continuous deployment which supports agile software development strategy.

# REST API Documentation

The API is based on HTTP request where it returns or accepts JSON format. You can use various API tools such as postman or fiddler

## Configuration Service 

### HTTP Get

https://shares-system.com/SharesApi/SharesAllConfig  
Returns all shares configuration

https://shares-system.com/SharesApi/SharesConfigByType/{Type}  
These are the configuration types for shares-system. Replace the {Type} with the following:  
SCH – List of schools  
TRK – List of tracks offered by schools  
SAS – List of strand or specialization offered by schools  
CFG – General configuration  
DSG – User designations  
SST – Registration status  
RGN - Regions  
BGY - Barangays  

https://shares-system.com/SharesApi/SharesConfigByType/{Type}/{SubType}  
Replace {Type} with the list above and replace {SubType} with the result from the above api

### HTTP Put

https://shares-system.com/SharesApi/configUpdate  
Updates the configuration

## User Service

### HTTP Get

https://shares-system.com/SharesApi/userGetAll  
Returns all shares-system users

https://shares-system.com/SharesApi/userGetAllTeachers  
Returns all users with type teacher

https://shares-system.com/SharesApi/userById/{id}  
Returns user information, replace {id} with UUID(i.e. 4ef09566-c532-11eb-b47e-254bfe4c5a6e)

### HTTP Put 

https://shares-system.com/SharesApi/userUpdate  
Updates user information

### HTTP Post

https://shares-system.com/SharesApi/userAddNew  
Add new shares-system user

## Student Service

### HTTP Get

https://shares-system.com/SharesApi/studentDoesExist/{lrn}  
This determine if the specified student {lrn} exist

https://shares-system.com/SharesApi/studentById{id}  
Returns student information. Replace {id} with UUID (i.e. 4ef09566-c532-11eb-b47e-254bfe4c5a6e)

https://shares-system.com/SharesApi/studentByLRN{lrn}  
Returns student information. Replace {lrn} with student’s learner’s reference number

https://shares-system.com/SharesApi/studentRegistrationStatus{lrn}  
Returns student registration status. Replace {lrn} with student’s learner’s reference number  

https://shares-system.com/SharesApi/sdtStudentsGetSection/{sectionID}  
Returns list of students which belongs to the specified {sectionID}

### HTTP Put
https://shares-system.com/SharesApi/studentRegisterExisting/{id}  
Updates the registered student

https://shares-system.com/SharesApi/studentEnroll  
Enrolls the specified student

https://shares-system.com/SharesApi/assignStudentToSection  
Assigns the specified student to section

https://shares-system.com/SharesApi/batchAssignStudentsToSection  
Assigns multiple students to section

### HTTP Post
https://shares-system.com/SharesApi/studentRegisterNew  
Register new student

 

## Enrollment Service 

### HTTP Get
https://shares-system.com/SharesApi/enrGetAllStudentsForSectionAssigment  
Returns list of students which are not yet assigned to section

https://shares-system.com/SharesApi/enrSectionsGetAll  
Returns all sections

https://shares-system.com/SharesApi/enrSectionGetByID/{id}  
Returns section information, replace {id} with section id

 

### HTTP Put
https://shares-system.com/SharesApi/enrSectionUpdate  
Updates section information

 

### HTTP Post
https://shares-system.com/SharesApi/enrSectionAddNew  
Add new section
