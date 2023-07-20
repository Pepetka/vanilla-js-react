import {createElement} from "../utils/render.ts";
import TestComponent from "../components/TestComponent/TestComponent.ts";
import {ComponentType} from "../types/types.ts";

const TestPage: ComponentType = () => {
	return () => createElement('div', { class: 'page' }, TestComponent());
};

export default TestPage;
