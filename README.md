## Introduce

This website is built with Node.js, Express.js, and MySQL. I've leveraged Sequelize, a Node.js ORM (Object Relational Mapping) tool, to interact with the database. Users can manage restaurants through  buttons for creation, deletion, reading, and updating. Users can register an account or use Facebook to login and manage your restaurants.I trust you'll have delightful user experience.  

![register](https://github.com/TheyCallMeAndyBro/restaurantList_CRUD/assets/133637358/6bf23575-ecab-4621-8d08-db6e4d490664)

![login](https://github.com/TheyCallMeAndyBro/restaurantList_CRUD/assets/133637358/83063b75-d6ce-492f-953d-92c289b2c575)


![restaurants](https://github.com/TheyCallMeAndyBro/restaurantList_CRUD/assets/133637358/d6959b14-96c5-436a-b82c-804a083151f6)


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

5.Stop
```
ctrl +　ｃ
```

