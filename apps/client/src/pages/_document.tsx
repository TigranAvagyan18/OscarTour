import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="be">
			<Head>
				{/* Character encoding and viewport */}
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
				<link rel="shortcut icon" href="/fav.ico" type="image/x-icon" />
				<link rel="icon" href="/fav.ico" type="image/x-icon" />
				<link rel="apple-touch-icon" href="/fav.ico" />
				<link rel="icon" type="image/svg+xml" href="/logo.svg" />
			</Head>
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
