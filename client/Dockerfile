FROM node:16-alpine
WORKDIR /app
COPY ./package.json .
RUN npm install -y
COPY . .
RUN npm run build

FROM nginx
# nginx image only exposes 80 by default
EXPOSE 3000
COPY --from=0 /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf