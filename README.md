# Catálogo de Veículos — Web (React)

Interface web de um catálogo de veículos: qualquer visitante consulta os veículos à venda; administradores cadastram, editam e excluem veículos e usuários.

Feita com Next.js e React, consome a [API do Catálogo de Veículos](https://github.com/PauloScotti/app-catalogo-veiculos-nodejs). Nasceu como projeto da formação Devaria e foi atualizada para as versões atuais do Next e do React.

## Stack

| Camada    | Tecnologia                          |
| --------- | ----------------------------------- |
| Framework | Next.js 16 (Pages Router), React 19 |
| Estilos   | Sass, Bootstrap 5                   |
| HTTP      | axios                               |
| Testes    | Vitest                              |

## Como rodar

```bash
npm install
cp .env.example .env.local   # aponte NEXT_PUBLIC_API_URL para a API
npm run dev
```

A aplicação sobe em `http://localhost:3000`. É preciso ter a API rodando; `NEXT_PUBLIC_API_URL` é o endereço dela, sem `/api` no fim.

Para ter um administrador, cadastre a conta pela tela de cadastro e promova-a na API com `npm run admin:promover -- email@exemplo.com`.

## Telas

| Rota                                      | Acesso        | O que é                         |
| ----------------------------------------- | ------------- | ------------------------------- |
| `/`                                       | público       | Catálogo de veículos            |
| `/veiculo`                                | público       | Detalhe de um veículo           |
| `/login`, `/cadastro`                     | público       | Entrar e criar conta            |
| `/editar`                                 | administrador | Editar o próprio perfil         |
| `/administrar`                            | administrador | Lista de veículos para gerenciar |
| `/cadastroVeiulos`, `/editarVeiulos`      | administrador | Cadastrar e editar veículo      |
| `/administrarUsuarios`                    | administrador | Lista de usuários               |
| `/cadastro/CadastroUsuarioAdm`, `/editarUsuarios` | administrador | Cadastrar e editar usuário, escolhendo o nível de acesso |

## Estrutura

```
components/  componentes de interface
hoc/         proteção das telas de administração
pages/       rotas
services/    chamadas à API
styles/      estilos globais e variáveis
utils/       validadores de formulário e sessão
tests/       testes unitários
```

## Testes

```bash
npm test
```

## Sessão e permissões

O token fica no `localStorage` e vai no cabeçalho `Authorization` de cada requisição. Quando a API responde 401 (token expirado ou inválido), a sessão é encerrada e o usuário volta para o login.

A proteção das telas de administração no front é só navegação: quem garante a permissão é a API, que confere o nível de acesso a cada requisição.
