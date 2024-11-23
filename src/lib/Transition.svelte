<script lang="ts">
	import { findChildren, apply, classes } from './utils.js';
	import type { Props } from './types.js';

	let {
		children,
		show = false,
		enter = '',
		enterFrom = '',
		enterTo = '',
		leave,
		leaveFrom,
		leaveTo,
		beforeEnter,
		afterEnter,
		beforeLeave,
		afterLeave
	}: Props = $props();

	let rootEl: HTMLElement | undefined = $state.raw(undefined);
	let childrenEl: HTMLElement | undefined = $state.raw(undefined);

	let prevShow: boolean = $state(false);
	let display: 'contents' | 'hidden' = $state(show ? 'contents' : 'hidden');
	let executing: Promise<void> = $state.raw(Promise.resolve());

	let enterClasses = $derived(classes(enter));
	let enterFromClasses = $derived(classes(enterFrom));
	let enterToClasses = $derived(classes(enterTo));

	let leaveClasses = $derived(classes(leave ?? enter));
	let leaveFromClasses = $derived(classes(leaveFrom ?? enterTo));
	let leaveToClasses = $derived(classes(leaveTo ?? enterFrom));

	async function stateEnter() {
		beforeEnter?.();
		display = 'contents';
		await apply(childrenEl!, true, enterClasses, enterFromClasses, enterToClasses);
		afterEnter?.();
	}

	async function stateLeave() {
		beforeLeave?.();
		await apply(childrenEl!, false, leaveClasses, leaveFromClasses, leaveToClasses);
		display = 'hidden';
		afterLeave?.();
	}

	$effect(() => {
		if (prevShow !== show) {
			prevShow = show;
			if (!childrenEl) {
				childrenEl = findChildren(rootEl!);
			}

			// show ? stateEnter() : stateLeave();
			executing = show ? executing.then(stateEnter) : executing.then(stateLeave);
		}
	});
</script>

<div bind:this={rootEl} class={display}>
	{@render children()}
</div>
