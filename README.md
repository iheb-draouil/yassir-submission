Usage

OS: Ubuntu 20.04

Docker Version: 20.10.18 (client & engine)

```bash
# Start a database instance
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<PASSWORD_IN_ENV_FILE> mysql:8.0

# Make the environment varibales available for the node engine
source .env

# Install dependencies
npm install

# Ready the database
npm run database:create
npm run migrations:migrate

# Start the development server
npm run start
```

Base Url: http://localhost:8000

Endpoints:

- GET /nearest-city-aq:
    
    - description: Returns the air quality of the nearest city approximated from the longitude and latitude values
    - query strings:
        - latitude
        - longitude

- POST /register-city-aq:
    - description: Finds the nearest city, saves it into the database, then saves the current air quality index value
    - query strings:
        - latitude
        - longitude

- GET /cities:
    - description: Returns a list of all the cities that have been saved through the above endpoint

- GET /city-peak-pollution-datetime:
    - description: Returns the peak air quality index (highest pollution level) of a city (use the values from the above endpoint).
    - query strings:
        - cityName

In the cron, we setup an http script that calls "POST /register-city-aq" with Paris' coordinates.