# Data4LifeChallenge

## Entities and Relations

- Doctors
- Customers
- Appointments

<img src="https://i.ibb.co/vzY4t4v/Screenshot-2021-09-07-at-3-38-53-PM.png" height="500">

## How to run the solution

There are two parts of the solution, one with the database and one without linking to the database. 

````main```` consist of the solution that is linked to MongoDB (only run if you have Mongodb)
````local```` consist of the solution that is not linked to any database which you can run locally (for all users)

Tech stack used for both branches:
- Node.js Express
- Angular Typescript

The following steps to run (catered to both solutions)
- Pre-Req: ````npm install````
- Backend: (localhost:5000) 
  ```
  cd server
  node server
  ```
  
- Frontend: (localhost:4200)
  ```
  cd project-app
  ng serve
  ```

## Assumptions
- DateTime input is always a one hour interval
- DateTime input format is always consistent (eg. 08032018 09:00:00)
- Doctor and Patient data is static, meaning the user can only select D1, D2 for doctors and P1,P2,P3 for patients

<br>

Thank you for reading this and have a nice day. :)
