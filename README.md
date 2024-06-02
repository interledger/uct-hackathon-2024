# Tippy

Simple Nextjs project that lets creators have a profile that allows them to create fundraising campaigns. They can receive donations through open payments by inserting open payments their wallet address as a payment option.

## Running The Project

Install pnpm first: https://pnpm.io/installation

Clone this repository then run pnpm install

```bash
pnpm install
```

### Environment Variables

Setup the environmental variables by copying the .env.copy into a .env file

```bash
cp .env.copy .env
```

### Postgresql docker setup

Install docker desktop first for your machine:
https://docs.docker.com/engine/install/

Run the Postgresql server through docker-compose.

```bash
sudo docker-compose up -d
```

To stop the container run

```bash
sudo docker-compose stop
```

To view local docker containers run

```bash
sudo docker ps -a
```

To delete a container local docker containers run

```bash
docker rm --force <container_id>
```

Run migrate to update your DB schema

```bash
npx prisma migrate dev
```

### Run db migrations

To create tables in the db run:

```bash
npx prisma migrate
```

### Run SQL Commands on cli

Run this command to view the container ids:

```bash
docker ps
```

Run this command to get into the postgres docker container:

```bash
docker exec -it postgres_container_id bash
psql tippy tippy_admin
```

Then run this command to show the tables:
`\dt`

Then run this command to show table columns:
`select * from dashboard_analytics_transaction where false;`

If you face an error 'role does not exists' make sure you delete the tippy_pgdata volume and re-run `docker compose up -d`

### Run SQL Commands on GUI

You can install PGAdmin GUI to view DBs and Tables:
https://www.pgadmin.org/download/
