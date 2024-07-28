Got it! Here's the updated README with your personal examples included:

Official sequelize-cli README.md for commands --> https://github.com/sequelize/cli

# Sequelize Setup Guide

## Installation

1. Install the necessary packages:

   ```bash
   npm install mysql2 sequelize sequelize-cli @types/sequelize
   ```

2. Change to the `src` directory `below all should be done in src`:

   ```bash
   cd src
   ```

3. Initialize Sequelize:

   ```bash
   npx sequelize init
   ```

## Configuration

4. Configure your database by editing `config/config.json`. Provide the database name and password.

## Database Creation

5. Create the database:

   ```bash
   npx sequelize db:create
   ```

## Accessing the Database

6. Access the database in the terminal:

   ```bash
   sudo mysql -u root -p
   ```

## Model Creation

7. Create a model(table) using Sequelize CLI:

   ```bash
   npx sequelize model:generate --name Airplane --attributes modelNumber:string,capacity:integer
   ```

   Note: The generated model will be in JavaScript. To convert it to TypeScript, manually remove the `id` field in the converted code (in init) by AI, as migrations will internally create the `id`.

## Editing Models

8. To edit the model, modify the migration file and create a new migration. Commit your changes.
   - If you need to add another change, undo the previous migration and add the new migration to the database.

## Applying Migrations

9. Apply the migration (Versions of the schema of Database) to replicate the table in the database:

   ```bash
   npx sequelize db:migrate
   ```

## Undoing Migrations

10. To undo the last migration:

    ```bash
    npx sequelize db:migrate:undo
    ```

11. To undo all migrations:

    ```bash
    npx sequelize db:migrate:undo:all
    ```

## Seeders

12. Seeders are the dummy data in the application to generate seeders we use:

    ```bash
    npx sequelize seed:generate --name <any name of seeder>
    ```

    And Now we can add the data in this generated seed files
    Up Function takes the data to add and the Down function takes the `logic` of data that needed to be deleted

13. To add these are seeds(data) to the database run:

    To seed (add) one Particular File:

    ```bash
    npx sequelize db:seed --seed file_name.js
    ```

    To seed (add) All Files:

    ```bash
    npx sequelize db:seed:all
    ```

14. To Undo the seed file changes in DB:

    ```bash
    npx sequelize db:seed:undo:all
    ```

    Note: This step will only take place if there is an down function in the seed file

## Associations

Associations are the ones used to connect two models using primary key and foreign keys

**Note**:
We can also add the migrations in the same file without creating an other file for reference check `20240727142204-create-airport.js`

15. Create an seperate migration (only migration) for particular association (for reference check `20240728095046-create-flight.js`)

    ```bash
    npx sequelize migration:generate --name <name of the migration>
    ```

    In this case we want `CityId` of `Airports` act as `Foreign Key` and `id` of `Cities` Table as `Primary Key`
    Thus write the up and down functions accordingly in created Migration file

    **Note**:

    Now add this to database by doing `Step: 9`

    Check it by using `desc Airports;` and you should see `MUL` if it converted to Foreign Key

16. Now Go to Models which have foreign key and Primary Key and add Associations Code in associate Methods

    The Foreign Key Model will have `belongsTo` which connects to the Primary Key Model

    The Primary Key Model will have `hasMany` which connects to the Foreign Key Model

    `CASCADE` Means the Update and Delete changes will propagate that means if we Delete an City then it's coresponding Airports will be deleted

17. Now sequelize gives us powers to interact directly using code like

    ```javascript
    const vijayawada = await City.findByPk(1);
    await Airport.create({
      name: "guntur2",
      code: "VDJ",
      cityId: 1,
    });
    const airportnew = await vijayawada.createAirport({
      name: "guntur1",
      code: "VDJ",
    });
    const airports = await vijayawada.getAirports();
    ```

    The best part we can execute this code without writing `.createAirport()` and `.getAirports()` as these are provided directly by Sequelize for us

## Joins

18. If we want to get Data of one flight we need to make more requests because we need to get information from different tables with are connected with Primary and foreign Keys thus we need to write joins to get the data collectively rather doing extra calls
    Thus here is the code block powered with `Sequelize` by which you can do joins

    It is usually written in Repository Layer

    **Note: **
    The alias given below should also be give in the associate functions in the respective Models

    ```javascript
    // The below block joins the details of different tables that are connected with primary and foreign keys
      include: [
        // for joins --> No need to make differnet requests using join make one request to get all data asscoiated with primary and foreign keys
        {
          model: Airplane,
          required: true, // for eager loading
          as: "airplaneDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            // It will defaultly check airplane.id = id to change it to use code = id we use on function
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: { // another level of join
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    ```

    The Excepted Ouput as follows

    ```json
    {
      "id": 1,
      "flightNumber": "UK 808",
      "airplaneId": 8,
      "departureAirportId": "VDJ",
      "arrivalAirportId": "HYD",
      "arrivalTime": "2024-07-27T23:03:12.000Z",
      "departureTime": "2024-07-27T23:03:01.000Z",
      "price": 3500,
      "boardingGate": "",
      "totalSeats": 120,
      "createdAt": "2024-07-28T12:19:35.000Z",
      "updatedAt": "2024-07-28T12:19:35.000Z",
      "airplaneDetail": {
        "id": 8,
        "modelNumber": "boeing777",
        "capacity": 450,
        "createdAt": "2024-07-27T10:45:49.000Z",
        "updatedAt": "2024-07-27T10:45:49.000Z"
      },
      "departureAirport": {
        "id": 1,
        "name": "vijayawada",
        "code": "VDJ",
        "address": null,
        "cityId": 1,
        "createdAt": "2024-07-28T09:30:54.000Z",
        "updatedAt": "2024-07-28T10:52:16.000Z",
        "City": {
          "id": 1,
          "name": "vijayawada",
          "createdAt": "2024-07-27T13:04:03.000Z",
          "updatedAt": "2024-07-27T13:04:03.000Z"
        }
      },
      "arrivalAirport": {
        "id": 8,
        "name": "hyderabad",
        "code": "HYD",
        "address": "ekkada paditey akkada",
        "cityId": 14,
        "createdAt": "2024-07-28T12:00:06.000Z",
        "updatedAt": "2024-07-28T12:00:06.000Z",
        "City": {
          "id": 14,
          "name": "hyderabad",
          "createdAt": "2024-07-28T10:42:05.000Z",
          "updatedAt": "2024-07-28T10:42:05.000Z"
        }
      }
    }
    ```
