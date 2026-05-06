import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface TabConfig {
	value: string;
	label: string;
	icon?: React.ComponentType<{ className?: string }>;
	content: React.ReactNode;
}

interface URLSyncedTabsProps {
	tabs: TabConfig[];
	defaultTab?: string;
	className?: string;
	tabsListClassName?: string;
}

export const URLSyncedTabs: React.FC<URLSyncedTabsProps> = ({
	tabs,
	defaultTab,
	className = "space-y-6",
	tabsListClassName,
}) => {
	const router = useRouter();
	const queryTab = router.query.tab as string | undefined;

	const [activeTab, setActiveTab] = useState(() => {
		const initial =
			queryTab && tabs.some((t) => t.value === queryTab) ? queryTab : defaultTab || tabs[0]?.value || "overview";
		return initial;
	});

	useEffect(() => {
		if (router.isReady) {
			const validTab = queryTab && tabs.some((t) => t.value === queryTab);
			if (validTab && queryTab !== activeTab) {
				setActiveTab(queryTab);
			} else if (!queryTab) {
				const fallback = defaultTab || tabs[0]?.value || "overview";
				if (fallback !== activeTab) {
					setActiveTab(fallback);
				}
			}
		}
	}, [queryTab, router.isReady]);

	const handleTabChange = (value: string) => {
		if (value === activeTab) return;

		setActiveTab(value);
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, tab: value },
			},
			undefined,
			{ shallow: true },
		);
	};

	const getTabUrl = (tabValue: string) => {
		return {
			pathname: router.pathname,
			query: { ...router.query, tab: tabValue },
		};
	};

	const handleTabClick = (e: React.MouseEvent, value: string) => {
		if (e.ctrlKey || e.metaKey || e.button === 1) {
			return;
		}

		e.preventDefault();
		handleTabChange(value);
	};

	return (
		<Tabs value={activeTab} onValueChange={handleTabChange} className={className}>
			<TabsList className={tabsListClassName}>
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2" asChild>
							<Link
								href={getTabUrl(tab.value)}
								onClick={(e) => handleTabClick(e, tab.value)}
								onAuxClick={(e) => {
									if (e.button === 1) {
										e.preventDefault();
									}
								}}
							>
								{Icon && <Icon className="h-4 w-4" />}
								{tab.label}
							</Link>
						</TabsTrigger>
					);
				})}
			</TabsList>

			{tabs.map((tab) => (
				<TabsContent key={tab.value} value={tab.value}>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
};
