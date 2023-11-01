## Introduce

This website is built with Node.js, Express.js, and MySQL. I've leveraged Sequelize, a Node.js ORM (Object Relational Mapping) tool, to interact with the database. Users can manage restaurants through  buttons for creation, deletion, reading, and updating. Users can register an account or use Facebook to login and manage your restaurants.I trust you'll have delightful user experience.  

![Demo](https://github.com/TheyCallMeAndyBro/restaurantList_CRUD/blob/main/restaurantList_CRUD_Demo.gif)

## Features

- Establish a connection between the backend and the database
- Register/Local Login/Facebook Login function 
- CRUD function
- Server-Side Rendering

## Installing

1.Clone the repository
```
git clone https://github.com/TheyCallMeAndyBro/restaurantList_CRUD.git
```

2.Move to file
```
cd restaurantList_CRUD
```

3.Install npm packages
```
npm install
```

4.Set up MySQL(Database)

edit environment config
```
create database restaurant;

```

5.Run migration and seeder to create database data
```
npx sequelize db:migrate;
npx sequelize db:seed:all
```

6.Launch the website 
```
npm start
```

<<<<<<< HEAD
=======
5.Stop
```
ctrl +　ｃ
```
>>>>>>> 5c679d5affc130de5052b11785ef73757836aefa
