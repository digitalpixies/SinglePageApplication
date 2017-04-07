# SinglePageApplication

# Example CRUD Interface with a REST API

In this example we use the following:

- Pagination
- Table
- Create Read Edit and Delete
- REST using Express
- Serving Yeoman from Express static folder
- Express REST stores data into Sqlite

## Installation

checkout this branch

```sh
git clone -b CRUDUser https://github.com/digitalpixies/SinglePageApplication
```

## Usage

The following will serve yeoman from Yeoman's native http and Express for the api.

```sh
grunt serve-from-yeoman
```

The following is the standard way to build Yeoman's SPA, transfer it into Express and run from Express

```sh
grunt serve
```

## Deploy

```sh
grunt build
```
