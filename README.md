# Example how to run this app

1. run `npm i`
2. edit `ormconfig.json` and change your database configuration (kindly  create a database,  you can also       change a database type, but don't forget to install specific database drivers)
3. renname .env-example to .env
4. you may have to install ts-node globally `npm -g ts-node`
5. run `npm start`
6. open `http://localhost:3000/`
7. use curl, postman or other tools to send http requests to test the app

## How to run test
1. run `npm test `

### How to use CLI?

1. install `typeorm` globally: `npm i -g typeorm`
2. run `typeorm -h` to show list of available commands