# Electricity Billing System API

This is a a RESTful API for an electricity billing system using Node.js, Express, and Postgres. The API allows users to create, read, update, and delete data from the database. The API also allows users to search for data in the database using a specific ID.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

Connect to the database by creating a .env file in the root directory and add the following:

```env
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
PORT=3000
```

## Database

The database is hosted on [Render](https://render.com/). It has a Postgres database service. The database is connected to the API using node package [pg](https://www.npmjs.com/package/pg)

## Usage

```bash
node index.js
```

## API

### GET

#### Users

```uri
/users
```

```uri
/users/:id
```

#### Bills

```uri
/bills
```

```uri
/bills/:id
```

#### Bill Status

```uri
/billstatus
```

```uri
/billstatus/:id
```

#### Complaints

```uri
/complaint
```

```uri
/complaint/:id
```

#### Admin

```uri
/admin
```

```uri
/admin/:id
```

### POST

```uri
/users
```

```uri
/bills
```

```uri
/billstatus
```

```uri
/complaint
```

```uri
/admin
```

### PUT

```uri
/users/:id
```

```uri
/bills/:id
```

```uri
/billstatus/:id
```

```uri
/complaint/:id
```

```uri
/admin/:id
```

### DELETE

```uri
/users/:id
```

```uri
/bills/:id
```

```uri
/billstatus/:id
```

```uri
/complaint/:id
```

```uri
/admin/:id
```

