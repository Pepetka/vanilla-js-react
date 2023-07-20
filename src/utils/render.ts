import { Properties } from 'csstype';
import { IState } from "../hooks/useState.ts";

type StyleKeysType = Exclude<keyof ElementCSSInlineStyle["style"], 'length' | 'parentRule'>;

type ChildrenType = (() => (ICreateElementReturn | string))[];

interface IPropsReturn {
	style?: Properties,
	state?: IState<any>,
	children: ChildrenType,
	[key: string]: string | ((event: any) => void) | Properties | IState<any> | ChildrenType | undefined;
}

interface IProps {
	style?: Properties,
	state?: IState<any>,
	[key: string]: string | ((event: any) => void) | Properties | IState<any> | undefined
}

interface ICreateElementReturn {
	type: keyof HTMLElementTagNameMap;
	props: IPropsReturn;
}

export type CreateElementType = (
	type: keyof HTMLElementTagNameMap,
	props: IProps | null,
	...children: ChildrenType
) => ICreateElementReturn;

const createElement: CreateElementType = (
	type,
	props,
	...children
) => {
	const element: ICreateElementReturn = {
		type,
		props: {
			children,
			...props,
		},
	}

	return element;
};

const removeElement = (container: HTMLElement) => {
	container.innerHTML = '';
};

const render = (renderElement: (() => ICreateElementReturn | string), container: HTMLElement, innerHtml: boolean = true ) => {
	const element = renderElement();

	if (typeof element === 'string') {
		if (innerHtml) {
			container.innerHTML = element;
			return;
		}

		container.appendChild(document.createTextNode(element));
		return;
	}

	const { type, props } = element;
	const node = document.createElement(type);

	for (const attr of Object.keys(props)) {
		if (attr === 'children') {
			continue;
		}

		const event = attr.match(/^on([A-Z]\w+)$/);

		if (event) {
			const onEvent = (e: any) => {
				e.preventDefault();
				(props[attr] as (e: any) => void)(e);
			};
			node.addEventListener(event[1].toLowerCase(), onEvent);

			continue;
		}

		if (attr === 'state') {
			(props[attr]!).setOnChange(() => {
				node.replaceWith(render(renderElement, container, innerHtml)!);
			});

			continue;
		}

		if (attr === 'style') {
			Object.entries(props[attr]!).forEach(([key, value]) => {
				node.style[key as StyleKeysType] = value;
			});

			continue;
		}

		node.setAttribute(attr, props[attr] as string);
	}

	for (const child of props.children) {
		render(child, node);
	}

	container.appendChild(node);

	return node;
};

export {
	createElement,
	removeElement,
	render,
}
