export function findChildren(node: HTMLElement) {
	return node.firstElementChild as HTMLElement;
}

export function addClasses(node: HTMLElement, ...classes: string[]) {
	node.classList.add(...classes);
}

export function removeClass(node: HTMLElement, ...classes: string[]) {
	node.classList.remove(...classes);
}

export function classes(classes: string): string[] {
	return classes ? classes.split(' ').filter((x) => x) : [];
}

export function nextFrame() {
	const anim = requestAnimationFrame;
	return new Promise((res) => anim(() => anim(res)));
}

export function transitionEnd(node: HTMLElement, transitions: string[]) {
	if (transitions.length > 0) {
		return new Promise<void>((res) =>
			node.addEventListener(
				'transitionend',
				(e) => {
					e.stopPropagation();
					res();
				},
				{ once: true }
			)
		);
	} else {
		return Promise.resolve();
	}
}

export async function apply(
	node: HTMLElement,
	show: boolean,
	base: string[],
	from: string[],
	to: string[]
) {
	addClasses(node, ...base, ...from);
	const transitioned = transitionEnd(node, base);

	await nextFrame();

	removeClass(node, ...from);
	addClasses(node, ...to);

	await Promise.all([transitioned]);

	removeClass(node, ...base);
}
