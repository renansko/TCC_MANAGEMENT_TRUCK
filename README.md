# API Routes Documentation

Este documento descreve as rotas disponíveis na aplicação, organizadas por entidade.
telemetry_md_content = """
# API Routes Documentation

Este documento descreve as rotas disponíveis na aplicação, organizadas por entidade.

## 📂 **Rotas de Company**

- **Base URL:** `/company`

### POST `/company`
**Descrição:** Cria uma nova empresa.

- **Resposta:**
  - **201 Created**: Empresa criada com sucesso.
  - **400 Bad Request**: Dados inválidos.

### GET `/company/name`
**Descrição:** Busca informações de empresas por nome.

- **Resposta:**
  - **200 OK**: Dados das empresas.

### PUT `/company/{id}`
**Descrição:** Edita os dados de uma empresa específica.

- **Parâmetros:**
  - `id`: integer, obrigatório.

- **Resposta:**
  - **200 OK**: Empresa editada com sucesso.
  - **404 Not Found**: Empresa não encontrada.

### DELETE `/company/{id}`
**Descrição:** Deleta uma empresa específica.

- **Parâmetros:**
  - `id`: integer, obrigatório.

- **Resposta:**
  - **200 OK**: Empresa deletada com sucesso.
  - **404 Not Found**: Empresa não encontrada.

## 🛠 **Rotas de Order**

- **Base URL:** `/order`

### POST `/order`
**Descrição:** Cria um novo pedido.

- **Resposta:**
  - **201 Created**: Pedido criado com sucesso.
  - **400 Bad Request**: Dados inválidos.

### GET `/order/name`
**Descrição:** Busca informações de pedidos por nome.

- **Resposta:**
  - **200 OK**: Dados dos pedidos.

### PUT `/order/{id}`
**Descrição:** Edita um pedido específico.

- **Parâmetros:**
  - `id`: integer, obrigatório.

- **Resposta:**
  - **200 OK**: Pedido editado com sucesso.
  - **404 Not Found**: Pedido não encontrado.

### DELETE `/order/{id}`
**Descrição:** Deleta um pedido específico.

- **Parâmetros:**
  - `id`: integer, obrigatório.

- **Resposta:**
  - **200 OK**: Pedido deletado com sucesso.
  - **404 Not Found**: Pedido não encontrado.

## 🔧 **Rotas de User**

- **Base URL:** `/user`

### POST `/user`
**Descrição:** Cria um novo usuário.

- **Resposta:**
  - **201 Created**: Usuário criado com sucesso.
  - **400 Bad Request**: Dados inválidos.

### GET `/user/name`
**Descrição:** Busca informações de usuários por nome.

- **Resposta:**
  - **200 OK**: Dados dos usuários.

### DELETE `/user/{id}`
**Descrição:** Deleta um usuário específico.

- **Parâmetros:**
  - `id`: integer, obrigatório.

- **Resposta:**
  - **200 OK**: Usuário deletado com sucesso.
  - **404 Not Found**: Usuário não encontrado.

## 🔄 **Rotas de Transfer**

- **Base URL:** `/transfer`

### POST `/transfer`
**Descrição:** Cria uma nova transferência.

- **Resposta:**
  - **201 Created**: Transferência criada com sucesso.
  - **400 Bad Request**: Dados inválidos.

### GET `/transfer/name`
**Descrição:** Busca informações de transferências por nome.

- **Resposta:**
  - **200 OK**: Dados das transferências.

### DELETE `/transfer/{id}`
**Descrição:** Deleta uma transferência específica.

- **Parâmetros:**
  - `id`: integer, obrigatório.

- **Resposta:**
  - **200 OK**: Transferência deletada com sucesso.
  - **404 Not Found**: Transferência não encontrada.

## 📦 **Rotas de Items**

- **Base URL:** `/item`

### POST `/item`
**Descrição:** Cria um novo item.

- **Resposta:**
  - **201 Created**: Item criado com sucesso.
  - **400 Bad Request**: Dados inválidos.

### GET `/item/name`
**Descrição:** Busca informações de itens por nome.

- **Resposta:**
  - **200 OK**: Dados dos itens.

### DELETE `/item/{id}`
**Descrição:** Deleta um item específico.

- **Parâmetros:**
  - `id`: integer, obrigatório.

- **Resposta:**
  - **200 OK**: Item deletado com sucesso.
  - **404 Not Found**: Item não encontrado.

## 🚗 **Rotas de Telemetria**

- **Base URL:** `/telemetry`

### GET `/telemetry/location`
**Descrição:** Busca a geolocalização em tempo real do veículo.

- **Resposta:**
  - **200 OK**: Dados de geolocalização (latitude, longitude).

### GET `/telemetry/fuel`
**Descrição:** Obtém informações sobre o nível de combustível em tempo real.

- **Resposta:**
  - **200 OK**: Dados do nível de combustível.

### GET `/telemetry/speed`
**Descrição:** Obtém a velocidade atual do veículo em tempo real.

- **Resposta:**
  - **200 OK**: Dados de velocidade (km/h).
"""