# React Express JWT

A boilerplate for fullstack projects written in React, Express and MongoDb.

## Install project

Create a `.env` file at the root of the project, and add:

```
PORT=5005
ORIGIN=http://localhost:3000

MONGODB_URI=mongodb://localhost/name-of-db

EMAIL=address@gmail.com
WORD=password

TOKEN_SECRET=T0kEnSecREt
```

Then run `npm install` at the root of the project. Since we're using [Concurrently](https://www.npmjs.com/package/concurrently) this will install packages for backend and frontend.

## Run project

Run `npm run dev` at the root of the project. Once again, thanks to Concurrently, backend and frontend will run at the same time.

## Packages

### Backend

-   [Express](https://expressjs.com/)
-   [Express JWT](https://www.npmjs.com/package/express-jwt)
-   [JSON web token](https://jwt.io/)
-   [Bcrypt js](https://www.npmjs.com/package/bcryptjs)
-   [Mongoose](https://mongoosejs.com/)
-   [Nodemailer](https://nodemailer.com/about/)
-   [JS utils](https://www.npmjs.com/package/js-utils-julseb): own package, with basic functions written in JavaScript

### Frontend

-   [React](https://reactjs.org/)
-   [Axios](https://axios-http.com/docs/intro)
-   [Styled components](https://styled-components.com/)
-   [TSX library](https://documentation-components-react.vercel.app/): own package, with basic React UI components
-   [JS utils](https://www.npmjs.com/package/js-utils-julseb)

## Backend

### API

All the functions can be found in the `routes` folder.

### Models

All the models can be found in `models` folder.

### Create data

Find an example for adding bulk data inside a database in `db/seed.js`.

## Frontend

### API

For backend calls, use the folder `client/src/api`, and follow the same pattern. You can see an example on the page `client/src/pages/auth/Login.js`.

### Add pages

Create your pages in `client/src/pages`. Then, go to `client/src/routes/routes.js` and add them in the array `const routes`.

### Styling

Most of components come from `TSX library` package. If you need new components, you can add them in `client/src/components`.
