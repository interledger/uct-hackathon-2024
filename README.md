# Tippy

A simple [Next.js](https://nextjs.org/) tutorial project that for creators to publish fundraising campaigns. They can receive donations through [OP (Open Payments)](https://openpayments.dev/) by inserting their OP wallet address on a campaign.

This is a project in [Next.js](https://nextjs.org/) with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Open Payments

Open Payments is an open API standard that can be implemented by account servicing entities (e.g. banks, digital wallet providers, and mobile money providers) to facilitate interoperability in the setup and completion of payments. In this tutorial we'll connect to [Rafiki.Money](https://rafiki.money/), a test wallet provider that’s part of the Interledger testnet.

## Technologies 🛠️

- [<img width="30" height="30" src="https://img.icons8.com/plasticine/30/react.png" alt="react"/> **React**](https://react.dev/), [**React-DOM**](https://www.npmjs.com/package/react-dom) and [**React icons**](https://react-icons.github.io/react-icons/)

- [<img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/30/nextjs.png" alt="nextjs"/> **Next.js 14**](https://nextjs.org/)

- [<img width="30" height="30" src="https://img.icons8.com/?size=100&id=38561&format=png&color=000000" alt="postgresql"/> **PostgreSQL**](https://www.postgresql.org/)

- [<img width="30" height="30" src="https://img.icons8.com/color/30/tailwindcss.png" alt="tailwindcss"/> **Tailwindcss**](https://tailwindcss.com/) and [**NextUI**](https://nextui.org/)

- [**Prisma**](https://www.prisma.io/)

- [<img width="30" height="30" src="https://img.icons8.com/color/30/eslint.png" alt="eslint"/> **ESLint**](https://eslint.org/)

- [**Clerk**](https://clerk.com/), is more than a sign-in-box, integrate complete user management UIs nad APIs, purpose-build for React, Next.js and the Modern Web.

- [**Docker**](https://docs.docker.com/desktop/) for setting up and running containerized applications. We're using docker for setting up and running our Postgresql database on the local machine

- [<img width="30" height="30" src="https://img.icons8.com/ios/30/prisma-orm.png" alt="prisma orm"/> **Prisma**](https://www.prisma.io/), Next-generation Node.js and TypeScript ORM. Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.

- **Zod**
  TypeScript-first schema validation with static type inference

- [**Husky**](https://typicode.github.io/husky/) + [**CommitLint**](https://commitlint.js.org/), husky is for adding git hooks and commitlint checks that the commit message is formatted a certain way.

---

## <img width="30" height="30" src="https://img.icons8.com/nolan/30/todo-list.png" alt="todo-list"/> Prerequisites

The easiest way to launch the app is using Docker. If you don't want to use docker or cannot use it you can manually install all the dependencies as shown in this guide.

- Docker Setup Prerequisites
  - The app can be run fully from Docker containers using the `docker-compose.yml` file in the root folder.
  - Download and install docker from [Mac](https://docs.docker.com/desktop/install/mac-install/), [windows](https://docs.docker.com/desktop/install/windows-install/), [linux](https://docs.docker.com/desktop/install/linux-install/)

- Manual Setup Prerequisites
  - [Node version 18.x](https://nodejs.org/en/download/).
  - Latest [PostgreSQL installation](https://www.postgresql.org/download/)
    - Download and install PostgreSQL following this [tutorial](https://www.w3schools.com/postgresql/postgresql_install.php)
    - We'll use pgadmin to create and view our DB data

---

### <img width="30" height="30" src="https://img.icons8.com/dusk/30/docker.png" alt="docker"/> Docker Setup (Recommended)

1. Cloning the repository:
   ```bash
    git clone https://github.com/interledger/uct-hackathon-2024.git
    cd uct-hackathon-2024
    ```
2. Setup `.env` file:
   - Clerk env variables
     - For the clerk variables create an account on [clerk](https://dashboard.clerk.com/sign-up?redirect_url=https%3A%2F%2Fdashboard.clerk.com%2F)
     - Get the keys from API keys on the dashboard
   - Open Payments env variables
     - Follow this tutorial [Rafiki.money](https://openpayments.dev/snippets/before-you-begin/)
     - Copy key ID and the wallet address into the `.env` file
       - NB make sure to replace the preceding $ with `https://`
     - Put the private key in the root folder i.e. uct-hackathon-2024/private.key

3. Build the images and start the app
   - Build the image
     ```bash
     docker-compose build
     ```
   - Start the containers
     ```bash
     docker-compose up
     ```
4. The app is now running on `localhost:3000`

### <img width="30" height="30" src="https://img.icons8.com/dusk/30/workstation" alt="workstation"/> Manual Setup

1. Follow steps 1 and 2 from above
2. Install the libraries:
   ```bash
   npm install
   ```
3. [Download and install](https://www.postgresql.org/download/) `postgresql`
4. [Download and install](https://www.pgadmin.org/download/) `pgadmin`
5. Setup `postgresql` using `pgadmin`
   - Open the app `pgadmin`
     - Enter a master password `e.g. 123456`
     - Click on Servers and enter your master password if asked
     - Right click on `Login/Group Roles > Create > Login/Group Roles`
     - For the name put `tippy_admin`
     - For password put `tippy`
     - On privileges select everything
     - Click save
     - Right click `Databases > Create`
     - For database name put `tippy`, and owner put `tippy_admin`

6. Setup Prisma
   ```bash
   npx prisma generate & npx prisma migrate dev
   ```

7. Start the app, running developer server:
   ```bash
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### <img width="30" height="30" src="https://img.icons8.com/color/30/command-line.png" alt="command-line"/> Useful Commands

- To view local docker containers run

```bash
docker ps -a
```

- To delete a container local docker containers run

```bash
docker rm --force container_id
```

- Run this command to get into the postgres docker container:

```bash
docker exec -it postgres_container_id bash
psql tippy tippy_admin
```

- Then run this command to show the tables:
  `\dt`

#### <img width="30" height="30" src="https://img.icons8.com/color/30/book.png" alt="book"/> Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

---

#### Deploy on Vercel

The easiest way to deploy your **Next.js** app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---
