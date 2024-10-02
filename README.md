# API Routes Documentation

Este documento descreve as rotas disponíveis na aplicação, organizadas por entidade.

## 📂 **Rotas de Company**

- **Base URL:** `/company`

### POST `/company`
**Descrição:** Cria uma nova empresa.

- **Resposta:**
  - **201 Created**: Empresa criada com sucesso
  - **400 Bad Request**: Dados inválidos

### FETCH `/company/name`
**Descrição:** Busca informações de empresas.

- **Resposta:**
  - **200 OK**: Dados das empresas

### PUT `/company/{id}`
**Descrição:** Edita os dados de uma empresa específica.

- **Parâmetros:**
  - `id`: integer, obrigatório

- **Resposta:**
  - **200 OK**: Empresa editada com sucesso
  - **404 Not Found**: Empresa não encontrada

### DELETE `/company/{id}`
**Descrição:** Deleta uma empresa específica.

- **Parâmetros:**
  - `id`: integer, obrigatório

- **Resposta:**
  - **200 OK**: Empresa deletada com sucesso
  - **404 Not Found**: Empresa não encontrada

## 🛠 **Rotas de Order**

- **Base URL:** `/order`

### POST `/order`
**Descrição:** Cria um novo pedido.

- **Resposta:**
  - **201 Created**: Pedido criado com sucesso
  - **400 Bad Request**: Dados inválidos

### FETCH `/order/name**Descrição:** Busca informações de pedidos.

- **Resposta:**
  - **200 OK**: Dados dos pedidos

### PUT `/order/{id}`
**Descrição:** Edita um pedido específico.

- **Parâmetros:**
  - `id`: integer, obrigatório

- **Resposta:**
  - **200 OK**: Pedido editado com sucesso
  - **404 Not Found**: Pedido não encontrado

### DELETE `/order/{id}`
**Descrição:** Deleta um pedido específico.

- **Parâmetros:**
  - `id`: integer, obrigatório

- **Resposta:**
  - **200 OK**: Pedido deletado com sucesso
  - **404 Not Found**: Pedido não encontrado

## 🔧 **Rotas de User**

- **Base URL:** `/user`

### POST `/user`
**Descrição:** Cria um novo usuário.

- **Resposta:**
  - **201 Created**: Usuário criado com sucesso
  - **400 Bad Request**: Dados inválidos

### FETCH `/user/name` 

**Descrição:** Busca informações de usuários.

- **Resposta:**
  - **200 OK**: Dados dos usuários

### DELETE `/user/{id}`
**Descrição:** Deleta um usuário específico.

- **Parâmetros:**
  - `id`: integer, obrigatório

- **Resposta:**
  - **200 OK**: Usuário deletado com sucesso
  - **404 Not Found**: Usuário não encontrado

## 🔄 **Rotas de Transfer**

- **Base URL:** `/transfer`

### POST `/transfer`
**Descrição:** Cria uma nova transferência.

- **Resposta:**
  - **201 Created**: Transferência criada com sucesso
  - **400 Bad Request**: Dados inválidos

### FETCH `/transfer/name`
**Descrição:** Busca informações de transferências.

- **Resposta:**
  - **200 OK**: Dados das transferências

### DELETE `/transfer/{id}`
**Descrição:** Deleta uma transferência específica.

- **Parâmetros:**
  - `id`: integer, obrigatório

- **Resposta:**
  - **200 OK**: Transferência deletada com sucesso
  - **404 Not Found**: Transferência não encontrada

## 📦 **Rotas de Items**

- **Base URL:** `/item`

### POST `/item`
**Descrição:** Cria um novo item.

- **Resposta:**
  - **201 Created**: Item criado com sucesso
  - **400 Bad Request**: Dados inválidos

### FETCH `/item/name`
**Descrição:** Busca informações de itens.

- **Resposta:**
  - **200 OK**: Dados dos itens

### DELETE `/item/{id}`
**Descrição:** Deleta um item específico.

- **Parâmetros:**
  - `id`: integer, obrigatório

- **Resposta:**
  - **200 OK**: Item deletado com sucesso
  - **404 Not Found**: Item não encontrado
"""
