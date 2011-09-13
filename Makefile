NODEJS = $(if $(shell test -f /usr/bin/nodejs && echo "true"),nodejs,node)

SUBMODULES = deps/jquery \
			 deps/jsdom \
			 deps/nodeunit

define depend
$(1):
	git submodule update --init --recursive $(1)
endef

all: wrapper



$(foreach dep,$(SUBMODULES),$(eval $(call depend,$(dep))))

build/dist/jquery.js: deps/jquery
	mkdir -p build
	make -C deps/jquery PREFIX=../../build jquery min

wrapper: dist/node-jquery.js dist/node-jquery.min.js

dist:
	mkdir -p dist

dist/node-jquery.js: dist src/header.js build/dist/jquery.js src/footer.js
	cat src/header.js build/dist/jquery.js src/footer.js > dist/node-jquery.js

dist/node-jquery.min.js: dist/node-jquery.js
	uglifyjs dist/node-jquery.js > dist/node-jquery.min.js

clean:
	rm -rf build dist

npm:
	rm -rf dist/*.min.js
	cp package.ender.json dist/package.json; cd dist; npm publish --force ./
#	cp package.node.json dist/package.json; cd dist; npm publish --force ./


test: dist/node-jquery.js deps/nodeunit deps/jsdom
	$(NODEJS) deps/nodeunit/bin/nodeunit test/

.PHONY: all wrapper clean test npm
