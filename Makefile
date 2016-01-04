BIN := node_modules/.bin
MOCHA_ARGS := --compilers js:babel-core/register tests/

all: index.js index.d.ts

$(BIN)/tsc $(BIN)/istanbul $(BIN)/_mocha $(BIN)/coveralls:
	npm install

index.js index.d.ts: index.ts $(BIN)/tsc
	$(BIN)/tsc -d

test: index.js $(BIN)/istanbul $(BIN)/_mocha $(BIN)/coveralls
	$(BIN)/istanbul cover $(BIN)/_mocha -- $(MOCHA_ARGS) -R spec
	cat coverage/lcov.info | $(BIN)/coveralls || true
