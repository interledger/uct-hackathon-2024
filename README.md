# Tippy

A simple [Next.js](https://nextjs.org/) tutorial project that for creators to publish fundraising campaigns. They can receive donations through [OP (Open Payments)](https://openpayments.dev/) by inserting their OP wallet address on a campaign.

This is a project in [Next.js](https://nextjs.org/) with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Open Payments

Open Payments is an open API standard that can be implemented by account servicing entities (e.g. banks, digital wallet providers, and mobile money providers) to facilitate interoperability in the setup and completion of payments. In this tutorial we'll connect to [Rafiki.Money](https://rafiki.money/), a test wallet provider that’s part of the Interledger testnet.

1. Client Keys

- Create an account on Rafiki.Money by following this [setup](https://openpayments.dev/snippets/before-you-begin/)

2. Insert the environment variables for Open Payments into the .env file

- Put the private.key file in the root folder
- Copy your client's address and insert in the variable OPEN_PAYMENTS_CLIENT_ADDRESS
- Copy your privat key ID and insert in the variable OPEN_PAYMENTS_KEY_ID

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

---

## <img width="30" height="30" src="https://img.icons8.com/nolan/30/todo-list.png" alt="todo-list"/> Prerequisites

- Node version 18.x. I used 21.\*

- Docker desktop - [Mac](https://docs.docker.com/desktop/install/mac-install/), [windows](https://docs.docker.com/desktop/install/windows-install/), [linux](https://docs.docker.com/desktop/install/linux-install/)

---

---

### <img width="30" height="30" src="https://img.icons8.com/dusk/30/workstation.png" alt="workstation"/> Getting Started

1. Cloning the repository:

```BASH
git clone https://github.com/interledger/uct-hackathon-2024.git
```

And put inside the root folder

2. After clonining the GitHub repository and install all the dependencies with:

```BASH
npm install
#or
npm i
```

3. Setup `.env` file:

- For the clerk variables create an account on [clerk](https://clerk.com/)
- Get the keys from API keys on the dashboard

```
# Postgres
DATABASE_URL="postgresql://tippy_admin:tippy@localhost:5432/tippy"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/profile"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/profile"
```

4. Setup Postgresql

```bash
docker-compose up -d
```

5. Setup Prisma

```BASH
npx prisma generate
npx prisma migrate dev
```

6. Start the app, running developer server:

```BASH
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

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
