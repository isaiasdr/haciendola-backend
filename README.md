### Nestjs - Backend

1. Clone the proyect 
2. install the dependencies with `npm install`
3. (**Optional**) if use docker execute `docker compose up -d` in the root of the proyect or can use [neon tech](https://neon.tech/) to create a Postgres DB.
4. copy the ___.env.template___ file and create __.env__ file.
```cp .env.template .env```
5. fill the enviroment variables in the file **.env**
6. execute `npx prisma migrate dev` to run the prisma migrations
7. to run the app in development run `npm run start:dev`
8. to run the seed go to __localhost:{PORT}/api/v{API_VERSION}/seed__
9. If use Postman can import the endpoints making use of the file __Haciendola-Backend.postman_collection.json__ in the root of the proyect.