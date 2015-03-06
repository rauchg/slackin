
BABEL = ./node_modules/.bin/babel

all: node

node: lib
	@mkdir -p node/assets/
	@rm -rf node/assets/*
	@cp -r lib/assets node/
	@for path in lib/*.js; do \
		file=`basename $$path`; \
		$(BABEL) "lib/$$file" > "node/$$file"; \
	done
