import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ADMIN_TOKEN_KEY = 'admin_token';

interface AdminAuthContextValue {
	token: string | null;
	isLoading: boolean;
	setToken: (token: string) => void;
	logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [token, setTokenState] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const stored = localStorage.getItem(ADMIN_TOKEN_KEY);
		if (stored) {
			setTokenState(stored);
			setIsLoading(false);
		} else {
			router.replace('/admin/login');
		}
	}, []);

	const setToken = (value: string) => {
		localStorage.setItem(ADMIN_TOKEN_KEY, value);
		setTokenState(value);
	};

	const logout = () => {
		localStorage.removeItem(ADMIN_TOKEN_KEY);
		setTokenState(null);
		router.replace('/admin/login');
	};

	return (
		<AdminAuthContext.Provider value={{ token, isLoading, setToken, logout }}>
			{children}
		</AdminAuthContext.Provider>
	);
}

export function useAdminAuth() {
	const ctx = useContext(AdminAuthContext);
	if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
	return ctx;
}
