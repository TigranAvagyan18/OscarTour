import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface SidebarItemConfig {
	value: string;
	label: string;
	icon?: React.ComponentType<{ className?: string }>;
	content: React.ReactNode;
	badge?: number;
	externalUrl?: string;
}

interface URLSyncedSidebarProps {
	items: SidebarItemConfig[];
	defaultItem?: string;
	className?: string;
	sidebarClassName?: string;
	contentClassName?: string;
}

export const URLSyncedSidebar: React.FC<URLSyncedSidebarProps> = ({
	items,
	defaultItem,
	className = "",
	sidebarClassName = "",
	contentClassName = "",
}) => {
	const router = useRouter();
	const queryTab = router.query.tab as string | undefined;

	const [activeItem, setActiveItem] = useState(() => {
		const initial =
			queryTab && items.some((i) => i.value === queryTab) ? queryTab : defaultItem || items[0]?.value || "overview";
		return initial;
	});

	useEffect(() => {
		if (router.isReady) {
			const validTab = queryTab && items.some((i) => i.value === queryTab);
			if (validTab && queryTab !== activeItem) {
				setActiveItem(queryTab);
			} else if (!queryTab) {
				const fallback = defaultItem || items[0]?.value || "overview";
				if (fallback !== activeItem) {
					setActiveItem(fallback);
				}
			}
		}
	}, [queryTab, router.isReady]);

	const handleItemChange = (value: string) => {
		if (value.startsWith("/")) {
			window.location.href = value;
			return;
		}
		if (value === activeItem) return;

		setActiveItem(value);
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, tab: value },
			},
			undefined,
			{ shallow: true },
		);
	};

	const getItemUrl = (itemValue: string) => {
		if (itemValue.startsWith("/")) {
			return itemValue;
		}
		return {
			pathname: router.pathname,
			query: { ...router.query, tab: itemValue },
		};
	};

	const handleItemClick = (e: React.MouseEvent, value: string) => {
		if (e.ctrlKey || e.metaKey || e.button === 1) {
			return;
		}

		e.preventDefault();
		handleItemChange(value);
	};

	const activeContent = items.find((item) => item.value === activeItem)?.content;

	return (
		<div className={cn("flex min-h-[calc(100vh-200px)] gap-6", className)}>
			<aside
				className={cn(
					"sticky top-24 h-fit max-h-[calc(100vh-80px)] w-64 flex-shrink-0 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-sm",
					sidebarClassName,
				)}
			>
				<nav className="space-y-1 p-3">
					{items.map((item) => {
						const Icon = item.icon;
						const isActive = item.value === activeItem;

						return (
							<Link
								key={item.value}
								href={getItemUrl(item.value)}
								onClick={(e) => handleItemClick(e, item.value)}
								onAuxClick={(e) => {
									if (e.button === 1) {
										e.preventDefault();
									}
								}}
								className={cn(
									"flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
									isActive
										? "bg-blue-50 text-blue-700 shadow-sm"
										: "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
								)}
							>
								{Icon && (
									<Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-blue-600" : "text-slate-500")} />
								)}
								<span className="flex-1">{item.label}</span>
								{item.badge !== undefined && item.badge > 0 && (
									<Badge variant="destructive" className="ml-auto">
										{item.badge}
									</Badge>
								)}
							</Link>
						);
					})}
				</nav>
			</aside>

			<main className={cn("flex-1 overflow-y-auto", contentClassName)}>{activeContent}</main>
		</div>
	);
};
