import './css/style.css'
import {createElement, removeElement, render} from "./utils/render.ts";
import router from "./router/router.ts";
import routerConfig from "./router/routerConfig.ts";
import NavBarComponent from "./components/NevBarComponent/NavBarComponent.ts";
import {ComponentType} from "./types/types.ts";

window.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector<HTMLDivElement>('#app')!;
	const Outlet: ComponentType = () => () => createElement('div', null);

	render(NavBarComponent(), root);
	const HTMLOutletElement = render(Outlet(), root)!;

	const Page: {Page: ComponentType, path: string}[] = Object.values(routerConfig).map(({ Page, path }) => ({ path, Page }));

	const renderPage = (Page: ComponentType) => () => {
		removeElement(HTMLOutletElement);
		render(Page(), HTMLOutletElement);
	}

	Page.forEach(({path, Page}) => {
		router.add(path, renderPage(Page));
	});

	router.init();
});
