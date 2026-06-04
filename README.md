# GREENHERB API

API REST para a plataforma de gestão inteligente de estufa GREENHERB, desenvolvida no âmbito da unidade curricular de Engenharia de Software II.

## Requisitos

- [Node.js](https://nodejs.org) (versão LTS)
- npm (incluído com o Node.js)

## Instalação

1. Clona o repositório:
```bash
git clone https://github.com/GoncaloSilvaCorreia/greenherb-api.git
cd greenherb-api
```

2. Instala as dependências:
```bash
npm install
```

3. Cria o ficheiro `.env` na raiz do projeto:
JWT_SECRET=greenherb_secret
PORT=3000

> **Nota:** Se o projeto estiver numa pasta sincronizada com OneDrive, copia-o primeiro para o Desktop antes de correr.

## Correr o Servidor

```bash
node src/app.js
```

O servidor arranca na porta 3000 e cria automaticamente dados de exemplo (seed):
- 3 utilizadores (admin, responsavel, tecnico)
- 10 ervas aromáticas
- 10 planos de cultivo
- 5 lotes, medições, alertas e regras de automação

## Credenciais de Teste

| Username | Password | Perfil |
|----------|----------|--------|
| admin | 123456 | Administrador |
| responsavel | 123456 | Responsavel |
| tecnico | 123456 | Tecnico |

## Interface Gráfica

Abre o ficheiro `frontend/index.html` diretamente no browser. Faz login com uma das credenciais acima.

## Correr os Testes

```bash
NODE_ENV=test npx jest --coverage
```

## Estrutura do Projeto
greenherb-api/
├── frontend/
│   └── index.html              # Dashboard web
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── data/
│   │   └── seed.js             # Dados de exemplo
│   ├── gateways/
│   │   ├── temperatureGateway.js   # Gateway sensor temperatura
│   │   └── notificationGateway.js  # Gateway notificações
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── herbsRoutes.js
│   │   ├── plansRoutes.js
│   │   ├── alertsRoutes.js
│   │   ├── measurementsRoutes.js
│   │   ├── batchesRoutes.js
│   │   ├── automationRoutes.js
│   │   └── monitoringRoutes.js
│   └── services/
│       ├── authService.js
│       ├── herbsService.js
│       ├── plansService.js
│       ├── alertsServices.js
│       ├── measurementsService.js
│       ├── batchesService.js
│       ├── automationService.js
│       └── monitoringService.js
├── tests/
│   ├── unit/
│   │   ├── authService.test.js
│   │   ├── herbsService.test.js
│   │   ├── plansService.test.js
│   │   ├── plansService.whitebox.test.js
│   │   ├── alertsService.test.js
│   │   ├── measurementsService.test.js
│   │   ├── batchesService.test.js
│   │   ├── automationService.test.js
│   │   └── monitoringService.test.js
│   └── integration/
│       ├── auth.test.js
│       ├── herbs.test.js
│       └── plans.test.js
├── matriz_rastreabilidade.md
├── matriz_rastreabilidade.xlsx
├── package.json
└── .gitignore

## Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /auth/register | Registo de utilizador |
| POST | /auth/login | Login e obtenção de token |
| POST | /auth/refresh | Renovação de token |
| GET | /herbs | Listar ervas |
| POST | /herbs | Criar erva |
| POST | /herbs/import | Importar ervas via CSV |
| GET | /plans | Listar planos |
| POST | /plans | Criar plano de cultivo |
| GET | /batches | Listar lotes |
| POST | /batches | Criar lote |
| PATCH | /batches/:id/state | Alterar estado do lote |
| POST | /batches/:id/losses | Registar perda |
| GET | /measurements | Listar medições |
| POST | /measurements | Registar medição |
| GET | /alerts | Listar alertas |
| POST | /alerts | Criar alerta |
| PATCH | /alerts/:id | Resolver/ignorar alerta |
| GET | /automation | Estado da automação |
| POST | /automation | Criar regra |
| PATCH | /automation/mode | Alterar modo (Manual/Automático) |
| POST | /monitoring/check | Verificar temperatura do lote |

## Plano de Sprints

| Sprint | Descrição | Testes |
|--------|-----------|--------|
| Sprint 1 | Endpoints e testes de unidade para autenticação | TU01-TU14 (14 testes) |
| Sprint 2 | Testes de unidade para ervas e planos | TU15-TU57 (43 testes) |
| Sprint 3 | Testes de unidade para alertas, medições, lotes e automação | TU58-TU138 (81 testes) |
| Sprint 4 | Testes de integração com Supertest | TI01-TI06 (34 testes) |
| Sprint 5 | Testes White-Box para criação de planos | WB01-WB36 (36 testes) |
| Sprint 6 | Duplos de teste — Stubs e Mocks | SP01-SP02 (11 testes) |

**Total: 219 testes — 100% passam**

## Técnicas Aplicadas

- **Particionamento de Equivalência** — classes válidas e inválidas para cada parâmetro
- **Análise de Valores Limite** — extremos dos intervalos (temperatura, humidade, luminosidade, etc.)
- **Condições Múltiplas (MC/DC)** — tabelas de verdade para decisões compostas
- **Cobertura de Caminhos** — todos os caminhos possíveis na criação de planos
- **Stubs** — substituição do gateway de temperatura (sensor IoT)
- **Mocks** — substituição e verificação do gateway de notificações

## Métricas de Cobertura (Sprint 6 Final)

| Métrica | Valor |
|---------|-------|
| Cobertura de instruções | 71.34% |
| Cobertura de ramos | 91.7% |
| Cobertura de funções | 52.23% |
| Cobertura de linhas | 72.32% |
| Total de testes | 219 |
| Testes passados | 219 |
