# user must not be root
# nginx + php-fpm
# logs to std out

npm install

npm run database:create
npm run migrations:migrate

node main.js