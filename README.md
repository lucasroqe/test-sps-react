# test-sps-react

CRUD de usuários em React. Tela de login (JWT).

Consome a API do projeto [test-sps-server](../test-sps-server)

## Stack

- Vite
- Axios
- React Router Dom
- React Hook Form
- Zod
- Shadcn (componentes)

## Como rodar

1. Clone o repositório e entre na pasta:
```bash
git clone <url>
cd test-sps-react
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto apontando para a API:
```
VITE_API_URL=http://localhost:3000
```

4. Rode a aplicação:
```bash
npm run dev
```

> Lembre de subir o `test-sps-server` antes !!!

5. Utilize as credenciais já preestabelecidas
```
email: admin@spsgroup.com.br

password: 1234
```
