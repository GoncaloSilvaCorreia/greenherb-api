# GREENHERB API

API REST para a plataforma de gestão inteligente de estufa GREENHERB.

## Requisitos

- [Node.js](https://nodejs.org) (versão LTS)
- npm (incluído com o Node.js)

## Instalação

1. Clona o repositório:
git clone https://github.com/GoncaloSilvaCorreia/greenherb-api.git
cd greenherb-api


2. Instala as dependências:
npm install


3. Cria o ficheiro `.env` na raiz do projeto com o seguinte conteúdo:
JWT_SECRET=greenherb_secret
PORT=3000


## Correr os Testes

```bash
npx jest --coverage
```

## Estrutura do Projeto
greenherb-api/
├── src/
│   ├── controllers/    # Controladores dos endpoints
│   ├── middleware/     # Middleware de autenticação
│   ├── routes/         # Rotas da API
│   └── services/       # Lógica de negócio
├── tests/
│   └── unit/           # Testes de unidade
├── matriz_rastreabilidade.md
├── package.json
└── .gitignore

## Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /auth/register | Registo de utilizador |
| POST | /auth/login | Login e obtenção de token |
| POST | /auth/refresh | Renovação de token |

## Sprint 1 — Concluído

- ✅ Endpoints de autenticação (/auth)
- ✅ Testes de unidade (10 testes, 97% cobertura)
- ✅ Matriz de rastreabilidade
