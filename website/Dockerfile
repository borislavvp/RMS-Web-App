# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app

COPY ["package.json", "./"]
COPY ["tsconfig.json", "./"]
RUN npm install

COPY [".", "./"]
RUN ls -al
RUN npm run build

FROM nginx:stable-alpine 
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]