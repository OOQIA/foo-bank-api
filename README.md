Foo Bank Web API
==================================

Getting Started
---------------

1. **Install dependencies**
    ```sh
    npm install
    ```
2. **Configure database connection**  
    Rename the file in `/src/configs/database-sample.json` to `database.json` and set the proper values there for your connection

3. **Run migrations**  
    ***Note:*** For this to work **you must first create an empty database** matching your connection config defined previously in the database.json
    ```sh
    npm run migrate
    ```

3. **Run the application**  
    ```sh
    # Start development live-reload server
    npm run dev

    # Start production server:
    npm start
    ```