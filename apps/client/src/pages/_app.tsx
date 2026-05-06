import { Inter } from "next/font/google";

import "../index.css";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PagesProgressProvider as ProgressProvider } from "@bprogress/next";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationProvider } from "../providers/TranslationProvider";
import { AdminAuthProvider } from "../providers/AdminAuthProvider";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const isAdmin = router.pathname.startsWith('/admin');
	const isAdminLogin = router.pathname === '/admin/login';
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 86400,
					},
				},
			}),
	);

	useEffect(() => {
		posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
			api_host: "/relay-Ke9c",
			ui_host: "https://eu.posthog.com",
			person_profiles: "always",
			defaults: "2025-05-24",
			loaded: (posthog) => {
				if (process.env.NODE_ENV === "development") posthog.debug();
			},
		});
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ProgressProvider height="3px" color="#DB2777" options={{ showSpinner: false }} shallowRouting>
					<PostHogProvider client={posthog}>
						<TranslationProvider>
								<TooltipProvider>
									<main className={cn("min-h-screen", fontSans.className)}>
										{isAdmin && !isAdminLogin ? (
											<AdminAuthProvider>
												<Component {...pageProps} />
											</AdminAuthProvider>
										) : isAdminLogin ? (
											<Component {...pageProps} />
										) : (
											<Layout>
												<Component {...pageProps} />
											</Layout>
										)}
										<Toaster richColors />
										<ReactQueryDevtools />
									</main>
								</TooltipProvider>
						</TranslationProvider>
					</PostHogProvider>
				</ProgressProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
