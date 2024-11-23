import type { Snippet } from 'svelte';

export interface Props {
	children: Snippet;
	show?: boolean;
	enter?: string;
	enterFrom?: string;
	enterTo?: string;
	leave?: string;
	leaveFrom?: string;
	leaveTo?: string;
	beforeEnter?: () => void;
	afterEnter?: () => void;
	beforeLeave?: () => void;
	afterLeave?: () => void;
}

export {};
