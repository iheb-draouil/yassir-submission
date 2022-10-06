include .env

all: build deploy

build:
	npm run build

deploy:
	docker compose up -d --build