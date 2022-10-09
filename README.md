# Catálogo de Veículos

Projeto de catálogo de veículos desenvolvido com react.js e next.

### Tenologias Utilizadas

- React.js 18.2.0
- Nextjs 12.3.1
- Nodejs 16.14.0
- Sass 1.55.0
- Axios 1.1.0

### Configuração do ambiente de desenvolvimento

1. clonar o repositório `git clone <url_git>` 
1. fazer uma copia do arquivo `.env.example` e renomear o novo arquivo de `.env.local`
1. configurar as variáveis de ambiente no arquivo `.env.local`
1. instale as dependencias do projeto `npm i`
1. execute o comando `npm run dev` para subir a aplicação

### Problemas não resolvidos

1. Ao atualizar as páginas de administração e edição do usuário, apresenta problemas de renderização provavelmente ligado ao comAutorizacao, mas não consegui resolver
1. Ao cadastrar novo veículo a lista não atualiza os dados na lista
1. Ao deletar o veículo, as vezes não atualiza os dados na lista (Resolvido removendo o parágrafo do form)
1. Cliente não consegue editar o perfil (Não consegui ajustar ainda)