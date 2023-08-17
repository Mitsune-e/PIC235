# PIC235
University Project for Capital Digital

# Pre-requisitos:
* Node.js v18.2.0 [(Clique aqui para baixar)](https://nodejs.org/en/download/)
Node.js é um interpretador (runtime envirioment) código aberto (open-source) de JavaScript utilizado para executar a aplicação.
* Yarn v1.22.19 [(Clique aqui para baixar)](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
Yarn é o gerenciador de pacotes utilizados no projeto
 
 #Execução do Projeto
 
   1. Criar um arquivo dotenv ``.env`` no diretório ``./picapi`` de forma que fique ``./picapi/.env`` e popula-lo com os seguintes parâmetros conforme [``.env.exemplo``]:
 ```dotenv
 HOSTNAME=<<seu hostname, se for localhost ex:127.0.0.1>>
 PORT=3001
 DB_HOST=<<nome do host do banco sql>>
 DB_PORT=<<porta do host do banco sql>>
 DB_USER=<<usuário do banco sql>>
 DB_PASS=<<senha do banco sql>>
 DB_NAME=<<nome do banco sql>>
 SALT_ROUNDS=6
 TOKEN_KEY=12345
  ```
  2. Restaurar o backup do banco de dados fornecido pela equipe ou criar um novo conforme os scripts, ambos localizados no diretório ``./database``
 
  3. Navegar para a pasta da api ``./picapi`` e executar o comando para instalar as dependencias 
  ```console
  $ npm install
  ```
  4. Executar o comando ``npm start``para iniciar a api
  ```console
  $ npm start
  ```

  5. Navegar para a pasta raiz do ReactApp: ``pic235app``
     
  6. Executar o comando ``yarn`` para instalar as dependencias
  ```console
  $ yarn
  ```
  7. Executar o comando ``yarn start``para iniciar o projeto
  ```console
  $ yarn start
  ```
