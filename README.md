# ⚡ API Demo — Fastify Boilerplate

> Boilerplate para APIs em **Node.js** com **Fastify**, **TypeScript** e **Zod** — pronto para clonar e começar um projeto novo.

<p align="left">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Fastify" src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" />
  <img alt="Biome" src="https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white" />
</p>

---

## ✨ Recursos

- 🚀 **Fastify 5** — servidor HTTP rápido e de baixo overhead
- 🔒 **Type-safe de ponta a ponta** com `fastify-type-provider-zod`
- ✅ **Validação de variáveis de ambiente** com Zod (falha cedo se algo estiver errado)
- 📖 **Documentação automática** via Swagger + [Scalar API Reference](https://github.com/scalar/scalar) em `/docs`
- 🧯 **Tratamento global de erros** padronizado (validação, regra de negócio, 404, upload grande, 500)
- 🔑 **JWT** (`@fastify/jwt`) com suporte a cookie
- 🍪 **Cookies** (`@fastify/cookie`)
- 🌐 **CORS** (`@fastify/cors`)
- 📎 **Upload de arquivos** (`@fastify/multipart`, limite de 5MB)
- 🎨 **Biome** para lint e formatação
- 🗂️ **Path alias** `@/*` apontando para `src/*`

---

## 🛠️ Stack

| Categoria       | Tecnologia                                             |
| --------------- | ------------------------------------------------------ |
| Runtime         | Node.js                                                |
| Framework       | Fastify 5                                              |
| Linguagem       | TypeScript                                             |
| Validação       | Zod                                                    |
| Documentação    | Swagger + Scalar API Reference                         |
| Lint / Format   | Biome                                                  |
| Package manager | pnpm                                                   |

---

## 📁 Estrutura do projeto

```
src/
└── http/
    ├── _errors/
    │   ├── schemas/
    │   │   └── error-responses.ts   # schemas Zod de resposta de erro
    │   ├── bad-request.ts           # BadRequestError
    │   ├── not-found.ts             # NotFoundError
    │   ├── unauthorized.ts          # UnauthorizedError
    │   └── index.ts                 # errorHandler global
    ├── app.ts                       # instância do Fastify + plugins
    ├── env.ts                       # validação das variáveis de ambiente
    └── server.ts                    # bootstrap / listen
```

---

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [pnpm](https://pnpm.io/)

### Instalação

```bash
# 1. Clone o repositório
git clone git@github.com:hfmelodev/api-demo.git
cd api-demo

# 2. Instale as dependências
pnpm install

# 3. Crie o arquivo de variáveis de ambiente
cp .env.example .env

# 4. Rode em modo de desenvolvimento
pnpm dev
```

O servidor sobe em **`http://localhost:3333`** e a documentação fica disponível em **`http://localhost:3333/docs`**.

---

## 🔧 Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste conforme necessário:

| Variável            | Descrição                                   | Exemplo         |
| ------------------- | ------------------------------------------- | --------------- |
| `NODE_ENV`          | Ambiente de execução (`dev` \| `production`)| `dev`           |
| `API_PORT`          | Porta em que a API vai rodar                | `3333`          |
| `TOKEN_COOKIE_NAME` | Nome do cookie que armazena o token         | `@my-token`     |
| `JWT_SECRET`        | Segredo usado para assinar os tokens JWT    | `my-secret-jwt` |

> As variáveis são validadas na inicialização em [`src/http/env.ts`](src/http/env.ts). Se algo estiver faltando ou inválido, a aplicação não sobe.

---

## 📜 Scripts

| Comando    | Descrição                                       |
| ---------- | ----------------------------------------------- |
| `pnpm dev` | Inicia o servidor em modo watch com `tsx`       |

---

## 🧯 Tratamento de erros

Todas as respostas de erro seguem o formato `{ message }`, tratadas de forma centralizada em [`src/http/_errors/index.ts`](src/http/_errors/index.ts):

| Situação                                   | Status | Resposta                                                  |
| ------------------------------------------ | :----: | --------------------------------------------------------- |
| Falha de validação (Zod)                   |  400   | `{ message, errors: [{ field, message }] }`               |
| Regra de negócio (`BadRequestError`)       |  400   | `{ message }`                                             |
| Não autenticado (`UnauthorizedError`)      |  401   | `{ message }`                                             |
| Recurso não encontrado (`NotFoundError`)   |  404   | `{ message }`                                             |
| Rota inexistente                           |  404   | `{ message }`                                             |
| Upload acima do limite (5MB)               |  413   | `{ message }`                                             |
| Erro interno                               |  500   | `{ message }`                                             |

---

## 👤 Autor

**Hilquias Ferreira Melo**
[GitHub](https://github.com/hfmelodev)

---

## 📄 Licença

Distribuído sob a licença **ISC**.
