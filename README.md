## Installation

Ejecutar
```sh
cd dillinger
npm i
docker-compose up -d
touch .env
```
Agregar al .env:
```
NODE_ENV="development"
DATABASE_URL="postgresql://postgres:secure_pass_here@localhost:5432/postgres?schema=public&connection_limit=1"
```

Ejecutar
```sh
npm install -g npx
npx prisma migrate dev --preview-feature
npx prisma generate
npm run dev
npm run test
```

Documentacion:
https://documenter.getpostman.com/view/2274977/UVR4NVi4

Coleccion postman:
/muncher.postman_collection.json