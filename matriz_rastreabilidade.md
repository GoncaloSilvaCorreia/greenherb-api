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

### Classes de Equivalência — Sprint 1

| Parâmetro | Classe Válida | Classe Inválida |
|-----------|--------------|-----------------|
| username (registo) | String não vazia e única | Vazio ("") ou duplicado |
| password (registo) | String não vazia | Vazia ("") |
| role | "Tecnico", "Responsavel", "Administrador" | Qualquer outro valor |
| username (login) | String não vazia e existente | Vazio ("") ou inexistente |
| password (login) | Password correta | Vazia ("") ou errada |
| refreshToken | Token JWT válido | Token inválido ou expirado |

### Cobertura — Sprint 1

| Métrica | Valor |
|---------|-------|
| Cobertura de instruções | 97.82% |
| Cobertura de ramos | 96.42% |
| Cobertura de funções | 100% |
| Cobertura de linhas | 97.67% |
| Total de testes | 14 |
| Testes passados | 14 |

---

## Sprint 2 — Ervas Aromáticas (/herbs) e Planos de Cultivo (/plans)

### Ervas Aromáticas

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU15 | RN-05: criação de erva com dados válidos | `POST /herbs` | Unidade | PE (classe válida) | `{ name: "Hortelã", scientificName: "Mentha spicata", cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 }` | Erva criada com id definido | Nenhuma |
| TU16 | RN-05: nome vazio rejeitado | `POST /herbs` | Unidade | PE (classe inválida) | `{ name: "", ... }` | Erro: "Nome inválido" | Nenhuma |
| TU17 | RN-05: nome científico vazio rejeitado | `POST /herbs` | Unidade | PE (classe inválida) | `{ scientificName: "", ... }` | Erro: "Nome científico inválido" | Nenhuma |
| TU18 | RN-05: temp. mínima > máxima rejeitada | `POST /herbs` | Unidade | PE (classe inválida) | `{ minTemp: 30, maxTemp: 25, ... }` | Erro: "Temperatura inválida" | Nenhuma |
| TU19 | RN-05: humidade mínima > máxima rejeitada | `POST /herbs` | Unidade | PE (classe inválida) | `{ minHumidity: 80, maxHumidity: 50, ... }` | Erro: "Humidade inválida" | Nenhuma |
| TU20 | RN-06: cycledays = 0 (abaixo do limite) | `POST /herbs` | Unidade | VL (abaixo limite inferior) | `{ cycledays: 0, ... }` | Erro: "Duração do ciclo inválida" | Nenhuma |
| TU21 | RN-06: cycledays = 1 (limite inferior) | `POST /herbs` | Unidade | VL (limite inferior) | `{ cycledays: 1, ... }` | Erva criada com cycledays = 1 | Nenhuma |
| TU22 | RN-06: cycledays = 90 (valor nominal) | `POST /herbs` | Unidade | VL (valor nominal) | `{ cycledays: 90, ... }` | Erva criada com cycledays = 90 | Nenhuma |
| TU23 | RN-06: cycledays = 365 (limite superior) | `POST /herbs` | Unidade | VL (limite superior) | `{ cycledays: 365, ... }` | Erva criada com cycledays = 365 | Nenhuma |
| TU24 | RN-06: cycledays = 366 (acima do limite) | `POST /herbs` | Unidade | VL (acima limite superior) | `{ cycledays: 366, ... }` | Erro: "Duração do ciclo inválida" | Nenhuma |
| TU25 | RN-07: importação com ficheiro vazio | `POST /herbs/import` | Unidade | PE (classe inválida) | `[]` | Erro: "Ficheiro vazio" | Nenhuma |
| TU26 | RN-07: importação com linhas válidas | `POST /herbs/import` | Unidade | PE (classe válida) | 2 linhas válidas | `{ success: 2, failed: 0 }` | Nenhuma |
| TU27 | RN-07: importação com linhas mistas | `POST /herbs/import` | Unidade | PE (classe mista) | 1 válida + 1 inválida | `{ success: 1, failed: 1 }` | Nenhuma |
| TU28 | RN-07: importação com todas inválidas | `POST /herbs/import` | Unidade | PE (classe inválida) | 1 linha inválida | `{ success: 0, failed: 1 }` | Nenhuma |

### Planos de Cultivo

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU29 | RN-08: plano regular válido | `POST /plans` | Unidade | PE (classe válida) | `{ type: "regular", ... }` | Plano criado com type = "regular" | Nenhuma |
| TU30 | RN-08: plano emergencia válido | `POST /plans` | Unidade | PE (classe válida) | `{ type: "emergencia", ... }` | Plano criado com type = "emergencia" | Nenhuma |
| TU31 | RN-08: plano pontual com autorização | `POST /plans` | Unidade | PE (classe válida) | `{ type: "pontual", authorizedBy: "responsavel1", ... }` | Plano criado com authorizedBy definido | Nenhuma |
| TU32 | RN-08: plano pontual sem autorização | `POST /plans` | Unidade | PE (classe inválida) | `{ type: "pontual", authorizedBy: null, ... }` | Erro: "Plano pontual requer autorização do Responsável Técnico" | Nenhuma |
| TU33 | RN-08: tipo inválido rejeitado | `POST /plans` | Unidade | PE (classe inválida) | `{ type: "invalido", ... }` | Erro: "Tipo de plano inválido" | Nenhuma |
| TU34 | RN-09: temperatura = 17 (abaixo do limite) | `POST /plans` | Unidade | VL (abaixo limite inferior) | `{ minTemp: 17, ... }` | Erro: "Temperatura fora dos limites" | Nenhuma |
| TU35 | RN-09: temperatura = 18 (limite inferior) | `POST /plans` | Unidade | VL (limite inferior) | `{ minTemp: 18, ... }` | Plano criado com minTemp = 18 | Nenhuma |
| TU36 | RN-09: temperatura nominal = 23 | `POST /plans` | Unidade | VL (valor nominal) | `{ maxTemp: 23, ... }` | Plano criado com maxTemp = 23 | Nenhuma |
| TU37 | RN-09: temperatura = 28 (limite superior) | `POST /plans` | Unidade | VL (limite superior) | `{ maxTemp: 28, ... }` | Plano criado com maxTemp = 28 | Nenhuma |
| TU38 | RN-09: temperatura = 29 (acima do limite) | `POST /plans` | Unidade | VL (acima limite superior) | `{ maxTemp: 29, ... }` | Erro: "Temperatura fora dos limites" | Nenhuma |
| TU39 | RN-10: humidade = 39 (abaixo do limite) | `POST /plans` | Unidade | VL (abaixo limite inferior) | `{ minHumidity: 39, ... }` | Erro: "Humidade fora dos limites" | Nenhuma |
| TU40 | RN-10: humidade = 40 (limite inferior) | `POST /plans` | Unidade | VL (limite inferior) | `{ minHumidity: 40, ... }` | Plano criado com minHumidity = 40 | Nenhuma |
| TU41 | RN-10: humidade nominal = 60 | `POST /plans` | Unidade | VL (valor nominal) | `{ maxHumidity: 60, ... }` | Plano criado com maxHumidity = 60 | Nenhuma |
| TU42 | RN-10: humidade = 80 (limite superior) | `POST /plans` | Unidade | VL (limite superior) | `{ maxHumidity: 80, ... }` | Plano criado com maxHumidity = 80 | Nenhuma |
| TU43 | RN-10: humidade = 81 (acima do limite) | `POST /plans` | Unidade | VL (acima limite superior) | `{ maxHumidity: 81, ... }` | Erro: "Humidade fora dos limites" | Nenhuma |
| TU44 | RN-11: luminosidade = 4999 (abaixo do limite) | `POST /plans` | Unidade | VL (abaixo limite inferior) | `{ minLuminosity: 4999, ... }` | Erro: "Luminosidade fora dos limites" | Nenhuma |
| TU45 | RN-11: luminosidade = 5000 (limite inferior) | `POST /plans` | Unidade | VL (limite inferior) | `{ minLuminosity: 5000, ... }` | Plano criado com minLuminosity = 5000 | Nenhuma |
| TU46 | RN-11: luminosidade nominal = 15000 | `POST /plans` | Unidade | VL (valor nominal) | `{ maxLuminosity: 15000, ... }` | Plano criado com maxLuminosity = 15000 | Nenhuma |
| TU47 | RN-11: luminosidade = 25000 (limite superior) | `POST /plans` | Unidade | VL (limite superior) | `{ maxLuminosity: 25000, ... }` | Plano criado com maxLuminosity = 25000 | Nenhuma |
| TU48 | RN-11: luminosidade = 25001 (acima do limite) | `POST /plans` | Unidade | VL (acima limite superior) | `{ maxLuminosity: 25001, ... }` | Erro: "Luminosidade fora dos limites" | Nenhuma |
| TU49 | RN-12: cycleDays = 0 (abaixo do limite) | `POST /plans` | Unidade | VL (abaixo limite inferior) | `{ cycleDays: 0, ... }` | Erro: "Duração do ciclo inválida" | Nenhuma |
| TU50 | RN-12: cycleDays = 1 (limite inferior) | `POST /plans` | Unidade | VL (limite inferior) | `{ cycleDays: 1, ... }` | Plano criado com cycleDays = 1 | Nenhuma |
| TU51 | RN-12: cycleDays = 90 (valor nominal) | `POST /plans` | Unidade | VL (valor nominal) | `{ cycleDays: 90, ... }` | Plano criado com cycleDays = 90 | Nenhuma |
| TU52 | RN-12: cycleDays = 365 (limite superior) | `POST /plans` | Unidade | VL (limite superior) | `{ cycleDays: 365, ... }` | Plano criado com cycleDays = 365 | Nenhuma |
| TU53 | RN-12: cycleDays = 366 (acima do limite) | `POST /plans` | Unidade | VL (acima limite superior) | `{ cycleDays: 366, ... }` | Erro: "Duração do ciclo inválida" | Nenhuma |

### Cobertura de Condições Múltiplas — Sprint 2

#### Decisão: Validação do plano pontual
**Expressão lógica:** `if (type === 'pontual' && !authorizedBy)`

**Condições atómicas:**
- C1: `type === 'pontual'`
- C2: `!authorizedBy` (sem autorização)

**Tabela de verdade completa (2² = 4 linhas):**

| Linha | C1 (é pontual) | C2 (sem autorização) | C1 && C2 | Resultado | Caso de Teste |
|-------|---------------|---------------------|----------|-----------|---------------|
| 1 | F | F | F | Aceita | TU54 |
| 2 | F | T | F | Aceita | TU55 |
| 3 | T | F | F | Aceita | TU56 |
| 4 | T | T | T | Rejeita | TU57 |

**Justificação MC/DC:**
- C1 afeta o resultado isoladamente: linha 3 (T,F)=aceita vs linha 4 (T,T)=rejeita
- C2 afeta o resultado isoladamente: linha 2 (F,T)=aceita vs linha 4 (T,T)=rejeita

**Subconjunto mínimo MC/DC:** TU55, TU56, TU57

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU54 | RN-08: C1=F, C2=F (regular + autorização) | `POST /plans` | Unidade | CM (linha 1) | `{ type: "regular", authorizedBy: "responsavel1", ... }` | Plano criado com sucesso | Nenhuma |
| TU55 | RN-08: C1=F, C2=T (regular + sem autorização) | `POST /plans` | Unidade | CM (linha 2) | `{ type: "regular", authorizedBy: null, ... }` | Plano criado com sucesso | Nenhuma |
| TU56 | RN-08: C1=T, C2=F (pontual + autorização) | `POST /plans` | Unidade | CM (linha 3) | `{ type: "pontual", authorizedBy: "responsavel1", ... }` | Plano criado com sucesso | Nenhuma |
| TU57 | RN-08: C1=T, C2=T (pontual + sem autorização) | `POST /plans` | Unidade | CM (linha 4) | `{ type: "pontual", authorizedBy: null, ... }` | Erro: "Plano pontual requer autorização" | Nenhuma |

### Classes de Equivalência — Sprint 2

| Parâmetro | Classe Válida | Classe Inválida |
|-----------|--------------|-----------------|
| name (erva) | String não vazia | Vazio ("") |
| scientificName | String não vazia | Vazio ("") |
| cycledays | [1, 365] | < 1 ou > 365 |
| type (plano) | "regular", "emergencia", "pontual" | Qualquer outro valor |
| authorizedBy (pontual) | String não vazia | null ou vazio |
| Linhas CSV | Todas as colunas válidas | Coluna obrigatória em falta ou inválida |

### Valores Limite — Sprint 2

| Parâmetro | Intervalo | Abaixo | Limite Inf. | Nominal | Limite Sup. | Acima |
|-----------|-----------|--------|-------------|---------|-------------|-------|
| cycledays (ervas) | [1, 365] | 0 | 1 | 90 | 365 | 366 |
| Temperatura (ºC) | [18, 28] | 17 | 18 | 23 | 28 | 29 |
| Humidade (%) | [40, 80] | 39 | 40 | 60 | 80 | 81 |
| Luminosidade (lux) | [5000, 25000] | 4999 | 5000 | 15000 | 25000 | 25001 |
| cycleDays (planos) | [1, 365] | 0 | 1 | 90 | 365 | 366 |

### Cobertura — Sprint 2

| Ficheiro | Instruções | Ramos | Funções | Linhas |
|----------|-----------|-------|---------|--------|
| authService.js | 97.82% | 96.42% | 100% | 97.67% |
| herbsService.js | 93.54% | 96.77% | 75% | 96.66% |
| plansService.js | 100% | 100% | 100% | 100% |
| **Total (services)** | **96.87%** | **97.67%** | **90.9%** | **97.82%** |
| **Testes passados** | **57/57** | | | |

---

## Tabela Inversa — Requisito → Casos de Teste

| Requisito | Descrição | Casos de Teste |
|-----------|-----------|---------------|
| RN-01 | Perfis válidos de registo | TU01, TU02, TU03, TU04 |
| RN-02 | Validação de username e password | TU05, TU06, TU07 |
| RN-03 | Autenticação por credenciais | TU08, TU09, TU10, TU11, TU12 |
| RN-04 | Renovação de token | TU13, TU14 |
| RN-05 | Criação de erva aromática | TU15, TU16, TU17, TU18, TU19 |
| RN-06 | Duração do ciclo de erva | TU20, TU21, TU22, TU23, TU24 |
| RN-07 | Importação CSV de ervas | TU25, TU26, TU27, TU28 |
| RN-08 | Tipo de plano e autorização pontual | TU29, TU30, TU31, TU32, TU33, TU54, TU55, TU56, TU57 |
| RN-09 | Temperatura do plano | TU34, TU35, TU36, TU37, TU38 |
| RN-10 | Humidade do plano | TU39, TU40, TU41, TU42, TU43 |
| RN-11 | Luminosidade do plano | TU44, TU45, TU46, TU47, TU48 |
| RN-12 | Duração do ciclo do plano | TU49, TU50, TU51, TU52, TU53 |