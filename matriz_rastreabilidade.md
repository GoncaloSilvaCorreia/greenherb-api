# Matriz de Rastreabilidade — GREENHERB

## Sprint 1 — Autenticação (/auth)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU01 | RN-01: registo com perfil válido Tecnico | `POST /auth/register` | Unidade | Particionamento de Equivalência (classe válida) | `{ username: "joao", password: "123456", role: "Tecnico" }` | 201 - `{ id: 1, username: "joao", role: "Tecnico" }` | Nenhuma |
| TU02 | RN-01: registo com perfil válido Responsavel | `POST /auth/register` | Unidade | Particionamento de Equivalência (classe válida) | `{ username: "maria", password: "123456", role: "Responsavel" }` | 201 - `{ id: 1, username: "maria", role: "Responsavel" }` | Nenhuma |
| TU03 | RN-01: registo com perfil válido Administrador | `POST /auth/register` | Unidade | Particionamento de Equivalência (classe válida) | `{ username: "admin", password: "123456", role: "Administrador" }` | 201 - `{ id: 1, username: "admin", role: "Administrador" }` | Nenhuma |
| TU04 | RN-01: perfil inválido rejeitado | `POST /auth/register` | Unidade | Particionamento de Equivalência (classe inválida) | `{ username: "joao", password: "123456", role: "Hacker" }` | Erro: "Perfil inválido" | Nenhuma |
| TU05 | RN-02: utilizador duplicado rejeitado | `POST /auth/register` | Unidade | Particionamento de Equivalência (classe inválida) | `{ username: "joao", password: "outrapass", role: "Tecnico" }` | Erro: "Utilizador já existe" | Utilizador "joao" já registado |
| TU06 | RN-03: login com credenciais válidas | `POST /auth/login` | Unidade | Particionamento de Equivalência (classe válida) | `{ username: "joao", password: "123456" }` | 200 - `{ token: "...", refreshToken: "..." }` | Utilizador "joao" registado |
| TU07 | RN-03: login com username inexistente | `POST /auth/login` | Unidade | Particionamento de Equivalência (classe inválida) | `{ username: "desconhecido", password: "123456" }` | Erro: "Credenciais inválidas" | Nenhuma |
| TU08 | RN-03: login com password errada | `POST /auth/login` | Unidade | Particionamento de Equivalência (classe inválida) | `{ username: "joao", password: "passworderrada" }` | Erro: "Credenciais inválidas" | Utilizador "joao" registado |
| TU09 | RN-04: refresh com token válido | `POST /auth/refresh` | Unidade | Particionamento de Equivalência (classe válida) | `{ refreshToken: "<token válido>" }` | 200 - `{ token: "<novo token>" }` | Utilizador registado e logado |
| TU10 | RN-04: refresh com token inválido | `POST /auth/refresh` | Unidade | Particionamento de Equivalência (classe inválida) | `{ refreshToken: "token_invalido" }` | Erro: "Refresh token inválido" | Nenhuma |

## Cobertura Obtida — Sprint 1

| Métrica | Valor |
|---------|-------|
| Cobertura de instruções | 97.36% |
| Cobertura de ramos | 91.66% |
| Cobertura de funções | 100% |
| Cobertura de linhas | 97.14% |
| Total de testes | 10 |
| Testes passados | 10 |

## Tabela Inversa — Requisito → Casos de Teste

| Requisito | Casos de Teste |
|-----------|---------------|
| RN-01: perfis válidos de registo | TU01, TU02, TU03, TU04 |
| RN-02: utilizador duplicado | TU05 |
| RN-03: autenticação por credenciais | TU06, TU07, TU08 |
| RN-04: renovação de token | TU09, TU10 |