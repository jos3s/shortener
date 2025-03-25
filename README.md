# Shortener

Torne seus links mais fáceis de serem compartilhados.

## Descrição

Com o Shortener você vai poder criar versões encurtadas de qualquer link sem precisar de
contas, mas se decidir criar poderá visualizar, editar e remover os seus links encurtados.

## Tecnologias

* Nest.js
  * bcrypt
  * class-validator
  * typeorm
* Postgres
* Docker
* Jaeger

## Preparação do projeto

Primeiro baixe o repositório:

```bash
git clone https://github.com/jos3s/Shortener/
```

Entre na pasta do projeto:

```bash
cd shortener
```

E instale as dependências:

```bash
npm install
```

## Rodar o projeto localmente

```bash
npm run start:dev
```

## Rodar o projeto com docker

```bash
docker compose up --build
```

### Pontos de acesso

#### PgAdmin

Subindo o projeto com o docker, acesse `http://localhost:5050/`, entre com `admin@admin.com` e `pgadmin4`.

Configure um novo servidor, com:

* Host name/address: db
* Port: 5432
* Maintenance database: postgres
* Username: postgres
* Password: postgres

#### Jaeger UI

Acesse `http://localhost:16686/` e busque pelo serviço `shortener`

![Jaeger UI](./github_assets/jaeger.png)

## Swagger

Acesse o endereço do serviço com '/api' no final e tenha o painel do Swagger com todos os endpoints disponíveis e documentados.

![Swagger](./github_assets/swagger.png)

## Pontos de melhorias

* Utilização de variaveis de ambiente
