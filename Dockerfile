FROM node:18

COPY dist /var/www/
COPY node_modules /var/www/node_modules/
COPY package.json /var/www/

WORKDIR /var/www/

RUN npm run database:create:prod
RUN npm run database:migrate:prod

ENTRYPOINT ["/usr/local/bin/node", "/va/www/src/main.js"]