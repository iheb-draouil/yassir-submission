include ./.env.dev

export

run: init-database start-server

start-server:
	npm start

init-database:
	docker run -d -p ${DATABASE_PORT}:3306 -e MYSQL_ROOT_PASSWORD=${DATABASE_PASSWORD} mysql:${MYSQL_VERSION} \
	&& sleep 10 \
	&& npm run database:create:dev \
	&& npm run migrations:migrate

blank-migration:
	npm run migrations:make ${NAME}