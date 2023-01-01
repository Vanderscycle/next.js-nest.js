# Next.js Nest.js

Fullstack template to learn React

## Todo

- Simple rest api
- postgresDB
- add testing (backend)
- add cypress testing (frontend)
- learn more about next.js/react structure
- infrastructure (k8s)
- nestjs password are stored unencrypted. hash and secure them (bcrypt.js?)

## Backend synopsis

Init the app from the cli,

## References

### Frontend

- Material UI [MUI](https://mui.com/)
- MUI and Tailwind [install](https://tailwindcss.com/docs/guides/create-react-app)
- [zustand](https://github.com/pmndrs/zustand) store
- React [documentation](https://reactjs.org/docs/getting-started.html)
- [Storybook](https://storybook.js.org/docs/react/get-started/install)
- [cypress](https://docs.cypress.io/guides/overview/why-cypress)
- Vest [form confirmation](https://vestjs.dev/docs/get_started)

### Backend

- [auth/jwt](https://www.youtube.com/watch?v=_L225zpUK0M)
- [configService](https://progressivecoder.com/one-stop-guide-to-nestjs-config-environment-variables/) guide
- testing/svc [testing](https://github.com/jmcdo29/testing-nestjs/blob/main/apps/typeorm-sample/src/cat/cat.controller.spec.ts)
- adding class [ validator ](https://github.com/typestack/class-validator#inheriting-validation-decorators)

#### Issues

- Next.js + Tailwind [integration](https://stackoverflow.com/questions/74259178/how-can-i-apply-tailwind-css-in-app-folder-in-next-13)
- storybook w/ [pnpm](https://github.com/storybookjs/storybook/issues/13428) 
  * [solution](https://github.com/storybookjs/storybook/issues/13428#issuecomment-1120233741) + addition to .npmrc 
- type error
- pino logger [backend](https://www.tomray.dev/nestjs-logging)

````typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    ignoreBuildErrors: true,
  },```

### Backend
* [Nest.js](https://docs.nestjs.com/)
* [Fastify](https://www.fastify.io/docs/latest/)
### Issues
* connecting the db
````

// require('dotenv').config();
// https://stackoverflow.com/questions/62287709/environment-variable-with-dotenv-and-typescript
import \* as dotenv from 'dotenv';
dotenv.config({ path: \_\_dirname + '/.env' });

```
* Configuring env [management](https://docs.nestjs.com/techniques/configuration#getting-started) where I wanted to use NestJs own dotenv config `@nestjs/config` and this [tutorial](https://betterprogramming.pub/nest-js-project-with-typeorm-and-postgres-ce6b5afac3be)
* the start-db.sh should be replaced by a more versatile
* swagger apipropreties nott working
* esling/prettier rules
* learning about import inside [@modules](hhttps://github.com/nestjs/jwt#async-options)
* testing service/controllers in nestjs
```
