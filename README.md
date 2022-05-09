# Sing me a song

Uma aplicação feita em NodeJS, utilizando o Prisma ORM juntamente com o Postgres.


## Rodar projeto

Rode o comando para baixar a dependências:

### `npm i`
#

Depois rode o comando:

### `npm run dev`

Lembre-se de configurar o banco de dados atraves do arquivo ".env" na raiz do projeto.
#

## Rodar os testes

Com as dependências instaladas rode o comando abaixo para criar o banco de dados de testes:

### `npx dotenv -e .env.test migrate prisma`

Com o banco criado rode o comando para popula-lo:

### `npm run seed`

Após o banco estar populado rode os testes:

### `npm run test`
#
