interface Route {
	path: string;
	callback: (path: string) => void
}

class Router {
	routes: Route[];
	mode: "history" | "hash" = "hash";
	root: string = '/';
	initialPath: string = this.root;

	constructor(options?: {mode?: "history" | "hash"; root?: string; initialPath?: string;}) {
		this.routes = [];
		if (options?.mode) this.mode = options.mode === 'history' && !!(history.pushState) ? 'history' : 'hash';
		if (options?.root) this.root = `/${this.clearSlashes(options.root)}/`;
		if (options?.initialPath) this.initialPath = `/${this.clearSlashes(options.initialPath)}`;
	}

	add = (path: Route['path'], callback: Route['callback']) => {
		this.routes.push({ path, callback });

		return this;
	};


	remove = (path: Route['path']) => {
		const routeIndex = this.routes.findIndex((route) => route.path === path);
		this.routes.slice(routeIndex, 1);

		return this;
	};

	flush = () => {
		this.routes = [];

		return this;
	};

	clearSlashes = (path: Route['path']) => {
		return path
			.toString()
			.replace(/^\//, "")
			.replace(/\/$/, "");
	};

	getFragment = () => {
		let fragment: string = "";

		if (this.mode === 'history') {
			fragment = decodeURI(window.location.pathname + window.location.search);
			fragment = fragment.replace(/\?(.*)$/, "");
			fragment = this.root !== "/" ? fragment.replace(this.root, "") : fragment;
		} else {
			const match = window.location.href.match(/#(.*)$/);
			fragment = match ? match[1] : "";
		}

		return fragment;
	};

	matchPaths = (template: Route['path'], current: Route['path']) => {
		if (template === "*") return false;

		const regexPattern = new RegExp(`^${template.replace(/\//g, '\\/').replace(/:\w+/g, '([^\\/]+)')}\\/?$`);
		return regexPattern.test(current);
	};

	getPathParams = () => {
		const template = this.routes.find((route) => this.matchPaths(route.path, this.getFragment()))?.path;
		const path = this.getFragment();

		if (!template || !path) {
			return {};
		}

		const regexPattern = new RegExp(`^${template.replace(/\//g, '\\/').replace(/:\w+/g, '([^\\/]+)')}\\/?$`);
		const matches = path.match(regexPattern);

		if (!matches) {
			return {};
		}

		const paramNames = template.match(/:\w+/g);
		const params: Record<string, string> = {};

		paramNames?.forEach((param, index) => {
			const paramName = param.slice(1);
			params[paramName] = matches[index + 1];
		});

		return params;
	};

	navigate = (path: Route['path'] = "", options: {replace: boolean} = {replace: false}) => {
		const route = this.clearSlashes(path);

		if (this.mode === 'hash') {
			window.location.href = `${window.location.href.replace(/#(.*)$/, "")}#${route}`;
		}

		if (options.replace) {
			window.history.replaceState(null, "", `${this.root}${route}`);
		}

		window.history.pushState(null, "", `${this.root}${route}`);

		return this;
	};

	current?: string;
	intervalId?: ReturnType<typeof setInterval>;

	interval = () => {
		if (this.current === this.getFragment()) return;
		this.current = this.getFragment();

		const isNotFound = !this.routes.some((route) => {
			const match = this.matchPaths(route.path, this.current!);

			if (match) {
				route.callback.call({}, `${route.path}`);
			}

			return match;
		})

		if (isNotFound) {
			this.routes.some((route) => {
				if (route.path === '*') {
					route.callback.call({}, `${route.path}`);
					return true;
				}

				return false;
			})
		}
	};

	listen = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.interval, 50);
	};

	init = () => {
		this.listen();
	};
}

const router = new Router({mode: "history"});

export default router;
