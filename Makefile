all: wrapper

build/dist/jquery.js:
	mkdir -p build
	git submodule update --init --recursive
	make -C jquery PREFIX=../build jquery min

wrapper: dist dist/node-jquery.js dist/node-jquery.min.js

dist:
	mkdir -p dist

dist/node-jquery.js: src/header.js build/dist/jquery.js src/footer.js
	cat src/header.js build/dist/jquery.js src/footer.js > dist/node-jquery.js

dist/node-jquery.min.js: src/header.js build/dist/jquery.min.js src/footer.js
	cat src/header.js build/dist/jquery.min.js src/footer.js > dist/node-jquery.min.js

clean:
	rm -rf build dist

.PHONY: all wrapper clean
