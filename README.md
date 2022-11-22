# Knex Express API
[![Maintainability](https://api.codeclimate.com/v1/badges/cf5d695145d250eb622a/maintainability)](https://codeclimate.com/github/firmanJS/knex-express-for-backend-team/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cf5d695145d250eb622a/test_coverage)](https://codeclimate.com/github/firmanJS/knex-express-for-backend-team/test_coverage)
[![Node.js CI](https://github.com/firmanJS/express-boillerplate-restfullapi/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/firmanJS/express-boillerplate-restfullapi/actions/workflows/node.js.yml)
[![made-with-nodejs](https://img.shields.io/badge/Made%20with-Nodejs-1f425f.svg)](https://nodejs.org)
[![made-with-expressjs](https://img.shields.io/badge/Made%20with-Expressjs-1f425f.svg)](https://expressjs.com/)
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/firmanJS)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/firmanJS/express-boillerplate-restfullapi/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/firmanjs/express-boillerplate-restfullapi.svg)](https://github.com/firmanJS/express-boillerplate-restfullapi/releases)
[![Github all releases](https://img.shields.io/github/downloads/firmanjs/express-boillerplate-restfullapi/total.svg)](https://github.com/firmanJS/express-boillerplate-restfullapi/releases)
[![GitHub issues](https://img.shields.io/github/issues/firmanjs/express-boillerplate-restfullapi.svg)](https://gitHub.com/firmanJS/express-boillerplate-restfullapi/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/firmanjs/express-boillerplate-restfullapi.svg)](https://gitHub.com/firmanjs/express-boillerplate-restfullapi/pulls/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
## Getting started
- **Clone This Repository Using HTTPS** 
```bash
git clone https://github.com/firmanJS/knex-express-for-backend-team.git
cd existing_repo
```
### Run Application
running application three methods manually, using docker or via Makefile
* Manually :

```bash
# Copy enviroment variables from .env.sample to .env
cp .env.sample .env

# Install package via npm or yarn
npm install

# Run application via npm or yarn
npm run dev

# Run migration or create migration file
npm i -g knex

# Create migration
knex migrate:make create_users_table --cwd=src 

# Run migration
knex migrate:latest --cwd=src

# Create Seed
knex seed:make users_seed --cwd=src

# Run Seed
knex seed:run --cwd=src
```

* Via Docker :

```bash
# Copy enviroment variables from .env.sample to .env
cp .env.sample .env

# Build application
docker-compose -f docker-compose-dev.yml up --build --remove-orphans --force-recreate

# Stop aplication
CTRL+C 
# then 
docker-compose -f docker-compose-dev.yml down

# After build you can run command with this
docker-compose -f docker-compose-dev.yml up 
# Or you can hide log with command
docker-compose -f docker-compose-dev.yml up -d

# Create migration in docker container
docker-compose -f docker-compose-dev.yml exec lelang-core-api knex migrate:make create_core_users_table --cwd=src 

# Run migration in docker container
docker-compose -f docker-compose-dev.yml exec lelang-core-api knex migrate:latest --cwd=src

# Create Seed in docker container
docker-compose -f docker-compose-dev.yml exec lelang-core-api knex seed:make seed_users --cwd=src

# Run Seed in docker container
docker-compose -f docker-compose-dev.yml exec lelang-core-api knex seed:run --cwd=src
```

* Via Make :

```bash
# Copy enviroment variables from .env.sample to .env
cp .env.sample .env

# Build application
make docker-build

# Stop aplication
CTRL+C 
# then 
make docker-down

# After build you can run command with this
make docker-start
```
### Start Code


## Project Structure
```
├── coverage/           * all output coverage
├── docker/             * all dockerfile
├── src/                * all source code in here
  └── config/           * all configuration file here
  |  └── database.js    * configuration database
  └── modules/          * all file modules in here
  |   └── index.js      * register all modules here
  └── lang/             * setup language
  |   └── index.js      * register all language here
  └── middlewares/      * all middleware file here, for check before next to api
  └── repository/       * all file repository for single db or multiple db
  |   └── monggo        * register all monggo
  |   └── mysql         * register all mysql
  |       └── migrations * all migrations file
  |       └── seeders    * all seeders file
  |   └── postgresql    * register all postgresql
  |       └── migrations * all migrations file
  |       └── seeders    * all seeders file
  └── routes/           * all file route here
  |   └── index.js      * register all route
  └── __test__/         * all test case file here
  |   └── index.js      * test apps
  └── utils/            * all utils file here
```
### 1. Coverage
Directory `coverage` acts as `coverage code score` this directory automatic generated by `jest`. 
### 2. Docker
Directory `docker` acts as `container setup` this directory is used to setup docker container for local development and production.
### 3. __Test__
This directory has all test case file unit test or integraion test and measurement coverage.
### 4. Config
This directory is for create all config like a database, monitoring, aws, gcp, elasticsearch, etc.

### 5, Handlers
This directory for handlers all business logic like a controllers in MVC pattern.
### 6. Lang
This directory for set language for all message in api set to ['en', 'id', 'jp'].
### 7. Middlewares
This directory for all middlewares before access to api/bussines logic.
### 8. Repository
This directory for handle all use case for database, transaction and file seed or migrations register here.
### 9. Routes
This directory for register all route api.
### 10. Utils
This directory for all utils function.
## Code Style Guides
* Guideline:
  * Use camelCase for variable name, naming function, load module or other functions
  * Use UpperCase for Constant Variable
  * Use PascalCase for class name, models
  * Use snake_case for file name
  * Function name use Verb
  * Variable name use Noun

## Benchmark
this benchmark is used to measure the performance of your application using apache bench [https://httpd.apache.org/docs/2.4/programs/ab.html](https://httpd.apache.org/docs/2.4/programs/ab.html).
```bash
# -c concurency -n number of requests -t time to run 
ab -k -c 20 -n 250 "http://localhost:2000/"

#result becnhmark with 50 user and 1000 request
Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        
Server Hostname:        localhost
Server Port:            2000

Document Path:          /api/v1/todos
Document Length:        797 bytes

Concurrency Level:      50
Time taken for tests:   5.689 seconds
Complete requests:      1000
Failed requests:        0
Keep-Alive requests:    1000
Total transferred:      1842000 bytes
HTML transferred:       797000 bytes
Requests per second:    175.78 [#/sec] (mean)
Time per request:       284.452 [ms] (mean)
Time per request:       5.689 [ms] (mean, across all concurrent requests)
Transfer rate:          316.19 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       3
Processing:    12  279  52.8    277     470
Waiting:        9  278  52.8    277     470
Total:         12  279  52.8    277     471

Percentage of the requests served within a certain time (ms)
  50%    277
  66%    298
  75%    310
  80%    319
  90%    348
  95%    366
  98%    405
  99%    414
 100%    471 (longest request)
```
