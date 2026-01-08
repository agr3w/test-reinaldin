# Catálogo de Produtos

Sistema de gerenciamento de produtos desenvolvido como parte do processo seletivo para estágio em Desenvolvimento WEB. A aplicação conta com uma API RESTful em Java (Spring Boot) e um Frontend moderno em React.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 21** com **Spring Boot 3**
- **Spring Data JPA** (Persistência de dados)
- **MySQL** (Banco de dados)
- **Lombok** (Produtividade de código)
- **Maven** (Gerenciamento de dependências)

### Frontend
- **React** (Vite)
- **Bootstrap 5** & **React-Bootstrap** (Interface Responsiva)
- **Axios** (Consumo de API)

---

## ⚙️ Pré-requisitos

Para rodar o projeto, você precisará ter instalado:
1.  **Java JDK 21** ou superior.
2.  **Node.js** (v18 ou superior).
3.  **MySQL Server**.

---

## 🛠️ Como Rodar o Projeto

### 1. Configuração do Banco de Dados (MySQL)
Antes de iniciar, crie um banco de dados vazio:
```sql
CREATE DATABASE catalogo_reinaldin;
```
Nota: Verifique o arquivo src/main/resources/application.properties no Backend para ajustar seu usuário e senha do banco, se necessário.

### 2\. Rodando o Backend (API)

1.  Abra o terminal na pasta `backend`.

2.  Execute o comando:

    ```
    ./mvnw spring-boot:run
    ```

    *Ou abra o projeto na sua IDE de preferência (IntelliJ/VS Code) e execute a classe `CatalogoApplication.java`.*

3.  O sistema irá criar as tabelas automaticamente e popular as categorias iniciais.

4.  A API estará rodando em: `http://localhost:8080`

### 3\. Rodando o Frontend (React)

1.  Abra um novo terminal na pasta `frontend`.

2.  Instale as dependências:

    ```
    npm install
    ```

3.  Inicie o servidor de desenvolvimento:

    ```
    npm run dev
    ```

4.  Acesse a aplicação no navegador (geralmente em `http://localhost:5173`).

* * * * *

✅ Funcionalidades Implementadas
-------------------------------

-   [x] Listagem de produtos em Cards.

-   [x] Filtro dinâmico por Nome (mínimo 3 letras) e Categoria.

-   [x] Cadastro de novos produtos via Modal.

-   [x] Feedback visual (Loader, Alertas de sucesso/vazio).

-   [x] Responsividade (Mobile e Desktop).

* * * * *

Desenvolvido por **Weslley Luiz Kampa**.