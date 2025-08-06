# 🏦 Gestor de Limites PIX - KRT

Uma aplicação web moderna para gerenciamento de limites PIX de clientes bancários, desenvolvida com Angular 19 e integrada com APIs REST.

## 📋 Sobre o Projeto

O **Gestor de Limites PIX - KRT** é uma solução completa para bancos gerenciarem os limites de transações PIX dos seus clientes. A aplicação oferece uma interface intuitiva e elegante para buscar, criar, atualizar e processar transações PIX, com feedback em tempo real através de notificações toast.

### ✨ Funcionalidades Principais

- 🔍 **Busca de Clientes**: Pesquisa por documento e ID da conta
- 👤 **Cadastro de Clientes**: Criação de novos clientes com validação completa
- 💰 **Gestão de Limites**: Atualização dinâmica de limites PIX
- 💳 **Processamento de Transações**: Simulação e validação de transações PIX
- 🗑️ **Exclusão de Clientes**: Remoção segura com confirmação
- 🔔 **Notificações**: Sistema de toast para feedback instantâneo
- 🎨 **Design Responsivo**: Interface moderna com tema corporativo BTG

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 19** - Framework principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **NGX-Toastr** - Sistema de notificações
- **CSS3** - Estilização com variáveis CSS customizadas

### Ferramentas de Desenvolvimento
- **Angular CLI** - Ferramenta de desenvolvimento
- **Node.js** - Runtime JavaScript
- **npm** - Gerenciador de pacotes
- **Git** - Controle de versão

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Git](https://git-scm.com/)

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/mansque404/BancoKRT-APP.git
cd BancoKRT-APP
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente
Edite o arquivo `src/environments/environment.ts` para configurar a URL da API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1' // Substitua pela URL da sua API
};
```

### 4. Execute a aplicação
```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── models/              # Modelos de dados
│   │   ├── cliente-pix.ts
│   │   └── transacao-response.ts
│   ├── services/            # Serviços da aplicação
│   │   └── cliente-pix.service.ts
│   ├── app.component.*      # Componente principal
│   ├── app.config.ts        # Configurações da aplicação
│   └── app.routes.ts        # Roteamento
├── environments/            # Configurações de ambiente
│   ├── environment.ts
│   └── environment.prod.ts
├── styles.css              # Estilos globais
└── index.html              # Página principal
```

## 🎨 Design System

O projeto utiliza um sistema de design baseado no tema corporativo BTG com as seguintes cores:

- **Azul Escuro**: `#0A1926` (Fundo principal)
- **Azul Card**: `#0E2031` (Fundo dos cards)
- **Azul Accent**: `#00A7E1` (Botões e destaques)
- **Texto Primário**: `#E6F1F5`
- **Texto Secundário**: `#8892B0`

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run watch` - Compila com watch mode
- `npm test` - Executa os testes unitários

## 📡 API Integration

A aplicação se conecta com uma API REST que deve implementar os seguintes endpoints:

### GET `/cliente-pix/{documento}/{contaId}`
Busca um cliente por documento e ID da conta.

### POST `/cliente-pix`
Cria um novo cliente PIX.

### PUT `/cliente-pix/{documento}/{contaId}/limite`
Atualiza o limite PIX de um cliente.

### DELETE `/cliente-pix/{documento}/{contaId}`
Remove um cliente do sistema.

### POST `/cliente-pix/{documento}/{contaId}/transacao`
Processa uma transação PIX.

## 🌟 Funcionalidades Detalhadas

### Sistema de Notificações
- ✅ **Sucesso**: Notificações verdes para operações bem-sucedidas
- ❌ **Erro**: Notificações vermelhas para erros e validações
- ⚠️ **Aviso**: Notificações amarelas para transações recusadas
- ℹ️ **Info**: Notificações azuis para informações gerais

### Validações
- Verificação de campos obrigatórios
- Validação de valores negativos
- Confirmação para exclusão de clientes
- Feedback instantâneo para o usuário

### Responsividade
- Layout adaptável para desktop e mobile
- Grid responsivo com colunas flexíveis
- Componentes otimizados para touch

## 🚀 Deploy

### Produção
```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/` e podem ser servidos por qualquer servidor web.

### Configuração de Produção
Atualize `src/environments/environment.prod.ts` com as configurações de produção:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://gestor-limites-krt-a0cnb6btbmfsa2fx.brazilsouth-01.azurewebsites.net/api/v1'
};
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Convenções de Código

- Use TypeScript para tipagem forte
- Siga as convenções do Angular Style Guide
- Utilize nomes descritivos para variáveis e métodos
- Mantenha componentes pequenos e focados
- Documente funções complexas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

**mansque404**
- GitHub: [@mansque404](https://github.com/mansque404)
- Projeto: [BancoKRT-APP](https://github.com/mansque404/BancoKRT-APP)

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Certifique-se de que a API está rodando e acessível
3. Verifique as configurações de ambiente
4. Abra uma [issue](https://github.com/mansque404/BancoKRT-APP/issues) no GitHub

---
