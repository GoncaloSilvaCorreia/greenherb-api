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
| TU15 | RN-05: criação de erva com dados válidos | `POST /herbs` | Unidade | PE (classe válida) | `{ name: "Hortelã", scientificName: "Mentha spicata", cycledays: 90, ... }` | Erva criada com id definido | Nenhuma |
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
| TU54 | RN-08: CM C1=F,C2=F | `POST /plans` | Unidade | CM (linha 1) | `{ type: "regular", authorizedBy: "responsavel1", ... }` | Plano criado com sucesso | Nenhuma |
| TU55 | RN-08: CM C1=F,C2=T | `POST /plans` | Unidade | CM (linha 2) | `{ type: "regular", authorizedBy: null, ... }` | Plano criado com sucesso | Nenhuma |
| TU56 | RN-08: CM C1=T,C2=F | `POST /plans` | Unidade | CM (linha 3) | `{ type: "pontual", authorizedBy: "responsavel1", ... }` | Plano criado com sucesso | Nenhuma |
| TU57 | RN-08: CM C1=T,C2=T | `POST /plans` | Unidade | CM (linha 4) | `{ type: "pontual", authorizedBy: null, ... }` | Erro: "Plano pontual requer autorização" | Nenhuma |

### Condições Múltiplas — Plano Pontual

**Expressão:** `if (type === 'pontual' && !authorizedBy)`
**C1:** type === 'pontual' | **C2:** !authorizedBy

| Linha | C1 | C2 | C1 && C2 | Resultado | Teste |
|-------|----|----|----------|-----------|-------|
| 1 | F | F | F | Aceita | TU54 |
| 2 | F | T | F | Aceita | TU55 |
| 3 | T | F | F | Aceita | TU56 |
| 4 | T | T | T | Rejeita | TU57 |

### Classes de Equivalência — Sprint 2

| Parâmetro | Classe Válida | Classe Inválida |
|-----------|--------------|-----------------|
| name (erva) | String não vazia | Vazio ("") |
| scientificName | String não vazia | Vazio ("") |
| cycledays | [1, 365] | < 1 ou > 365 |
| type (plano) | "regular", "emergencia", "pontual" | Qualquer outro valor |
| authorizedBy (pontual) | String não vazia | null ou vazio |
| Linhas CSV | Todas as colunas válidas | Coluna obrigatória em falta |

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

## Sprint 3 — Alertas, Medições, Lotes e Automação

### Alertas (/alerts)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU58 | RN-13: sem violações → null | `POST /measurements` | Unidade | CM (C1=F,C2=F,C3=F) | temp=23, hum=60, lux=15000 | null (sem alerta) | Plan com limites definidos |
| TU59 | RN-13: só temp violada → Informativo | `POST /measurements` | Unidade | CM (C1=T,C2=F,C3=F) | temp=30, hum=60, lux=15000 | "Informativo" | Plan com limites definidos |
| TU60 | RN-13: só hum violada → Informativo | `POST /measurements` | Unidade | CM (C1=F,C2=T,C3=F) | temp=23, hum=85, lux=15000 | "Informativo" | Plan com limites definidos |
| TU61 | RN-13: só lux violada → Informativo | `POST /measurements` | Unidade | CM (C1=F,C2=F,C3=T) | temp=23, hum=60, lux=30000 | "Informativo" | Plan com limites definidos |
| TU62 | RN-13: temp+hum violadas → Aviso | `POST /measurements` | Unidade | CM (C1=T,C2=T,C3=F) | temp=30, hum=85, lux=15000 | "Aviso" | Plan com limites definidos |
| TU63 | RN-13: temp+lux violadas → Aviso | `POST /measurements` | Unidade | CM (C1=T,C2=F,C3=T) | temp=30, hum=60, lux=30000 | "Aviso" | Plan com limites definidos |
| TU64 | RN-13: hum+lux violadas → Aviso | `POST /measurements` | Unidade | CM (C1=F,C2=T,C3=T) | temp=23, hum=85, lux=30000 | "Aviso" | Plan com limites definidos |
| TU65 | RN-13: todas violadas → Critico | `POST /measurements` | Unidade | CM (C1=T,C2=T,C3=T) | temp=30, hum=85, lux=30000 | "Critico" | Plan com limites definidos |
| TU66 | RN-14: classificação Informativo válida | `POST /alerts` | Unidade | PE (classe válida) | `{ classification: "Informativo", batchId: 1, message: "..." }` | Alerta criado com status pendente | Nenhuma |
| TU67 | RN-14: classificação Aviso válida | `POST /alerts` | Unidade | PE (classe válida) | `{ classification: "Aviso", ... }` | Alerta criado com sucesso | Nenhuma |
| TU68 | RN-14: classificação Critico válida | `POST /alerts` | Unidade | PE (classe válida) | `{ classification: "Critico", ... }` | Alerta criado com sucesso | Nenhuma |
| TU69 | RN-14: classificação inválida | `POST /alerts` | Unidade | PE (classe inválida) | `{ classification: "Urgente", ... }` | Erro: "Classificação de alerta inválida" | Nenhuma |
| TU70 | RN-14: mensagem vazia | `POST /alerts` | Unidade | PE (classe inválida) | `{ message: "", ... }` | Erro: "Mensagem inválida" | Nenhuma |
| TU71 | RN-15: Resolvido sem justificação | `PATCH /alerts/:id` | Unidade | PE (classe válida) | `{ decision: "Resolvido", justification: null }` | status = resolvido | Alerta pendente |
| TU72 | RN-15: Ignorado 9 chars (abaixo) | `PATCH /alerts/:id` | Unidade | VL (abaixo limite inferior) | `{ decision: "Ignorado", justification: "123456789" }` | Erro: "Justificação obrigatória" | Alerta pendente |
| TU73 | RN-15: Ignorado 10 chars (limite inf.) | `PATCH /alerts/:id` | Unidade | VL (limite inferior) | `{ decision: "Ignorado", justification: "1234567890" }` | status = ignorado | Alerta pendente |
| TU74 | RN-15: Ignorado 250 chars (nominal) | `PATCH /alerts/:id` | Unidade | VL (valor nominal) | `{ decision: "Ignorado", justification: "a"*250 }` | status = ignorado | Alerta pendente |
| TU75 | RN-15: Ignorado 500 chars (limite sup.) | `PATCH /alerts/:id` | Unidade | VL (limite superior) | `{ decision: "Ignorado", justification: "a"*500 }` | status = ignorado | Alerta pendente |
| TU76 | RN-15: Ignorado 501 chars (acima) | `PATCH /alerts/:id` | Unidade | VL (acima limite superior) | `{ decision: "Ignorado", justification: "a"*501 }` | Erro: "Justificação não pode exceder 500 caracteres" | Alerta pendente |
| TU77 | RN-15: Ignorado sem justificação | `PATCH /alerts/:id` | Unidade | PE (classe inválida) | `{ decision: "Ignorado", justification: null }` | Erro: "Justificação obrigatória" | Alerta pendente |
| TU78 | RN-15: decisão inválida | `PATCH /alerts/:id` | Unidade | PE (classe inválida) | `{ decision: "Cancelado" }` | Erro: "Decisão inválida" | Alerta pendente |

### Medições (/measurements)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU79 | RN-16: medição válida criada | `POST /measurements` | Unidade | PE (classe válida) | `{ temperature: 23, humidity: 60, luminosity: 15000, batchId: 1 }` | Medição criada com id | Nenhuma |
| TU80 | RN-16: temperatura NaN | `POST /measurements` | Unidade | PE (classe inválida) | `{ temperature: NaN, ... }` | Erro: "Temperatura inválida" | Nenhuma |
| TU81 | RN-16: humidade NaN | `POST /measurements` | Unidade | PE (classe inválida) | `{ humidity: NaN, ... }` | Erro: "Humidade inválida" | Nenhuma |
| TU82 | RN-16: luminosidade NaN | `POST /measurements` | Unidade | PE (classe inválida) | `{ luminosity: NaN, ... }` | Erro: "Luminosidade inválida" | Nenhuma |
| TU83 | RN-16: sem lote | `POST /measurements` | Unidade | PE (classe inválida) | `{ batchId: null, ... }` | Erro: "Lote inválido" | Nenhuma |
| TU84 | RN-16: temperatura = -51 (abaixo) | `POST /measurements` | Unidade | VL (abaixo limite inferior) | `{ temperature: -51, ... }` | Erro: "Temperatura fora do intervalo" | Nenhuma |
| TU85 | RN-16: temperatura = -50 (limite inf.) | `POST /measurements` | Unidade | VL (limite inferior) | `{ temperature: -50, ... }` | Medição criada | Nenhuma |
| TU86 | RN-16: temperatura = 23 (nominal) | `POST /measurements` | Unidade | VL (valor nominal) | `{ temperature: 23, ... }` | Medição criada | Nenhuma |
| TU87 | RN-16: temperatura = 100 (limite sup.) | `POST /measurements` | Unidade | VL (limite superior) | `{ temperature: 100, ... }` | Medição criada | Nenhuma |
| TU88 | RN-16: temperatura = 101 (acima) | `POST /measurements` | Unidade | VL (acima limite superior) | `{ temperature: 101, ... }` | Erro: "Temperatura fora do intervalo" | Nenhuma |
| TU89 | RN-16: medição completa sem erros | `POST /measurements` | Unidade | PE (classe válida) | todos os campos preenchidos | errors.length = 0 | Nenhuma |
| TU90 | RN-16: temperatura em falta | `POST /measurements` | Unidade | PE (classe inválida) | `{ temperature: null, ... }` | errors contém "Temperatura em falta" | Nenhuma |
| TU91 | RN-16: humidade em falta | `POST /measurements` | Unidade | PE (classe inválida) | `{ humidity: null, ... }` | errors contém "Humidade em falta" | Nenhuma |
| TU92 | RN-16: luminosidade em falta | `POST /measurements` | Unidade | PE (classe inválida) | `{ luminosity: null, ... }` | errors contém "Luminosidade em falta" | Nenhuma |
| TU93 | RN-16: múltiplos campos em falta | `POST /measurements` | Unidade | PE (classe inválida) | todos null | errors.length = 3 | Nenhuma |

### Lotes (/batches)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU94 | RN-17: lote criado com dados válidos | `POST /batches` | Unidade | PE (classe válida) | `{ herbId: 1, planId: 1 }` | Lote com state = "ativo" | Nenhuma |
| TU95 | RN-17: sem erva | `POST /batches` | Unidade | PE (classe inválida) | `{ herbId: null, planId: 1 }` | Erro: "Erva inválida" | Nenhuma |
| TU96 | RN-17: sem plano | `POST /batches` | Unidade | PE (classe inválida) | `{ herbId: 1, planId: null }` | Erro: "Plano inválido" | Nenhuma |
| TU97 | RN-18: ativo → concluido | `PATCH /batches/:id` | Unidade | CM (C1=T,C2=T) | state=concluido | state = "concluido" | Lote ativo |
| TU98 | RN-18: ativo → comprometido | `PATCH /batches/:id` | Unidade | CM (C1=T,C2=F) | state=comprometido | state = "comprometido" | Lote ativo |
| TU99 | RN-18: concluido → ativo (inválido) | `PATCH /batches/:id` | Unidade | CM (C1=F,C2=T) | state=ativo | Erro: "Transição não permitida" | Lote concluído |
| TU100 | RN-18: comprometido → concluido | `PATCH /batches/:id` | Unidade | CM | state=concluido | state = "concluido" | Lote comprometido |
| TU101 | RN-18: estado inválido | `PATCH /batches/:id` | Unidade | PE (classe inválida) | state=pausado | Erro: "Estado inválido" | Lote ativo |
| TU102 | RN-19: perda = -1 (abaixo) | `POST /batches/:id/losses` | Unidade | VL (abaixo limite inferior) | `{ loss: -1 }` | Erro: "Perda não pode ser negativa" | Lote ativo |
| TU103 | RN-19: perda = 0 (limite inf.) | `POST /batches/:id/losses` | Unidade | VL (limite inferior) | `{ loss: 0 }` | losses = 0 | Lote ativo |
| TU104 | RN-19: perda = 50 (nominal) | `POST /batches/:id/losses` | Unidade | VL (valor nominal) | `{ loss: 50 }` | losses = 50 | Lote ativo |
| TU105 | RN-19: perda = 100 (limite sup.) | `POST /batches/:id/losses` | Unidade | VL (limite superior) | `{ loss: 100 }` | losses = 100 | Lote ativo |
| TU106 | RN-19: perda = 101 (acima) | `POST /batches/:id/losses` | Unidade | VL (acima limite superior) | `{ loss: 101 }` | Erro: "Perda não pode exceder 100%" | Lote ativo |
| TU107 | RN-19: perda > 50% → comprometido | `POST /batches/:id/losses` | Unidade | PE (classe especial) | `{ loss: 51 }` | state = "comprometido" | Lote ativo |
| TU108 | RN-20: sem perdas → 100% | `GET /batches/:id` | Unidade | PE (classe válida) | lote concluído sem perdas | productivity = 100 | Lote concluído |
| TU109 | RN-20: 30% perdas → 70% | `GET /batches/:id` | Unidade | PE (classe válida) | lote com losses=30 concluído | productivity = 70 | Lote com perdas |
| TU110 | RN-20: lote não concluído lança erro | `GET /batches/:id` | Unidade | PE (classe inválida) | lote ativo | Erro: "Lote ainda não foi concluído" | Lote ativo |

### Automação (/automation)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU111 | RN-21: modo Manual válido | `PATCH /automation/mode` | Unidade | PE (classe válida) | `{ mode: "Manual" }` | `{ mode: "Manual" }` | Nenhuma |
| TU112 | RN-21: modo Automatico válido | `PATCH /automation/mode` | Unidade | PE (classe válida) | `{ mode: "Automatico" }` | `{ mode: "Automatico" }` | Nenhuma |
| TU113 | RN-21: modo inválido | `PATCH /automation/mode` | Unidade | PE (classe inválida) | `{ mode: "Semiautomatico" }` | Erro: "Modo inválido" | Nenhuma |
| TU114 | RN-22: regra válida criada | `POST /automation` | Unidade | PE (classe válida) | `{ action: "rega", condition: "humidity < threshold", threshold: 40 }` | Regra criada com active=true | Nenhuma |
| TU115 | RN-22: ação inválida | `POST /automation` | Unidade | PE (classe inválida) | `{ action: "voar", ... }` | Erro: "Ação inválida" | Nenhuma |
| TU116 | RN-22: condição vazia | `POST /automation` | Unidade | PE (classe inválida) | `{ condition: "", ... }` | Erro: "Condição inválida" | Nenhuma |
| TU117 | RN-22: threshold inválido | `POST /automation` | Unidade | PE (classe inválida) | `{ threshold: NaN, ... }` | Erro: "Threshold inválido" | Nenhuma |
| TU118 | RN-23: CM C1=F,C2=F | `POST /automation/execute` | Unidade | CM (C1=F,C2=F) | mode=Manual, measurement=30 | executed=false, suggested=false | Regra ativa |
| TU119 | RN-23: CM C1=F,C2=T | `POST /automation/execute` | Unidade | CM (C1=F,C2=T) | mode=Manual, measurement=40 | executed=false, suggested=true | Regra ativa |
| TU120 | RN-23: CM C1=T,C2=F | `POST /automation/execute` | Unidade | CM (C1=T,C2=F) | mode=Automatico, measurement=30 | executed=false | Regra ativa |
| TU121 | RN-23: CM C1=T,C2=T | `POST /automation/execute` | Unidade | CM (C1=T,C2=T) | mode=Automatico, measurement=40 | executed=true | Regra ativa |
| TU122 | RN-23: regra inativa | `POST /automation/execute` | Unidade | PE (classe especial) | active=false | executed=false | Regra inativa |

### Valores Nulos, Vazios e Controlo de Acesso CSV

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TU123 | RN-24: nome null rejeitado | `POST /herbs` | Unidade | PE (classe inválida) | `{ name: null, ... }` | Erro: "Nome inválido" | Nenhuma |
| TU124 | RN-24: nome undefined rejeitado | `POST /herbs` | Unidade | PE (classe inválida) | `{ name: undefined, ... }` | Erro: "Nome inválido" | Nenhuma |
| TU125 | RN-24: nome com espaços rejeitado | `POST /herbs` | Unidade | PE (classe inválida) | `{ name: "   ", ... }` | Erro: "Nome inválido" | Nenhuma |
| TU126 | RN-24: nome científico null | `POST /herbs` | Unidade | PE (classe inválida) | `{ scientificName: null, ... }` | Erro: "Nome científico inválido" | Nenhuma |
| TU127 | RN-24: nome científico undefined | `POST /herbs` | Unidade | PE (classe inválida) | `{ scientificName: undefined, ... }` | Erro: "Nome científico inválido" | Nenhuma |
| TU128 | RN-24: nome científico com espaços | `POST /herbs` | Unidade | PE (classe inválida) | `{ scientificName: "   ", ... }` | Erro: "Nome científico inválido" | Nenhuma |
| TU129 | RN-07: Administrador pode importar | `POST /herbs/import` | Unidade | PE (classe válida) | `{ rows: [...], userRole: "Administrador" }` | `{ success: 1, failed: 0 }` | Nenhuma |
| TU130 | RN-07: Tecnico não pode importar | `POST /herbs/import` | Unidade | PE (classe inválida) | `{ rows: [...], userRole: "Tecnico" }` | Erro: "Apenas o Administrador pode importar" | Nenhuma |
| TU131 | RN-07: Responsavel não pode importar | `POST /herbs/import` | Unidade | PE (classe inválida) | `{ rows: [...], userRole: "Responsavel" }` | Erro: "Apenas o Administrador pode importar" | Nenhuma |
| TU132 | RN-07: sem perfil não pode importar | `POST /herbs/import` | Unidade | PE (classe inválida) | `{ rows: [...], userRole: null }` | Erro: "Apenas o Administrador pode importar" | Nenhuma |
| TU133 | RN-07: linha CSV com nome null | `POST /herbs/import` | Unidade | PE (classe inválida) | `{ name: null, ... }` | `{ failed: 1, errors[0]: "Nome inválido" }` | Perfil Administrador |
| TU134 | RN-07: linha CSV com nome vazio | `POST /herbs/import` | Unidade | PE (classe inválida) | `{ name: "", ... }` | `{ failed: 1, errors[0]: "Nome inválido" }` | Perfil Administrador |
| TU135 | RN-07: linha CSV com scientificName null | `POST /herbs/import` | Unidade | PE (classe inválida) | `{ scientificName: null, ... }` | `{ failed: 1, errors[0]: "Nome científico inválido" }` | Perfil Administrador |
| TU136 | RN-07: linha CSV com cycledays null | `POST /herbs/import` | Unidade | PE (classe inválida) | `{ cycledays: null, ... }` | `{ failed: 1 }` | Perfil Administrador |
| TU137 | RN-07: CSV misto (nulos + válidos) | `POST /herbs/import` | Unidade | PE (classe mista) | 1 linha null + 1 linha válida | `{ success: 1, failed: 1 }` | Perfil Administrador |
| TU138 | RN-07: CSV com todas as linhas nulas | `POST /herbs/import` | Unidade | PE (classe inválida) | 1 linha com todos os campos null | `{ success: 0, failed: 1 }` | Perfil Administrador |

### Condições Múltiplas — Sprint 3

#### Classificação de Alertas
**Expressão:** `violations === 0 → null | === 1 → Informativo | === 2 → Aviso | === 3 → Critico`
**C1:** tempViolation | **C2:** humViolation | **C3:** luxViolation

| Linha | C1 | C2 | C3 | Violations | Resultado | Teste |
|-------|----|----|----|----|-----------|-------|
| 1 | F | F | F | 0 | null | TU58 |
| 2 | T | F | F | 1 | Informativo | TU59 |
| 3 | F | T | F | 1 | Informativo | TU60 |
| 4 | F | F | T | 1 | Informativo | TU61 |
| 5 | T | T | F | 2 | Aviso | TU62 |
| 6 | T | F | T | 2 | Aviso | TU63 |
| 7 | F | T | T | 2 | Aviso | TU64 |
| 8 | T | T | T | 3 | Critico | TU65 |

#### Motor de Automação
**Expressão:** `mode === 'Automatico' && conditionMet`
**C1:** mode === 'Automatico' | **C2:** measurement >= threshold

| Linha | C1 | C2 | Resultado | Teste |
|-------|----|----|-----------|-------|
| 1 | F | F | não executa, não sugere | TU118 |
| 2 | F | T | não executa, sugere | TU119 |
| 3 | T | F | não executa | TU120 |
| 4 | T | T | executa | TU121 |

### Valores Limite — Sprint 3

| Parâmetro | Intervalo | Abaixo | Limite Inf. | Nominal | Limite Sup. | Acima |
|-----------|-----------|--------|-------------|---------|-------------|-------|
| Justificação (chars) | [10, 500] | 9 | 10 | 250 | 500 | 501 |
| Temperatura sensor (ºC) | [-50, 100] | -51 | -50 | 23 | 100 | 101 |
| Perdas lote (%) | [0, 100] | -1 | 0 | 50 | 100 | 101 |

### Cobertura — Sprint 3

| Ficheiro | Instruções | Ramos | Funções | Linhas |
|----------|-----------|-------|---------|--------|
| authService.js | 97.82% | 96.42% | 100% | 97.67% |
| herbsService.js | 93.54% | 96.77% | 75% | 96.66% |
| plansService.js | 100% | 100% | 100% | 100% |
| alertsService.js | 93.02% | 92.1% | 100% | 100% |
| automationService.js | 96.66% | 95.65% | 75% | 100% |
| batchesService.js | 93.87% | 87.5% | 100% | 100% |
| measurementsService.js | 93.1% | 94.87% | 100% | 92.85% |
| **Total (services)** | **95.14%** | **94.76%** | **92.59%** | **98.17%** |
| **Testes passados** | **138/138** | | | |

---

## Sprint 4 — Testes de Integração

### Autenticação (/auth)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TI01a | RN-01: registo válido Tecnico | `POST /auth/register` | Integração | PE (classe válida) | `{ username: "tecnico1", password: "123456", role: "Tecnico" }` | 201 - `{ username: "tecnico1", role: "Tecnico" }` | Servidor a correr |
| TI01b | RN-01: registo válido Responsavel | `POST /auth/register` | Integração | PE (classe válida) | `{ username: "responsavel1", password: "123456", role: "Responsavel" }` | 201 | Servidor a correr |
| TI01c | RN-01: registo válido Administrador | `POST /auth/register` | Integração | PE (classe válida) | `{ username: "admin1", password: "123456", role: "Administrador" }` | 201 | Servidor a correr |
| TI01d | RN-01: perfil inválido | `POST /auth/register` | Integração | PE (classe inválida) | `{ username: "hacker", password: "123456", role: "Hacker" }` | 400 - `{ error: "..." }` | Servidor a correr |
| TI01e | RN-02: username duplicado | `POST /auth/register` | Integração | PE (classe inválida) | `{ username: "duplicado", password: "123456", role: "Tecnico" }` | 400 | Utilizador já registado |
| TI01f | RN-02: body vazio | `POST /auth/register` | Integração | PE (classe inválida) | `{}` | 400 | Servidor a correr |
| TI01g | RN-02: sem Content-Type | `POST /auth/register` | Integração | PE (classe inválida) | form-urlencoded | 400 | Servidor a correr |
| TI01h | RN-02: método GET não permitido | `GET /auth/register` | Integração | PE (classe inválida) | — | 404 | Servidor a correr |
| TI02a | RN-03: login válido devolve tokens | `POST /auth/login` | Integração | PE (classe válida) | `{ username: "loginuser", password: "123456" }` | 200 - `{ token: "...", refreshToken: "..." }` | Utilizador registado |
| TI02b | RN-03: password errada | `POST /auth/login` | Integração | PE (classe inválida) | `{ username: "loginuser", password: "errada" }` | 401 | Utilizador registado |
| TI02c | RN-03: username inexistente | `POST /auth/login` | Integração | PE (classe inválida) | `{ username: "naoexiste", password: "123456" }` | 401 | Servidor a correr |
| TI02d | RN-03: body vazio | `POST /auth/login` | Integração | PE (classe inválida) | `{}` | 400 | Servidor a correr |
| TI02e | RN-03: username vazio | `POST /auth/login` | Integração | PE (classe inválida) | `{ username: "", password: "123456" }` | 400 | Servidor a correr |
| TI03a | RN-04: refresh token válido | `POST /auth/refresh` | Integração | PE (classe válida) | `{ refreshToken: "<token válido>" }` | 200 - `{ token: "..." }` | Utilizador logado |
| TI03b | RN-04: refresh token inválido | `POST /auth/refresh` | Integração | PE (classe inválida) | `{ refreshToken: "token_invalido" }` | 401 | Servidor a correr |
| TI03c | RN-04: sem refresh token | `POST /auth/refresh` | Integração | PE (classe inválida) | `{}` | 400 | Servidor a correr |

### Ervas Aromáticas (/herbs)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TI04a | RN-05: criação válida | `POST /herbs` | Integração | PE (classe válida) | `{ name: "Hortelã", ... }` | 201 - `{ id: ..., name: "Hortelã" }` | Servidor a correr |
| TI04b | RN-05: nome vazio | `POST /herbs` | Integração | PE (classe inválida) | `{ name: "", ... }` | 400 - `{ error: "..." }` | Servidor a correr |
| TI04c | RN-06: cycledays = 0 | `POST /herbs` | Integração | VL (abaixo limite) | `{ cycledays: 0, ... }` | 400 | Servidor a correr |
| TI04d | RN-05: body vazio | `POST /herbs` | Integração | PE (classe inválida) | `{}` | 400 | Servidor a correr |
| TI04e | RN-05: GET devolve lista | `GET /herbs` | Integração | PE (classe válida) | — | 200 - Array | Servidor a correr |
| TI05a | RN-07: importação válida por Administrador | `POST /herbs/import` | Integração | PE (classe válida) | `{ rows: [...], userRole: "Administrador" }` | 200 - `{ success: 1, failed: 0 }` | Servidor a correr |
| TI05b | RN-07: importação por Tecnico | `POST /herbs/import` | Integração | PE (classe inválida) | `{ rows: [...], userRole: "Tecnico" }` | 400 | Servidor a correr |
| TI05c | RN-07: ficheiro vazio | `POST /herbs/import` | Integração | PE (classe inválida) | `{ rows: [], userRole: "Administrador" }` | 400 | Servidor a correr |
| TI05d | RN-07: linhas mistas | `POST /herbs/import` | Integração | PE (classe mista) | 1 válida + 1 inválida | 200 - `{ success: 1, failed: 1 }` | Servidor a correr |

### Planos de Cultivo (/plans)

| ID | Requisito / Regra | Endpoint | Nível | Técnica | Input | Resultado Esperado | Pré-condições |
|----|-------------------|----------|-------|---------|-------|--------------------|---------------|
| TI06a | RN-08: plano regular válido | `POST /plans` | Integração | PE (classe válida) | `{ type: "regular", ... }` | 201 - `{ type: "regular" }` | Servidor a correr |
| TI06b | RN-08: plano emergencia válido | `POST /plans` | Integração | PE (classe válida) | `{ type: "emergencia", ... }` | 201 | Servidor a correr |
| TI06c | RN-08: pontual com autorização | `POST /plans` | Integração | PE (classe válida) | `{ type: "pontual", authorizedBy: "responsavel1", ... }` | 201 - `{ authorizedBy: "responsavel1" }` | Servidor a correr |
| TI06d | RN-08: pontual sem autorização | `POST /plans` | Integração | PE (classe inválida) | `{ type: "pontual", authorizedBy: null, ... }` | 400 - `{ error: "..." }` | Servidor a correr |
| TI06e | RN-08: tipo inválido | `POST /plans` | Integração | PE (classe inválida) | `{ type: "invalido", ... }` | 400 | Servidor a correr |
| TI06f | RN-09: temperatura fora dos limites | `POST /plans` | Integração | VL (abaixo limite) | `{ minTemp: 17, ... }` | 400 | Servidor a correr |
| TI06g | RN-10: humidade fora dos limites | `POST /plans` | Integração | VL (abaixo limite) | `{ minHumidity: 39, ... }` | 400 | Servidor a correr |
| TI06h | RN-08: body vazio | `POST /plans` | Integração | PE (classe inválida) | `{}` | 400 | Servidor a correr |
| TI06i | RN-08: GET devolve lista | `GET /plans` | Integração | PE (classe válida) | — | 200 - Array | Servidor a correr |

### Cobertura — Sprint 4

| Ficheiro | Instruções | Ramos | Funções | Linhas |
|----------|-----------|-------|---------|--------|
| authController.js | 100% | 100% | 100% | 100% |
| authRoutes.js | 100% | 100% | 100% | 100% |
| herbsRoutes.js | 100% | 100% | 100% | 100% |
| plansRoutes.js | 100% | 100% | 100% | 100% |
| **Total geral** | **85.79%** | **91.48%** | **79.06%** | **86.68%** |
| **Testes passados** | **172/172** | | | |

---

## Sprint 5 — Testes White-Box: Criação de Planos

### Estruturas e Decisões Analisadas

| Decisão | Expressão | Estrutura | Condições Atómicas |
|---------|-----------|-----------|-------------------|
| D1 | `!VALID_TYPES.includes(type)` | if | C1: type não é válido |
| D2 | `type === 'pontual' && !authorizedBy` | if | C1: type==='pontual', C2: !authorizedBy |
| D3 | `minTemp < 18 \|\| maxTemp > 28 \|\| minTemp >= maxTemp` | if | C1: minTemp<18, C2: maxTemp>28, C3: minTemp>=maxTemp |
| D4 | `minHumidity < 40 \|\| maxHumidity > 80 \|\| minHumidity >= maxHumidity` | if | C1: minHum<40, C2: maxHum>80, C3: minHum>=maxHum |
| D5 | `minLuminosity < 5000 \|\| maxLuminosity > 25000 \|\| minLuminosity >= maxLuminosity` | if | C1: minLux<5000, C2: maxLux>25000, C3: minLux>=maxLux |
| D6 | `cycleDays < 1 \|\| cycleDays > 365` | if | C1: cycleDays<1, C2: cycleDays>365 |

### Testes White-Box

| ID | Decisão | Condições | Caminho | Input | Resultado Esperado | Pré-condições |
|----|---------|-----------|---------|-------|--------------------|---------------|
| WB01 | D1 | C1=F (regular) | Continua | `type: "regular"` | Plano criado | Nenhuma |
| WB02 | D1 | C1=F (emergencia) | Continua | `type: "emergencia"` | Plano criado | Nenhuma |
| WB03 | D1 | C1=F (pontual) | Continua | `type: "pontual", authorizedBy: "resp1"` | Plano criado | Nenhuma |
| WB04 | D1 | C1=T (tipo inválido) | Para em D1 | `type: "invalido"` | Erro: "Tipo de plano inválido" | Nenhuma |
| WB05 | D1 | C1=T (tipo vazio) | Para em D1 | `type: ""` | Erro: "Tipo de plano inválido" | Nenhuma |
| WB06 | D1 | C1=T (tipo null) | Para em D1 | `type: null` | Erro: "Tipo de plano inválido" | Nenhuma |
| WB07 | D2 | C1=F,C2=F | Continua | `type: "regular", authorizedBy: "resp1"` | Plano criado | Nenhuma |
| WB08 | D2 | C1=F,C2=T | Continua | `type: "regular", authorizedBy: null` | Plano criado | Nenhuma |
| WB09 | D2 | C1=T,C2=F | Continua | `type: "pontual", authorizedBy: "resp1"` | Plano criado | Nenhuma |
| WB10 | D2 | C1=T,C2=T | Para em D2 | `type: "pontual", authorizedBy: null` | Erro: "Plano pontual requer autorização" | Nenhuma |
| WB11 | D3 | C1=F,C2=F,C3=F | Continua | `minTemp: 18, maxTemp: 25` | Plano criado | Nenhuma |
| WB12 | D3 | C1=T,C2=F,C3=F | Para em D3 | `minTemp: 17, maxTemp: 25` | Erro: "Temperatura fora dos limites" | Nenhuma |
| WB13 | D3 | C1=F,C2=T,C3=F | Para em D3 | `minTemp: 18, maxTemp: 29` | Erro: "Temperatura fora dos limites" | Nenhuma |
| WB14 | D3 | C1=F,C2=F,C3=T | Para em D3 | `minTemp: 25, maxTemp: 20` | Erro: "Temperatura fora dos limites" | Nenhuma |
| WB15 | D3 | C1=T,C2=T,C3=T | Para em D3 | `minTemp: 10, maxTemp: 30` | Erro: "Temperatura fora dos limites" | Nenhuma |
| WB16 | D4 | C1=F,C2=F,C3=F | Continua | `minHumidity: 40, maxHumidity: 70` | Plano criado | Nenhuma |
| WB17 | D4 | C1=T,C2=F,C3=F | Para em D4 | `minHumidity: 39, maxHumidity: 70` | Erro: "Humidade fora dos limites" | Nenhuma |
| WB18 | D4 | C1=F,C2=T,C3=F | Para em D4 | `minHumidity: 40, maxHumidity: 81` | Erro: "Humidade fora dos limites" | Nenhuma |
| WB19 | D4 | C1=F,C2=F,C3=T | Para em D4 | `minHumidity: 70, maxHumidity: 40` | Erro: "Humidade fora dos limites" | Nenhuma |
| WB20 | D4 | C1=T,C2=T,C3=T | Para em D4 | `minHumidity: 10, maxHumidity: 90` | Erro: "Humidade fora dos limites" | Nenhuma |
| WB21 | D5 | C1=F,C2=F,C3=F | Continua | `minLuminosity: 5000, maxLuminosity: 20000` | Plano criado | Nenhuma |
| WB22 | D5 | C1=T,C2=F,C3=F | Para em D5 | `minLuminosity: 4999, maxLuminosity: 20000` | Erro: "Luminosidade fora dos limites" | Nenhuma |
| WB23 | D5 | C1=F,C2=T,C3=F | Para em D5 | `minLuminosity: 5000, maxLuminosity: 25001` | Erro: "Luminosidade fora dos limites" | Nenhuma |
| WB24 | D5 | C1=F,C2=F,C3=T | Para em D5 | `minLuminosity: 20000, maxLuminosity: 5000` | Erro: "Luminosidade fora dos limites" | Nenhuma |
| WB25 | D5 | C1=T,C2=T,C3=T | Para em D5 | `minLuminosity: 1000, maxLuminosity: 30000` | Erro: "Luminosidade fora dos limites" | Nenhuma |
| WB26 | D6 | C1=F,C2=F | Continua | `cycleDays: 90` | Plano criado | Nenhuma |
| WB27 | D6 | C1=T,C2=F | Para em D6 | `cycleDays: 0` | Erro: "Duração do ciclo inválida" | Nenhuma |
| WB28 | D6 | C1=F,C2=T | Para em D6 | `cycleDays: 366` | Erro: "Duração do ciclo inválida" | Nenhuma |
| WB29 | D6 | C1=T | Para em D6 | `cycleDays: -1` | Erro: "Duração do ciclo inválida" | Nenhuma |

### Cobertura de Caminhos (Path Coverage)

| ID | Caminho | Para em | Input | Resultado Esperado |
|----|---------|---------|-------|--------------------|
| WB30 | Caminho 1 | D1 | `type: "invalido"` | Erro: "Tipo de plano inválido" |
| WB31 | Caminho 2 | D2 | `type: "pontual", authorizedBy: null` | Erro: "Plano pontual requer autorização" |
| WB32 | Caminho 3 | D3 | `minTemp: 17` | Erro: "Temperatura fora dos limites" |
| WB33 | Caminho 4 | D4 | `minHumidity: 39` | Erro: "Humidade fora dos limites" |
| WB34 | Caminho 5 | D5 | `minLuminosity: 4999` | Erro: "Luminosidade fora dos limites" |
| WB35 | Caminho 6 | D6 | `cycleDays: 0` | Erro: "Duração do ciclo inválida" |
| WB36 | Caminho 7 (completo) | — | todos válidos | Plano criado com sucesso |

### Cobertura — Sprint 5

| Métrica | Valor |
|---------|-------|
| Decisões cobertas | 6/6 (100%) |
| Caminhos cobertos | 7/7 (100%) |
| plansService.js instruções | 100% |
| plansService.js ramos | 100% |
| plansService.js funções | 100% |
| plansService.js linhas | 100% |
| **Testes passados** | **208/208** |

---

## Tabela Inversa — Requisito → Casos de Teste

| Requisito | Descrição | Casos de Teste |
|-----------|-----------|---------------|
| RN-01 | Perfis válidos de registo | TU01, TU02, TU03, TU04, TI01a, TI01b, TI01c, TI01d |
| RN-02 | Validação de username e password | TU05, TU06, TU07, TI01e, TI01f, TI01g, TI01h |
| RN-03 | Autenticação por credenciais | TU08, TU09, TU10, TU11, TU12, TI02a, TI02b, TI02c, TI02d, TI02e |
| RN-04 | Renovação de token | TU13, TU14, TI03a, TI03b, TI03c |
| RN-05 | Criação de erva aromática | TU15, TU16, TU17, TU18, TU19, TI04a, TI04b, TI04d, TI04e |
| RN-06 | Duração do ciclo de erva | TU20, TU21, TU22, TU23, TU24, TI04c |
| RN-07 | Importação CSV de ervas | TU25, TU26, TU27, TU28, TU129, TU130, TU131, TU132, TU133, TU134, TU135, TU136, TU137, TU138, TI05a, TI05b, TI05c, TI05d |
| RN-08 | Tipo de plano e autorização pontual | TU29, TU30, TU31, TU32, TU33, TU54, TU55, TU56, TU57, TI06a, TI06b, TI06c, TI06d, TI06e, TI06h, TI06i, WB01-WB10, WB30, WB31, WB36 |
| RN-09 | Temperatura do plano | TU34, TU35, TU36, TU37, TU38, TI06f, WB11-WB15, WB32 |
| RN-10 | Humidade do plano | TU39, TU40, TU41, TU42, TU43, TI06g, WB16-WB20, WB33 |
| RN-11 | Luminosidade do plano | TU44, TU45, TU46, TU47, TU48, WB21-WB25, WB34 |
| RN-12 | Duração do ciclo do plano | TU49, TU50, TU51, TU52, TU53, WB26-WB29, WB35 |
| RN-13 | Classificação de alertas | TU58, TU59, TU60, TU61, TU62, TU63, TU64, TU65 |
| RN-14 | Criação de alertas | TU66, TU67, TU68, TU69, TU70 |
| RN-15 | Resolução/ignorar alertas | TU71, TU72, TU73, TU74, TU75, TU76, TU77, TU78 |
| RN-16 | Medições ambientais | TU79, TU80, TU81, TU82, TU83, TU84, TU85, TU86, TU87, TU88, TU89, TU90, TU91, TU92, TU93 |
| RN-17 | Criação de lotes | TU94, TU95, TU96 |
| RN-18 | Transições de estado de lotes | TU97, TU98, TU99, TU100, TU101 |
| RN-19 | Registo de perdas | TU102, TU103, TU104, TU105, TU106, TU107 |
| RN-20 | Cálculo de produtividade | TU108, TU109, TU110 |
| RN-21 | Modo de automação | TU111, TU112, TU113 |
| RN-22 | Criação de regras de automação | TU114, TU115, TU116, TU117 |
| RN-23 | Motor de automação | TU118, TU119, TU120, TU121, TU122 |
| RN-24 | Validação de campos nulos/vazios | TU123, TU124, TU125, TU126, TU127, TU128 |


****