FROM node:alpine
WORKDIR /app
COPY package.json .
RUN yarn
# copy all files
COPY . .
CMD ["yarn", "preview", "--port", "8000"]