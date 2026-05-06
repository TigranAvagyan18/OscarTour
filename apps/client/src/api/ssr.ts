import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext, GetServerSideProps, GetServerSidePropsResult } from "next";
import { me, User } from "@/generated";
import { AXIOS_INSTANCE } from "./client";

type Props = { [key: string]: unknown };
export type SSRContext = GetServerSidePropsContext & { user?: User };
type SSRMiddleware = (ctx: SSRContext) => Promise<GetServerSidePropsResult<Props | undefined>>;

export const prefetchData = async () => {
	const queryClient = new QueryClient();

	const getProps = () => ({ dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) });

	return [queryClient, getProps] as const;
};

export const SSR = (middleware: SSRMiddleware): GetServerSideProps => {
	return async (ctx: SSRContext) => {
		const props = {
			...{
				query: ctx.query ?? null,
				resolvedUrl: ctx.resolvedUrl ?? null,
				params: ctx.params ?? null,
				locales: ctx.locales ?? [],
				locale: ctx.locale ?? null,
				defaultLocale: ctx.defaultLocale ?? null,
			},
		};
		const { token } = ctx.req.cookies;
		AXIOS_INSTANCE.defaults.headers.common.cookie = `token=${token}`;
		AXIOS_INSTANCE.defaults.withCredentials = true;
		try {
			const resp = await me();
			ctx.user = resp;
		} catch (error) {
			//@ts-expect-error its here
			ctx.user = null;
		}
		const middlewareResult = await middleware(ctx);
		if ("redirect" in middlewareResult || "notFound" in middlewareResult) return middlewareResult;
		if ("props" in middlewareResult) Object.assign(props, middlewareResult.props);
		return { props };
	};
};
