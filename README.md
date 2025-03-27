# Aplicação Web de Gerenciamento de Tarefas

Uma aplicação web para gerenciamento de tarefas desenvolvida com ASP.NET Core Web API e React.

## Tecnologias Utilizadas

### Backend
- ASP.NET Core 7.0
- Entity Framework Core
- SQL Server
- CORS
- Swagger/OpenAPI

### Frontend
- React 18
- Material-UI (MUI)
- Axios
- React Router
- Date-fns
- Vite

## Pré-requisitos

- [.NET 7.0 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Visual Studio](https://visualstudio.microsoft.com/) (recomendado) ou [Visual Studio Code](https://code.visualstudio.com/)

## Instruções de Configuração

### Configuração do Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/jvbads/AspNetCore-API-REST-EF-SqlServer.git
   cd AspNetCore-API-REST-EF-SqlServer
   ```

2. Configure a string de conexão no `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=seu_servidor;Database=TaskDB;Trusted_Connection=True;TrustServerCertificate=True;"
   }
   ```

3. Execute as migrações:
   ```bash
   dotnet ef database update
   ```

4. Execute o projeto:
   ```bash
   dotnet run
   ```

A API estará disponível em `https://localhost:7001` e `http://localhost:5001`.

### Configuração do Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd Frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a URL da API em `src/services/api.js`:
   ```javascript
   const API_URL = 'https://localhost:7001/api';
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação estará disponível em `http://localhost:5173`.

## Funcionalidades

- Criar, listar, atualizar e excluir tarefas
- Filtrar tarefas por status
- Pesquisar tarefas por título, descrição ou data
- Design responsivo para mobile e desktop
- Interface moderna com componentes Material-UI
- Formatação de data em português brasileiro
- Indicadores de status com código de cores

## Estrutura do Projeto

```
AspNetCore-API-REST-EF-SqlServer/
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx
    │   │   └── TaskList.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── constants/
    │   │   └── taskStatus.js
    │   ├── hooks/
    │   │   └── useTasks.js
    │   ├── utils/
    │   │   └── dateUtils.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    └── package.json
```

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
