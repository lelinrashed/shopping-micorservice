# Use the official Node.js runtime as the base image
FROM node:lts-alpine as development

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install the application dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of the application files to the container
COPY . .

# Generate Prisma files
RUN npx prisma generate

# Build the application
RUN npm run build

FROM node:lts-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install the application dependencies
RUN npm ci --only=production

# Copy the rest of the application files to the container
COPY --from=development /usr/src/app/dist ./dist

# Generate Prisma files
RUN npx prisma generate

# Expose the port on which your Express.js app is running (change it if necessary)
EXPOSE 8001

# Specify the command to start your Express.js app
CMD [ "node", "dist/index.js" ]
