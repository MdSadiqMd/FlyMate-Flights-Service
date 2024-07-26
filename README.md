Got it! Here's the updated README with your personal examples included:

# Sequelize Setup Guide

## Installation

1. Install the necessary packages:

   ```bash
   npm install mysql sequelize sequelize-cli @types/sequelize
   ```

2. Change to the `src` directory below all should be done in `src`:

   ```bash
   cd src
   ```

3. Initialize Sequelize:

   ```bash
   npx sequelize init
   ```

## Configuration

4. Configure your database by editing `config/config.json`. Provide the database name and password if needed.

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

7. Create a model using Sequelize CLI:

   ```bash
   npx sequelize model:generate --name Airplane --attributes modelNumber:string,capacity:integer
   ```

   Note: The generated model will be in JavaScript. To convert it to TypeScript, manually remove the `id` field in the converted code (in init) by AI, as migrations will internally create the `id`.

## Editing Models

8. To edit the model, modify the migration file and create a new migration. Commit your changes.
    
   - If you need to add another change, undo the previous migration and add the new migration to the database.

## Applying Migrations

9. Apply the migration to replicate the table in the database:

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