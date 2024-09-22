1. **Visão Geral do Projeto**
Este projeto é uma aplicação Angular que permite aos usuários pesquisar informações sobre Pokémon. A aplicação inclui componentes para busca de Pokémon, exibição de detalhes e integração com uma API externa para obter dados dos Pokémon. Além disso, a aplicação utiliza o NgRx Store para gerenciamento de estado.

# Projeto Pokémon

Este projeto é uma aplicação web que permite aos usuários pesquisar informações sobre Pokémon. A aplicação utiliza a API do Pokémon para buscar dados e exibir detalhes sobre os Pokémon pesquisados.
Copy
Insert

2. Estrutura do Projeto
Descreva a estrutura do projeto, incluindo os principais diretórios e arquivos, e o que cada um deles contém.

## Estrutura do Projeto
```
src/
|-- app/
|   |-- components/
|   |   |-- pokemon-search/
|   |   |   |-- pokemon-search.component.ts
|   |   |   |-- pokemon-search.component.spec.ts
|   |   |   |-- pokemon-search.component.html
|   |   |   |-- pokemon-search.component.scss
|   |   |-- pokemon-details/
|   |   |   |-- pokemon-details.component.ts
|   |   |   |-- pokemon-details.component.spec.ts
|   |   |   |-- pokemon-details.component.html
|   |   |   |-- pokemon-details.component.scss
|   |-- home/
|   |   |-- home.component.ts
|   |   |-- home.component.spec.ts
|   |   |-- home.component.html
|   |   |-- home.component.scss
|   |-- services/
|   |   |-- pokemon-api
|   |   |   |-- pokemon-api.service.spec.ts
|   |   |   |-- pokemon-api.service.ts
|   |   |-- state-dropdown
|   |   |   |-- state.service.spec.ts
|   |   |   |-- state.service.ts
|   |-- store/
|   |   |-- pokemon.actions.ts
|   |   |-- pokemon.reducer.ts
|   |-- app.component.spec.ts
|   |-- app.component.html
|   |-- app.component.scss
|   |-- app.component.ts
|   |-- app.config.server.ts
|   |-- app.config.ts
|   |-- app.routes.ts
|-- assets
|   |-- logo-totvs.png
|   |--no-searche-icon.png
|   |-- pokebola.png
|-- index.html
|-- main.server.ts
|-- main.ts
|-- styles.scss
|-- .editorconfig
|-- angular.json
|-- package-lock.json
|-- package.json
|-- README.md
|-- server.ts
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.spec.json
|-- types.ts
```

3. Configuração e Instalação
Para instalar e executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
```Bash
    git clone https://github.com/GuiRissato/pokedex-totvs.git
    cd pokedex-totvs
```

2. Instale as dependências:
```Bash
npm install
```

3. Execução dos testes unitários:
```Bash
npm test
```
**Lembre-se de verificar os resultados dos testes e caso crie novas funcionalidades crie novos testes para ela.**

4. Execute o servidor de desenvolvimento:
```Bash
npm start
```

5. Acesse a aplicação no navegador:
http://localhost:4200

## Dependências
As seguintes bibliotecas foram utilizadas no desenvolvimento deste projeto:
```JSON
{
  "dependencies": {
    "@angular/animations": "^12.0.0",
    "@angular/common": "^12.0.0",
    "@angular/compiler": "^12.0.0",
    "@angular/core": "^12.0.0",
    "@angular/forms": "^12.0.0",
    "@angular/platform-browser": "^12.0.0",
    "@angular/platform-browser-dynamic": "^12.0.0",
    "@angular/router": "^12.0.0",
    "rxjs": "^6.6.0",
    "tslib": "^2.0.0",
    "zone.js": "^0.11.4"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^12.0.0",
    "@angular/cli": "^12.0.0",
    "@angular/compiler-cli": "^12.0.0",
    "@types/node": "^12.11.1",
    "typescript": "^4.2.4"
  }
}
```

## Componentes Principais
### 1. HomeComponent
 - O HomeComponent é o componente principal da aplicação. Ele é responsável por renderizar a interface inicial e gerenciar a interação com o componente de busca de Pokémon.

### 2. Testes Unitários
 - Os testes unitários para o HomeComponent estão localizados no arquivo home.component.spec.ts. Eles verificam a criação do componente, a funcionalidade de busca e a exibição de mensagens de erro.

### 3. PokemonSearchComponent
 - O PokemonSearchComponent é responsável por permitir que os usuários pesquisem Pokémon pelo nome. Ele exibe uma lista de sugestões enquanto o usuário digita e emite um evento quando um Pokémon é encontrado.

### 4. Propriedades e Métodos
 - pokemonName: Armazena o nome do Pokémon a ser pesquisado.
 - errorMessage: Armazena mensagens de erro.
 - pokemonNotFound: Indica se o Pokémon não foi encontrado.
 - searchedPokemons$: Observable que contém a lista de Pokémon pesquisados.
 - showDropdown: Controla a exibição do dropdown de sugestões.
 - searchedPokemons: Lista de Pokémon pesquisados.
 - filteredPokemons: Lista de Pokémon filtrados com base na pesquisa.
 - pokemonSearched: Evento emitido quando um Pokémon é encontrado.
### 5. Métodos
 - ngOnInit(): Inicializa o componente e configura o Observable para a lista de Pokémon pesquisados.
 - searchPokemon(): Realiza a busca do Pokémon utilizando o serviço PokemonApiService.
 - toggleDropdown(): Alterna a exibição do dropdown de sugestões.
 - selectPokemon(pokemon: SearchedPokemon): Seleciona um Pokémon da lista de sugestões e realiza a busca.
 - filterPokemons(): Filtra a lista de Pokémon com base no nome digitado.
### 6. Serviços
 1. PokemonApiService
 - O PokemonApiService é responsável por fazer requisições à API externa para obter dados dos Pokémon.
 - A API externa utilizada no código fornecido é a PokeAPI, uma API pública que fornece dados sobre Pokémon. Abaixo estão os detalhes sobre os endpoints, parâmetros e exemplos de requisições/respostas.

#### Endpoints
 - Obter detalhes de um Pokémon específico
 - URL: https://pokeapi.co/api/v2/pokemon/{name}
 - Método: GET
 - Parâmetros:
 - name: Nome do Pokémon (por exemplo, "pikachu")

**Exemplos de Requisições e Respostas**
 - Requisição para obter detalhes de um Pokémon específico
 - Requisição:
```Bash
GET https://pokeapi.co/api/v2/pokemon/pikachu
```

 - Resposta:
```JSON
{
  "id": 25,
  "name": "pikachu",
  "base_experience": 112,
  "height": 4,
  "is_default": true,
  "order": 35,
  "weight": 60,
  "abilities": [
    {
      "is_hidden": false,
      "slot": 1,
      "ability": {
        "name": "static",
        "url": "https://pokeapi.co/api/v2/ability/9/"
      }
    },
    {
      "is_hidden": true,
      "slot": 3,
      "ability": {
        "name": "lightning-rod",
        "url": "https://pokeapi.co/api/v2/ability/31/"
      }
    }
  ],
  "sprites": {
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png"
  },
  "stats": [
    {
      "base_stat": 35,
      "effort": 0,
      "stat": {
        "name": "speed",
        "url": "https://pokeapi.co/api/v2/stat/6/"
      }
    },
    {
      "base_stat": 55,
      "effort": 0,
      "stat": {
        "name": "special-defense",
        "url": "https://pokeapi.co/api/v2/stat/5/"
      }
    },
    {
      "base_stat": 50,
      "effort": 0,
      "stat": {
        "name": "special-attack",
        "url": "https://pokeapi.co/api/v2/stat/4/"
      }
    },
    {
      "base_stat": 40,
      "effort": 0,
      "stat": {
        "name": "defense",
        "url": "https://pokeapi.co/api/v2/stat/3/"
      }
    },
    {
      "base_stat": 55,
      "effort": 0,
      "stat": {
        "name": "attack",
        "url": "https://pokeapi.co/api/v2/stat/2/"
      }
    },
    {
      "base_stat": 35,
      "effort": 0,
      "stat": {
        "name": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      }
    }
  ],
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ]
}
```

- **Observações**
  - A URL base da API é https://pokeapi.co/api/v2/.
  - O endpoint /pokemon/{name} retorna detalhes completos sobre um Pokémon específico, incluindo suas habilidades, estatísticas, tipos e sprites.
  - A resposta é um objeto JSON contendo várias propriedades detalhadas sobre o Pokémon.

 2. StateService
 - O StateService gerencia o estado da aplicação, incluindo a exibição de detalhes dos Pokémon.

 3. Servidor
 - O servidor da aplicação é configurado nos arquivos main.server.ts e server.ts.

### 7. main.server.ts
 - Este arquivo configura a aplicação Angular para ser executada no servidor utilizando bootstrapApplication.

# Diretrizes de Estilo de Código
Para manter a consistência e a qualidade do código no projeto, siga as diretrizes de estilo abaixo:

1. **Indentação e Espaçamento**
 - Utilize 2 espaços para indentação em arquivos `.ts`, `.html`, e `.scss`.
 - Mantenha linhas de código com no máximo 80 caracteres.

2. **Nomenclatura**
 - Use `camelCase` para variáveis e funções.
 - Use `PascalCase` para nomes de classes e componentes.
 - Use `kebab-case` para nomes de arquivos.

3. **Comentários**
 - Adicione comentários claros e concisos para explicar partes complexas do código.
 - Utilize comentários em bloco `(/* ... */)` para documentar funções e classes.

4. Estrutura do Código
 - Organize os imports em três grupos: bibliotecas externas, módulos internos, e estilos.
 - Separe cada grupo de imports com uma linha em branco.

5. Boas Práticas
 - Evite código duplicado. Reutilize funções e componentes sempre que possível.
 - Escreva testes unitários para novas funcionalidades e componentes.
 - Utilize `async/await` para operações assíncronas em vez de then/catch.

**Como Contribuir**
Para contribuir com o projeto, siga os passos abaixo:

1. Fork o Repositório
 - Faça um fork do repositório principal para sua conta do GitHub.

2. Clone o Repositório
 - Clone o repositório forkado para sua máquina local:

```Bash
git clone https://github.com/seu-usuario/pokedex-totvs.git
cd pokedex-totvs
```

3. Crie uma Branch
 - Crie uma nova branch para sua feature ou correção:
```Bash
git checkout -b minha-nova-feature
```

4. Faça as Alterações
 - Implemente suas alterações seguindo as diretrizes de estilo de código.
 - Adicione testes unitários para suas alterações, se aplicável.

5. Commit e Push
 - Faça commit das suas alterações com uma mensagem clara e descritiva:
```Bash
git commit -m "Descrição clara das alterações"
```

 - Envie suas alterações para o repositório remoto:
```Bash
git push origin minha-nova-feature
```

6. Abra um Pull Request
 - No GitHub, abra um Pull Request (PR) para a branch `main` do repositório principal.
 - Descreva detalhadamente as alterações feitas e o motivo delas.

7. Revisão e Feedback
 - Aguarde a revisão do seu PR por outros colaboradores.
 - Faça as alterações solicitadas durante a revisão, se necessário.

Seguindo essas diretrizes, você ajudará a manter a qualidade e a consistência do código, facilitando a colaboração e a manutenção do projeto.