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

## Sprint 3 — Medições, Alertas, Lotes e Automação

### Medições (/measurements)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU79 | RN-13: medição válida criada | `POST /measurements` | Unidade | PE (classe válida) | `{ temp: 23, humidity: 60, luminosity: 15000, batchId: 1 }` | Medição criada com id definido | Nenhuma |
| TU80 | RN-13: temperatura NaN rejeitada | `POST /measurements` | Unidade | PE (classe inválida) | `{ temp: NaN, ... }` | Erro: "Temperatura inválida" | Nenhuma |
| TU81 | RN-13: humidade NaN rejeitada | `POST /measurements` | Unidade | PE (classe inválida) | `{ humidity: NaN, ... }` | Erro: "Humidade inválida" | Nenhuma |
| TU82 | RN-13: luminosidade NaN rejeitada | `POST /measurements` | Unidade | PE (classe inválida) | `{ luminosity: NaN, ... }` | Erro: "Luminosidade inválida" | Nenhuma |
| TU83 | RN-13: sem lote rejeitado | `POST /measurements` | Unidade | PE (classe inválida) | `{ batchId: null, ... }` | Erro: "Lote inválido" | Nenhuma |
| TU84 | RN-14: temperatura = -51 (abaixo do limite) | `POST /measurements` | Unidade | VL (abaixo limite inferior) | `{ temp: -51, ... }` | Erro: "Temperatura fora do intervalo aceitável" | Nenhuma |
| TU85 | RN-14: temperatura = -50 (limite inferior) | `POST /measurements` | Unidade | VL (limite inferior) | `{ temp: -50, ... }` | Medição criada com temperature = -50 | Nenhuma |
| TU86 | RN-14: temperatura = 23 (valor nominal) | `POST /measurements` | Unidade | VL (valor nominal) | `{ temp: 23, ... }` | Medição criada com temperature = 23 | Nenhuma |
| TU87 | RN-14: temperatura = 100 (limite superior) | `POST /measurements` | Unidade | VL (limite superior) | `{ temp: 100, ... }` | Medição criada com temperature = 100 | Nenhuma |
| TU88 | RN-14: temperatura = 101 (acima do limite) | `POST /measurements` | Unidade | VL (acima limite superior) | `{ temp: 101, ... }` | Erro: "Temperatura fora do intervalo aceitável" | Nenhuma |
| TU89 | RN-13: medição completa sem erros | `POST /measurements` | Unidade | PE (classe válida) | `{ temp: 23, humidity: 60, luminosity: 15000 }` | `errors.length === 0` | Nenhuma |
| TU90 | RN-13: temperatura em falta gera erro | `POST /measurements` | Unidade | PE (classe inválida) | `{ temp: null, ... }` | `errors` contém "Temperatura em falta" | Nenhuma |
| TU91 | RN-13: humidade em falta gera erro | `POST /measurements` | Unidade | PE (classe inválida) | `{ humidity: null, ... }` | `errors` contém "Humidade em falta" | Nenhuma |
| TU92 | RN-13: luminosidade em falta gera erro | `POST /measurements` | Unidade | PE (classe inválida) | `{ luminosity: null, ... }` | `errors` contém "Luminosidade em falta" | Nenhuma |
| TU93 | RN-13: múltiplos campos em falta | `POST /measurements` | Unidade | PE (classe inválida) | `{ temp: null, humidity: null, luminosity: null }` | `errors.length === 3` | Nenhuma |

### Alertas (/alerts)

#### Classificação de Alertas — Condições Múltiplas

**Expressão lógica:** `classifyAlert(temp, humidity, luminosity, plan)`

**Condições atómicas:**
- C1: `tempViolation` — temperatura fora dos limites do plano
- C2: `humidityViolation` — humidade fora dos limites do plano
- C3: `luminosityViolation` — luminosidade fora dos limites do plano

**Regra de severidade:** 0 violações → null; 1 → Informativo; 2 → Aviso; 3 → Critico

| ID | Requisito / Regra | Endpoint | Nível | Técnica | C1 | C2 | C3 | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|----|----|----|--------------------|---------------|
| TU58 | RN-15: sem violações → null | `POST /alerts` | Unidade | CM (0 violações) | F | F | F | null (sem alerta) | Nenhuma |
| TU59 | RN-15: só temperatura → Informativo | `POST /alerts` | Unidade | CM (1 violação) | T | F | F | "Informativo" | Nenhuma |
| TU60 | RN-15: só humidade → Informativo | `POST /alerts` | Unidade | CM (1 violação) | F | T | F | "Informativo" | Nenhuma |
| TU61 | RN-15: só luminosidade → Informativo | `POST /alerts` | Unidade | CM (1 violação) | F | F | T | "Informativo" | Nenhuma |
| TU62 | RN-15: temp + humidade → Aviso | `POST /alerts` | Unidade | CM (2 violações) | T | T | F | "Aviso" | Nenhuma |
| TU63 | RN-15: temp + luminosidade → Aviso | `POST /alerts` | Unidade | CM (2 violações) | T | F | T | "Aviso" | Nenhuma |
| TU64 | RN-15: humidade + luminosidade → Aviso | `POST /alerts` | Unidade | CM (2 violações) | F | T | T | "Aviso" | Nenhuma |
| TU65 | RN-15: todas violadas → Critico | `POST /alerts` | Unidade | CM (3 violações) | T | T | T | "Critico" | Nenhuma |

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU66 | RN-16: classificação Informativo válida | `POST /alerts` | Unidade | PE (classe válida) | `{ classification: "Informativo", ... }` | Alerta criado com status "pendente" | Nenhuma |
| TU67 | RN-16: classificação Aviso válida | `POST /alerts` | Unidade | PE (classe válida) | `{ classification: "Aviso", ... }` | Alerta criado com classification = "Aviso" | Nenhuma |
| TU68 | RN-16: classificação Critico válida | `POST /alerts` | Unidade | PE (classe válida) | `{ classification: "Critico", ... }` | Alerta criado com classification = "Critico" | Nenhuma |
| TU69 | RN-16: classificação inválida rejeitada | `POST /alerts` | Unidade | PE (classe inválida) | `{ classification: "Urgente", ... }` | Erro: "Classificação de alerta inválida" | Nenhuma |
| TU70 | RN-16: mensagem vazia rejeitada | `POST /alerts` | Unidade | PE (classe inválida) | `{ message: "", ... }` | Erro: "Mensagem inválida" | Nenhuma |
| TU71 | RN-17: Resolvido sem justificação aceite | `PATCH /alerts/:id` | Unidade | PE (classe válida) | `{ decision: "Resolvido", justification: null }` | status = "resolvido" | Alerta pendente existente |
| TU72 | RN-17: Ignorado com justificação = 9 chars rejeitado | `PATCH /alerts/:id` | Unidade | VL (abaixo limite inferior) | `{ decision: "Ignorado", justification: "123456789" }` | Erro: "Justificação obrigatória" | Alerta pendente existente |
| TU73 | RN-17: Ignorado com justificação = 10 chars aceite | `PATCH /alerts/:id` | Unidade | VL (limite inferior) | `{ decision: "Ignorado", justification: "1234567890" }` | status = "ignorado" | Alerta pendente existente |
| TU74 | RN-17: Ignorado com justificação = 250 chars aceite | `PATCH /alerts/:id` | Unidade | VL (valor nominal) | `{ decision: "Ignorado", justification: "a"×250 }` | status = "ignorado" | Alerta pendente existente |
| TU75 | RN-17: Ignorado com justificação = 500 chars aceite | `PATCH /alerts/:id` | Unidade | VL (limite superior) | `{ decision: "Ignorado", justification: "a"×500 }` | status = "ignorado" | Alerta pendente existente |
| TU76 | RN-17: Ignorado com justificação = 501 chars rejeitado | `PATCH /alerts/:id` | Unidade | VL (acima limite superior) | `{ decision: "Ignorado", justification: "a"×501 }` | Erro: "Justificação não pode exceder 500 caracteres" | Alerta pendente existente |
| TU77 | RN-17: Ignorado sem justificação rejeitado | `PATCH /alerts/:id` | Unidade | PE (classe inválida) | `{ decision: "Ignorado", justification: null }` | Erro: "Justificação obrigatória" | Alerta pendente existente |
| TU78 | RN-17: decisão inválida rejeitada | `PATCH /alerts/:id` | Unidade | PE (classe inválida) | `{ decision: "Cancelado", ... }` | Erro: "Decisão inválida" | Alerta pendente existente |

### Lotes (/batches)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU94 | RN-18: lote criado com dados válidos | `POST /batches` | Unidade | PE (classe válida) | `{ herbId: 1, planId: 1 }` | Lote criado com state = "ativo" | Nenhuma |
| TU95 | RN-18: sem erva rejeitado | `POST /batches` | Unidade | PE (classe inválida) | `{ herbId: null, planId: 1 }` | Erro: "Erva inválida" | Nenhuma |
| TU96 | RN-18: sem plano rejeitado | `POST /batches` | Unidade | PE (classe inválida) | `{ herbId: 1, planId: null }` | Erro: "Plano inválido" | Nenhuma |
| TU97 | RN-19: ativo → concluido permitido | `PATCH /batches/:id` | Unidade | CM (transição válida) | `{ state: "concluido" }` | state = "concluido" | Lote ativo |
| TU98 | RN-19: ativo → comprometido permitido | `PATCH /batches/:id` | Unidade | CM (transição válida) | `{ state: "comprometido" }` | state = "comprometido" | Lote ativo |
| TU99 | RN-19: concluido → ativo não permitido | `PATCH /batches/:id` | Unidade | CM (transição inválida) | `{ state: "ativo" }` | Erro: "Transição" | Lote concluído |
| TU100 | RN-19: comprometido → concluido permitido | `PATCH /batches/:id` | Unidade | CM (transição válida) | `{ state: "concluido" }` | state = "concluido" | Lote comprometido |
| TU101 | RN-19: estado inválido rejeitado | `PATCH /batches/:id` | Unidade | PE (classe inválida) | `{ state: "pausado" }` | Erro: "Estado inválido" | Lote ativo |
| TU102 | RN-20: perda = -1 (abaixo do limite) | `POST /batches/:id/loss` | Unidade | VL (abaixo limite inferior) | `{ loss: -1 }` | Erro: "Perda não pode ser negativa" | Lote ativo |
| TU103 | RN-20: perda = 0 (limite inferior) | `POST /batches/:id/loss` | Unidade | VL (limite inferior) | `{ loss: 0 }` | losses = 0 | Lote ativo |
| TU104 | RN-20: perda = 50 (valor nominal) | `POST /batches/:id/loss` | Unidade | VL (valor nominal) | `{ loss: 50 }` | losses = 50 | Lote ativo |
| TU105 | RN-20: perda = 100 (limite superior) | `POST /batches/:id/loss` | Unidade | VL (limite superior) | `{ loss: 100 }` | losses = 100 | Lote ativo |
| TU106 | RN-20: perda = 101 (acima do limite) | `POST /batches/:id/loss` | Unidade | VL (acima limite superior) | `{ loss: 101 }` | Erro: "Perda não pode exceder 100%" | Lote ativo |
| TU107 | RN-20: perda > 50% muda estado para comprometido | `POST /batches/:id/loss` | Unidade | PE (classe válida) | `{ loss: 51 }` | state = "comprometido" | Lote ativo |
| TU108 | RN-21: lote sem perdas tem produtividade 100% | `GET /batches/:id` | Unidade | PE (classe válida) | lote concluído sem perdas | productivity = 100 | Lote concluído |
| TU109 | RN-21: lote com 30% perdas tem produtividade 70% | `GET /batches/:id` | Unidade | PE (classe válida) | lote concluído com losses = 30 | productivity = 70 | Lote concluído |
| TU110 | RN-21: lote não concluído lança erro | `GET /batches/:id` | Unidade | PE (classe inválida) | lote ativo | Erro: "Lote ainda não foi concluído" | Lote ativo |

### Automação (/automation)

#### Motor de Automação — Condições Múltiplas

**Expressão lógica:** `executeRule(rule, measurement)` com C1=modo e C2=condição satisfeita

**Condições atómicas:**
- C1: `mode === 'Automatico'`
- C2: `measurement >= threshold` (condição satisfeita)

| Linha | C1 (Automatico) | C2 (condição satisfeita) | C1 && C2 | Resultado | Caso de Teste |
|-------|----------------|--------------------------|----------|-----------|---------------|
| 1 | F | F | F | Não executa, não sugere | TU118 |
| 2 | F | T | F | Não executa, sugere | TU119 |
| 3 | T | F | F | Não executa | TU120 |
| 4 | T | T | T | Executa | TU121 |

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU111 | RN-22: modo Manual válido | `POST /automation/mode` | Unidade | PE (classe válida) | `{ mode: "Manual" }` | mode = "Manual" | Nenhuma |
| TU112 | RN-22: modo Automatico válido | `POST /automation/mode` | Unidade | PE (classe válida) | `{ mode: "Automatico" }` | mode = "Automatico" | Nenhuma |
| TU113 | RN-22: modo inválido rejeitado | `POST /automation/mode` | Unidade | PE (classe inválida) | `{ mode: "Semiautomatico" }` | Erro: "Modo inválido" | Nenhuma |
| TU114 | RN-23: regra válida criada | `POST /automation/rules` | Unidade | PE (classe válida) | `{ action: "rega", condition: "humidity < threshold", threshold: 40 }` | Regra criada com active = true | Nenhuma |
| TU115 | RN-23: ação inválida rejeitada | `POST /automation/rules` | Unidade | PE (classe inválida) | `{ action: "voar", ... }` | Erro: "Ação inválida" | Nenhuma |
| TU116 | RN-23: condição vazia rejeitada | `POST /automation/rules` | Unidade | PE (classe inválida) | `{ condition: "", ... }` | Erro: "Condição inválida" | Nenhuma |
| TU117 | RN-23: threshold NaN rejeitado | `POST /automation/rules` | Unidade | PE (classe inválida) | `{ threshold: NaN, ... }` | Erro: "Threshold inválido" | Nenhuma |
| TU118 | RN-24: Manual + cond. não satisfeita → não executa | `POST /automation/execute` | Unidade | CM (linha 1) | modo Manual, measurement = 30 | executed=false, suggested=false | Regra ativa |
| TU119 | RN-24: Manual + cond. satisfeita → sugere | `POST /automation/execute` | Unidade | CM (linha 2) | modo Manual, measurement = 40 | executed=false, suggested=true | Regra ativa |
| TU120 | RN-24: Automatico + cond. não satisfeita → não executa | `POST /automation/execute` | Unidade | CM (linha 3) | modo Automatico, measurement = 30 | executed=false | Regra ativa |
| TU121 | RN-24: Automatico + cond. satisfeita → executa | `POST /automation/execute` | Unidade | CM (linha 4) | modo Automatico, measurement = 40 | executed=true | Regra ativa |
| TU122 | RN-24: regra inativa não executa | `POST /automation/execute` | Unidade | PE (classe inválida) | regra com active=false | executed=false | Regra inativa |

### Classes de Equivalência — Sprint 3

| Parâmetro | Classe Válida | Classe Inválida |
|-----------|--------------|-----------------|
| temperature (medição) | Número no intervalo [-50, 100] | NaN, < -50 ou > 100 |
| humidity (medição) | Número válido | NaN ou null |
| luminosity (medição) | Número válido | NaN ou null |
| classification (alerta) | "Informativo", "Aviso", "Critico" | Qualquer outro valor |
| decision (alerta) | "Resolvido", "Ignorado" | Qualquer outro valor |
| justification (Ignorado) | String [10, 500] chars | null, < 10 chars ou > 500 chars |
| herbId (lote) | Número válido | null |
| planId (lote) | Número válido | null |
| state (lote) | "ativo", "concluido", "comprometido" | Qualquer outro valor |
| loss (lote) | [0, 100] | < 0 ou > 100 |
| mode (automação) | "Manual", "Automatico" | Qualquer outro valor |
| action (regra) | Valor válido (e.g. "rega") | Valor desconhecido |
| threshold (regra) | Número válido | NaN |

### Valores Limite — Sprint 3

| Parâmetro | Intervalo | Abaixo | Limite Inf. | Nominal | Limite Sup. | Acima |
|-----------|-----------|--------|-------------|---------|-------------|-------|
| temperature (ºC) | [-50, 100] | -51 | -50 | 23 | 100 | 101 |
| justification (chars) | [10, 500] | 9 | 10 | 250 | 500 | 501 |
| loss (%) | [0, 100] | -1 | 0 | 50 | 100 | 101 |

### Cobertura — Sprint 3

| Ficheiro | Instruções | Ramos | Funções | Linhas |
|----------|-----------|-------|---------|--------|
| authService.js | 97.82% | 96.42% | 100% | 97.67% |
| herbsService.js | 93.54% | 96.77% | 75% | 96.66% |
| plansService.js | 100% | 100% | 100% | 100% |
| alertsServices.js | 93.02% | 92.10% | 100% | 100% |
| automationService.js | 96.66% | 95.65% | 75% | 100% |
| batchesService.js | 93.87% | 87.50% | 100% | 100% |
| measurementsService.js | 93.10% | 94.87% | 100% | 92.85% |
| **Total (services)** | **95.14%** | **94.76%** | **92.59%** | **98.17%** |
| **Testes passados** | **122/122** | | | |

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
| RN-13 | Criação e validação de medições | TU79, TU80, TU81, TU82, TU83, TU89, TU90, TU91, TU92, TU93 |
| RN-14 | Intervalo de temperatura das medições | TU84, TU85, TU86, TU87, TU88 |
| RN-15 | Classificação de alertas por violações | TU58, TU59, TU60, TU61, TU62, TU63, TU64, TU65 |
| RN-16 | Criação de alertas com classificação válida | TU66, TU67, TU68, TU69, TU70 |
| RN-17 | Resolução de alertas com decisão e justificação | TU71, TU72, TU73, TU74, TU75, TU76, TU77, TU78 |
| RN-18 | Criação de lotes | TU94, TU95, TU96 |
| RN-19 | Transições de estado do lote | TU97, TU98, TU99, TU100, TU101 |
| RN-20 | Registo de perdas no lote | TU102, TU103, TU104, TU105, TU106, TU107 |
| RN-21 | Cálculo de produtividade do lote | TU108, TU109, TU110 |
| RN-22 | Modo de automação | TU111, TU112, TU113 |
| RN-23 | Criação de regras de automação | TU114, TU115, TU116, TU117 |
| RN-24 | Execução do motor de automação | TU118, TU119, TU120, TU121, TU122 |