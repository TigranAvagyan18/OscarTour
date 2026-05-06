import React, { useCallback, useState } from "react";
import { ShoppingCart, User, Search, Flower2, Menu, X, Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactCountryFlag from "react-country-flag";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/providers/TranslationProvider";
import { Language, languages } from "@/i18n";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Header: React.FC = () => {
	const { getCartCount } = useCart();
	const { getWishlistCount } = useWishlist();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();

	const { language, changeLanguage, t } = useTranslation();
	const { user, logout, isAuthorized } = useAuth();

	const handleLanguageChange = (lang: Language) => {
		changeLanguage(lang);
	};

	const getProfileHref = useCallback(() => {
		const role = user?.role;
		if (role === "courier") return "/courier/dashboard";
		if (role === "organization") return "/shop/dashboard";
		if (role === "location") return "/location/dashboard";
		if (role === "admin") return "/admin";
		return "/profile";
	}, [user]);

	const handleLogout = () => {
		logout("/auth");
	};

	const isActive = (path: string) => {
		return router.pathname.startsWith(path);
	};

	const currentLang = languages.find((l) => l.code === language);

	return (
		<>
			{isMobileMenuOpen && <style>{`html,body { overflow: hidden !important; }`}</style>}
			<div className="h-[64px] sm:h-[84px]"></div>
			<header className="fixed left-0 right-0 top-0 z-[15] bg-white shadow-md">
				{isAuthorized && user?.role !== "user" && (
					<div className="flex w-full items-center justify-center bg-yellow-600 text-white">
						<span className="font-medium uppercase">{user?.role}</span>
					</div>
				)}
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center">
							<button
								onClick={() => setIsMobileMenuOpen(true)}
								className="p-2 text-gray-700 hover:text-pink-600 md:hidden"
							>
								<Menu size={24} />
							</button>

							<Link
								href="/"
								className={cn("flex items-center space-x-2 text-pink-600 transition-colors hover:text-pink-700")}
							>
								<Flower2 size={32} />
								<span className="text-xl font-bold">FlowerFinder</span>
							</Link>
						</div>

						<nav className="hidden space-x-8 md:flex">
							<Link
								href="/flowers"
								className={cn(
									"font-medium transition-colors hover:text-pink-600",
									isActive("/flowers") ? "text-pink-600" : "text-gray-700",
								)}
							>
								{t("common.navigation.flowers")}
							</Link>
							<Link
								href="/plants"
								className={cn(
									"font-medium transition-colors hover:text-pink-600",
									isActive("/plants") ? "text-pink-600" : "text-gray-700",
								)}
							>
								{t("common.navigation.plants")}
							</Link>
							<Link
								href="/accessories"
								className={cn(
									"font-medium transition-colors hover:text-pink-600",
									isActive("/accessories") ? "text-pink-600" : "text-gray-700",
								)}
							>
								{t("common.navigation.accessories")}
							</Link>
							<Link
								href="/subscription"
								className={cn(
									"font-medium transition-colors hover:text-pink-600",
									isActive("/subscription") ? "text-pink-600" : "text-gray-700",
								)}
							>
								{t("common.navigation.subscription")}
							</Link>
						</nav>

						<div className="flex items-center space-x-4">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="hidden rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 md:flex">
										<ReactCountryFlag
											countryCode={
												currentLang?.code === "en"
													? "GB"
													: currentLang?.code === "nl"
													  ? "BE"
													  : currentLang?.code || "GB"
											}
											svg
											style={{
												width: "24px",
												height: "18px",
											}}
										/>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-40">
									{languages.map((lang) => (
										<DropdownMenuItem
											key={lang.code}
											onClick={() => handleLanguageChange(lang.code)}
											className="flex cursor-pointer items-center gap-3"
										>
											<ReactCountryFlag
												countryCode={lang.code === "en" ? "GB" : lang.code === "nl" ? "BE" : lang.code}
												svg
												style={{
													width: "24px",
													height: "18px",
												}}
											/>
											<span className="font-medium">{lang.name}</span>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>

							{/* <DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="hidden items-center space-x-1 rounded-md px-2 py-1 text-gray-700 transition-colors hover:bg-gray-50 hover:text-pink-600 md:flex">
										<DollarSign size={16} />
										<span className="text-sm font-medium">{selectedCurrency}</span>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-40">
									{currencies.map((currency) => (
										<DropdownMenuItem
											key={currency.code}
											onClick={() => setSelectedCurrency(currency.code)}
											className="flex cursor-pointer items-center space-x-3"
										>
											<span className="font-medium">{currency.symbol}</span>
											<div>
												<div className="font-medium">{currency.code}</div>
												<div className="text-xs text-gray-500">{currency.name}</div>
											</div>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu> */}

							<div className="h-4 w-px bg-gray-300"></div>

							{(!user?.role || user?.role === "user") && (
								<Link href="/wishlist" className="relative text-gray-700 transition-colors hover:text-pink-600">
									<Heart size={20} />
									{getWishlistCount() > 0 && (
										<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
											{getWishlistCount()}
										</span>
									)}
								</Link>
							)}
							<Link href={getProfileHref()} className="text-gray-700 transition-colors hover:text-pink-600">
								<User size={20} />
							</Link>
							{user?.role && user?.role !== "user" && (
								<button onClick={handleLogout} className="text-gray-700 transition-colors hover:text-pink-600">
									<LogOut size={20} />
								</button>
							)}
							{(!user?.role || user?.role === "user") && (
								<Link href="/cart" className="relative text-gray-700 transition-colors hover:text-pink-600">
									<ShoppingCart size={20} />
									{getCartCount() > 0 && (
										<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
											{getCartCount()}
										</span>
									)}
								</Link>
							)}
						</div>
					</div>
				</div>
			</header>

			{isMobileMenuOpen && (
				<>
					<div
						className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
						onClick={() => setIsMobileMenuOpen(false)}
					/>
					<div className="fixed inset-x-0 top-0 z-50 h-full w-full overflow-hidden bg-white md:hidden">
						<div className="flex items-center justify-between border-b border-gray-200 p-4">
							<h2 className="text-lg font-semibold text-gray-900">{t("common.navigation.menu")}</h2>
							<button
								onClick={() => setIsMobileMenuOpen(false)}
								className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
							>
								<X size={20} />
							</button>
						</div>

						<div className="h-full overflow-y-auto p-4">
							<div className="space-y-1">
								<div className="pb-4">
									<div className="relative">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<Search size={16} className="text-gray-400" />
										</div>
										<input
											type="text"
											placeholder={t("common.navigation.search")}
											className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-pink-500"
										/>
									</div>
								</div>

								<Link
									href="/flowers"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex items-center rounded-lg px-3 py-3 text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600"
								>
									{t("common.navigation.flowers")}
								</Link>
								<Link
									href="/plants"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex items-center rounded-lg px-3 py-3 text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600"
								>
									{t("common.navigation.plants")}
								</Link>
								<Link
									href="/accessories"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex items-center rounded-lg px-3 py-3 text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-600"
								>
									{t("common.navigation.accessories")}
								</Link>

								<div className="border-t border-gray-200 pt-4">
									<div className="space-y-1">
										{languages.map((lang) => (
											<button
												key={lang.code}
												onClick={() => {
													handleLanguageChange(lang.code);
													setIsMobileMenuOpen(false);
												}}
												className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors ${
													lang.code === language
														? "bg-pink-100 text-pink-600"
														: "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
												}`}
											>
												<span className="mr-3 text-lg">{lang.flag}</span>
												<span>{lang.name}</span>
											</button>
										))}
									</div>
								</div>

								<div className="pt-4">
									<Link
										href="/builder"
										onClick={() => setIsMobileMenuOpen(false)}
										className="flex w-full items-center justify-center rounded-lg bg-pink-500 px-4 py-3 font-medium text-white transition-colors hover:bg-pink-600"
									>
										{t("common.navigation.createBouquet")}
									</Link>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Header;
