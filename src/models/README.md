## INFO
this directory contains the repository mysql, postgres or etc, single or multiple



## KNEX
[https://knexjs.org/](https://knexjs.org/)

- **Create Migration**
```bash
knex migrate:make create_users_table --cwd=src 

```

- **Run Migration**
```bash
knex migrate:latest --cwd=src

```

- **Create Seed**
```bash
knex seed:make users_seed --cwd=src

```

- **Run Seed**
```bash
knex seed:run --cwd=src

```