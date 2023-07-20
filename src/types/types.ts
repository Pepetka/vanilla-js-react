import {CreateElementType} from "../utils/render.ts";

type ComponentTypeReturn = (() => ReturnType<CreateElementType>) | (() => string);

export type ComponentType = () => ComponentTypeReturn;
