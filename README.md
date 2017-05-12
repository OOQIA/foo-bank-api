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

4. **Run the application**  
    ```sh
    # Start development live-reload server
    npm run dev

    # Start production server:
    npm start
    ```
5. **Authenticate**  
    In order to get an access token you need to do a post to **host/api/v2/authenticate** and in the body as application/json:
    ```json
    {
        "username": "testuser",
        "password": "12345678"
    }
    ```
    You should recieve something like the following in the body of the response:
    ```json
    {
        "sucess": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJkZXNjcmlwdGlvbiI6IkEgdGVzdCB1c2VyLiIsImlhdCI6MTQ5NDYwNDk0NywiZXhwIjoxNDk0NjkxMzQ3fQ.onVDUM30t9TRAmT8mIdVHganloTWqzMQWz-acKlJJtw"
    }
    ```
    Then add the token in the Authorization Header like: "**Bearer {token}**"

6. **Run Tests**
    ```sh
    npm run test
    ```
7. **Build the application**  
    ***Note***: Since the application is using the latest ES6 features some of them are still not supported in the V 6.\*.\* of nodejs so it must be build first via:
    ```sh
    npm run build
    ```