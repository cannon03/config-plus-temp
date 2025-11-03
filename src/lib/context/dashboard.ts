import type { DashboardContext } from '$lib/types/dashboard';
import { createContext } from 'svelte';

export const [getDashboardContext, setDashboardContext] = createContext<DashboardContext>();
