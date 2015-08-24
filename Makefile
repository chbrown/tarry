BIN := node_modules/.bin

all: index.js arrays.d.ts

$(BIN)/tsc:
	npm install

index.js: index.ts $(BIN)/tsc
	$(BIN)/tsc --module commonjs --target ES5 $<

arrays.d.ts: index.ts $(BIN)/tsc
	sed 's:^//// ::g' $< > module.ts
	$(BIN)/tsc --module commonjs --target ES5 --declaration module.ts
	sed 's:export declare module arrays:declare module "arrays":' <module.d.ts >$@
	rm module.{ts,d.ts,js}
