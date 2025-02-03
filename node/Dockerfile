FROM node:18

# Instalar dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xvzf dockerize-linux-amd64-v0.6.1.tar.gz && \
    mv dockerize /usr/local/bin/

# Definir o diretório de trabalho no container
WORKDIR /usr/app

# Copiar apenas os arquivos essenciais para evitar problemas com node_modules
COPY package.json /usr/app

# Instalar as dependências
RUN npm install
# Copiar o restante dos arquivos do projeto
COPY . .

RUN npm install


# Iniciar o servidor Node.js
CMD ["node", "server.js"]