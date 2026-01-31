FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración
COPY package.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY src ./src

# Build
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Iniciar servidor
CMD ["npm", "start"]
