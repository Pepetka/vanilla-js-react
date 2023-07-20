import {ComponentType} from "../types/types.ts";
import usePathParams from "../hooks/usePathParams.ts";
import {CharacterPathParams} from "../router/routerConfig.ts";

const CharPage: ComponentType = () => {
	const { charId } = usePathParams<Record<CharacterPathParams, string>>();

	return () => `
		<h1>Char Page - ${charId}</h1>
	`
}

export default CharPage;
