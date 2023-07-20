import {createElement} from "../../utils/render.ts";
import "./NavBarComponent.css";
import {
	getAboutPagePath,
	getMainPagePath,
	getTestPagePath,
	RouterEnum
} from "../../router/routerConfig.ts";
import {ComponentType} from "../../types/types.ts";
import useNavigate from "../../hooks/useNavigate.ts";

interface ILinkArray {
	href: string;
	content: string;
}

const NavBarComponent: ComponentType = () => {
	const navigate = useNavigate();

	const linkArray: ILinkArray[] = [
		{
			content: RouterEnum.MAIN,
			href: getMainPagePath(),
		},
		{
			content: RouterEnum.ABOUT,
			href: getAboutPagePath(),
		},
		{
			content: RouterEnum.TEST,
			href: getTestPagePath(),
		}
	];

	const linkElements = linkArray.map(({ href, content }) => {
		const link = () => createElement('a', { href, onClick: () => navigate(href) }, () => content);
		return () => createElement('li', { class: 'link' }, link)
	});
	const linkList = () => createElement('ul', { class: 'linkList' }, ...linkElements);

	return () => createElement('nav', { class: 'nav' }, linkList);
};

export default NavBarComponent;
