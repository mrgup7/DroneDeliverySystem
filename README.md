# VIP Restaurant Drone Delivery System Project

## Getting Started

### Instructions to Setup the App

* Make sure to have npm and MySQL installed before completing the rest of the ReadMe.

* In order to install all dependencies required to run this project, direct yourself to the frontend and backend folders and run this command inside each one.

```
npm i
```

* Then make sure that your MySQL server is running and use the following command in orer to reach MySQL through terminal:

Command for Mac:
```
/usr/local/mysql/bin/mysql -u root -p
```

It should prompt you to enter your MySQL password. Afte entering this password, run the following command to set up the database:
```
source <Directory for wherever the phase2+3.sql file is>
```

For example, this command might look like this on Mac:
```
source /Users/mridul/Documents/georgiatech/project/phase2+3.sql
```

* After running this command, you should see several queries complete. Then you can 
```
quit
``` 
in order to exit MySQL from the terminal.

You should also create a .env file with the password for your MySQL database inside the backend folder. The .env should look like this:
```
DB_PASSWORD="<Your DB Password>"
```

### Instructions to Run the App

* Then, run the following command within the backend folder to start the backend:

```
npm start
```

* Run the same command again within the frontend folder to start the frontend. It should prompt you saying there is already something running on the port. Type 'y' to run the frontend a different port. 

* After this is complete, the localhost should automatically direct you to the proper localhost url within your web browser with port 3001. In order to test if both the frontend and backend are working, click the ingredients tab and make sure that data is appearing under each column. 

## Technologies Used

For this project, I created a web-application using React, Express, Node.js, and MySQL while also using Postman for our API testing. React was used to create the front-end and Express and Node.js were used to create our RESTful API as well as interact with our MySQL database. In order to update the database with operations completed through the front-end, I executed a variety of PUT and DELETE requests within our API that called the stored procedures that I implemented in phase 3. I used GET requests and a React Router in order to display each of the views on separate pages.



