FROM node:alpine
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
CMD ["yarn", "preview", "--port", "8000", "--host", "0.0.0.0"]