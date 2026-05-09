# Matriz de Rastreabilidade — GREENHERB

## Sprint 1 — Autenticação (/auth)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU01 | RN-01: perfil válido Tecnico | `POST /auth/register` | Unidade | PE (classe válida) | `{ username: "joao", password: "123456", role: "Tecnico" }` | 201 - `{ id: 1, username: "joao", role: "Tecnico" }` | Nenhuma |
| TU02 | RN-01: perfil válido Responsavel | `POST /auth/register` | Unidade | PE (classe válida) | `{ username: "maria", password: "123456", role: "Responsavel" }` | 201 - `{ id: 1, username: "maria", role: "Responsavel" }` | Nenhuma |
| TU03 | RN-01: perfil válido Administrador | `POST /auth/register` | Unidade | PE (classe válida) | `{ username: "admin", password: "123456", role: "Administrador" }` | 201 - `{ id: 1, username: "admin", role: "Administrador" }` | Nenhuma |
| TU04 | RN-01: perfil inválido rejeitado | `POST /auth/register` | Unidade | PE (classe inválida) | `{ username: "joao", password: "123456", role: "Hacker" }` | Erro: "Perfil inválido" | Nenhuma |
| TU05 | RN-02: username duplicado rejeitado | `POST /auth/register` | Unidade | PE (classe inválida) | `{ username: "joao", password: "outrapass", role: "Tecnico" }` | Erro: "Utilizador já existe" | Utilizador "joao" já registado |
| TU06 | RN-02: username vazio rejeitado | `POST /auth/register` | Unidade | PE (classe inválida) | `{ username: "", password: "123456", role: "Tecnico" }` | Erro: "Username inválido" | Nenhuma |
| TU07 | RN-02: password vazia rejeitada | `POST /auth/register` | Unidade | PE (classe inválida) | `{ username: "joao", password: "", role: "Tecnico" }` | Erro: "Password inválida" | Nenhuma |
| TU08 | RN-03: credenciais válidas | `POST /auth/login` | Unidade | PE (classe válida) | `{ username: "joao", password: "123456" }` | 200 - `{ token: "...", refreshToken: "..." }` | Utilizador "joao" registado |
| TU09 | RN-03: username inexistente | `POST /auth/login` | Unidade | PE (classe inválida) | `{ username: "desconhecido", password: "123456" }` | Erro: "Credenciais inválidas" | Nenhuma |
| TU10 | RN-03: username vazio | `POST /auth/login` | Unidade | PE (classe inválida) | `{ username: "", password: "123456" }` | Erro: "Username inválido" | Nenhuma |
| TU11 | RN-03: password errada | `POST /auth/login` | Unidade | PE (classe inválida) | `{ username: "joao", password: "passworderrada" }` | Erro: "Credenciais inválidas" | Utilizador "joao" registado |
| TU12 | RN-03: password vazia | `POST /auth/login` | Unidade | PE (classe inválida) | `{ username: "joao", password: "" }` | Erro: "Password inválida" | Utilizador "joao" registado |
| TU13 | RN-04: refresh com token válido | `POST /auth/refresh` | Unidade | PE (classe válida) | `{ refreshToken: "<token válido>" }` | 200 - `{ token: "<novo token>" }` | Utilizador registado e logado |
| TU14 | RN-04: refresh com token inválido | `POST /auth/refresh` | Unidade | PE (classe inválida) | `{ refreshToken: "token_invalido" }` | Erro: "Refresh token inválido" | Nenhuma |

## Classes de Equivalência Identificadas

| Parâmetro | Classe Válida | Classe Inválida |
|-----------|--------------|-----------------|
| username (registo) | String não vazia e única | Vazio ("") ou duplicado |
| password (registo) | String não vazia | Vazia ("") |
| role | "Tecnico", "Responsavel", "Administrador" | Qualquer outro valor |
| username (login) | String não vazia e existente | Vazio ("") ou inexistente |
| password (login) | Password correta | Vazia ("") ou errada |
| refreshToken | Token JWT válido | Token inválido ou expirado |

## Cobertura Obtida — Sprint 1

| Métrica | Valor |
|---------|-------|
| Cobertura de instruções | 97.36% |
| Cobertura de ramos | 91.66% |
| Cobertura de funções | 100% |
| Cobertura de linhas | 97.14% |
| Total de testes | 14 |
| Testes passados | 14 |

## Tabela Inversa — Requisito → Casos de Teste

| Requisito | Casos de Teste |
|-----------|---------------|
| RN-01: perfis válidos de registo | TU01, TU02, TU03, TU04 |
| RN-02: validação de username e password | TU05, TU06, TU07 |
| RN-03: autenticação por credenciais | TU08, TU09, TU10, TU11, TU12 |
| RN-04: renovação de token | TU13, TU14 |