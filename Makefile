.PHONY: setup test lint format build clean

setup:
	npm install

test:
	npm run test

lint:
	npm run lint
	npm run format:check
	npm run typecheck

format:
	npm run format

build:
	npm run build

clean:
	rm -rf .next out node_modules coverage
