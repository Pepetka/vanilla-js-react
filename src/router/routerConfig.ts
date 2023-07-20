import {ComponentType} from "../types/types.ts";
import MainPage from "../pages/MainPage.ts";
import AboutPage from "../pages/AboutPage.ts";
import TestPage from "../pages/TestPage.ts";
import NotFoundPage from "../pages/NotFoundPage.ts";
import CharPage from "../pages/CharPage.ts";

export enum RouterEnum {
	MAIN = 'Main',
	ABOUT = 'About',
	TEST = 'Test',
	CHAR = 'Character',
	NOT_FOUND_PAGE = 'Not found Page',
}

interface IRouterConfig {
	path: string;
	Page: ComponentType;
}

export const getMainPagePath = () => '/' as const;
export const getAboutPagePath = () => '/about' as const;
export const getTestPagePath = () => '/test' as const;
export const getCharacterPagePath = (charId: string = ':charId') => `/char/${charId}` as const;
export type CharacterPathParams = 'charId';
export const getNotFoundPagePath = () => '*' as const;

const routerConfig: Record<RouterEnum, IRouterConfig> = {
	[RouterEnum.MAIN]: {
		Page: MainPage,
		path: getMainPagePath(),
	},
	[RouterEnum.ABOUT]: {
		Page: AboutPage,
		path: getAboutPagePath(),
	},
	[RouterEnum.TEST]: {
		Page: TestPage,
		path: getTestPagePath(),
	},
	[RouterEnum.CHAR]: {
		Page: CharPage,
		path: getCharacterPagePath(),
	},
	[RouterEnum.NOT_FOUND_PAGE]: {
		Page: NotFoundPage,
		path: getNotFoundPagePath(),
	},
};

export default routerConfig;
