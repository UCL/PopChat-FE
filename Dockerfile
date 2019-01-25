##### Builder stage

FROM ubuntu:latest as builder

RUN apt-get update

RUN apt-get install -y nodejs npm git

RUN npm install -g @angular/cli

COPY *.json /app/

WORKDIR /app

RUN npm install

COPY . /app

RUN npm install

RUN npm run build --configuration=production

##### NGINX serving stage

FROM nginx:1.15.6-alpine

COPY --from=builder /app/dist/dashboard/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
