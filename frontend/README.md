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