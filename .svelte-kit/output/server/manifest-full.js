export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BOP5Z-vA.js",app:"_app/immutable/entry/app.DVtTBKxf.js",imports:["_app/immutable/entry/start.BOP5Z-vA.js","_app/immutable/chunks/lc-mSxDD.js","_app/immutable/chunks/CN-qb-uX.js","_app/immutable/chunks/CQgYML3N.js","_app/immutable/entry/app.DVtTBKxf.js","_app/immutable/chunks/CN-qb-uX.js","_app/immutable/chunks/DxSt_0Ib.js","_app/immutable/chunks/BiP4rAbC.js","_app/immutable/chunks/CQgYML3N.js","_app/immutable/chunks/BR1qU2EX.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/wiki/button",
				pattern: /^\/wiki\/button\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
