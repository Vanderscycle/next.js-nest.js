# Next.js Nest.js

Fullstack template to learn React

## Todo

* Simple rest api
* postgresDB
* add testing (backend)
* add cypress testing (frontend)
* learn more about next.js/react structure
* infrastructure (k8s) 

## Backend synopsis

Init the app from the cli, 

## References

### Frontend
* Material UI [MUI](https://mui.com/)
* MUI and Tailwind [install](https://tailwindcss.com/docs/guides/create-react-app)
* [zustand](https://github.com/pmndrs/zustand) store
* React [documentation](https://reactjs.org/docs/getting-started.html)
#### Issues
* Next.js + Tailwind [integration](https://stackoverflow.com/questions/74259178/how-can-i-apply-tailwind-css-in-app-folder-in-next-13)
* type error
```  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    ignoreBuildErrors: true,
  },```

### Backend
* [Nest.js](https://docs.nestjs.com/)
* [Fastify](https://www.fastify.io/docs/latest/)
### Issues
* connecting the db
```
// require('dotenv').config();
// https://stackoverflow.com/questions/62287709/environment-variable-with-dotenv-and-typescript
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
```
* Configuring env [management](https://docs.nestjs.com/techniques/configuration#getting-started) where I wanted to use NestJs own dotenv config `@nestjs/config` and this [tutorial](https://betterprogramming.pub/nest-js-project-with-typeorm-and-postgres-ce6b5afac3be)
* the start-db.sh should be replaced by a a more versatile
