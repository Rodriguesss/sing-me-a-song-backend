# Sing me a song

Uma aplicação em NodeJS, utilizando o Prisma ORM juntamente com o Postgres. Para realizar os testes de integração e os teste unitarios foi utilizado o Jest.

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

Lembre-se de configurar o banco de dados atraves do arquivo ".env.test" na raiz do projeto.

Com o banco criado rode o comando para popula-lo:

### `npm run seed`

Após o banco estar populado rode os testes:

### `npm run test`
#
