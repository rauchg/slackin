INJS = $(wildcard lib/*.js)
OUTJS = $(subst lib/,node/,$(INJS))

INASSETS = $(wildcard lib/assets/*)
OUTASSETS = $(subst lib/assets/,node/assets/,$(INASSETS))

BABEL = ./node_modules/.bin/babel

.PHONY: clean

all: node/assets $(OUTJS) $(OUTASSETS)

clean:
	rm -rf node/

node/assets/% : lib/assets/%
	cp $^ $@

node/%.js: lib/%.js
	$(BABEL) $^ > $@

node/assets:
	mkdir -p node/assets/
