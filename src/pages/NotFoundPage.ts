import {createElement} from "../utils/render.ts";
import {ComponentType} from "../types/types.ts";

const NotFoundPage: ComponentType = () => {
	return () => createElement('h1', null, () => 'Not Found Page');
};

export default NotFoundPage;
