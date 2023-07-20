import router from "../router/router.ts";

const usePathParams = <T extends Record<string, string>>() => {
	return router.getPathParams() as T;
}

export default usePathParams;
