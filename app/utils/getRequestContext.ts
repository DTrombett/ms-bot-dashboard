import { getRequestContext as getContext } from "@cloudflare/next-on-pages";

const getRequestContext = () => {
	try {
		return getContext();
	} catch (err) {
		return undefined;
	}
};

export default getRequestContext;
