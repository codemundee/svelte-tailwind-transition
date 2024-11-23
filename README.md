# Svelte Tailwind Transition

```bash
# install with npm
npm install svelte-tailwind-transition

# install with yarn
yarn add svelte-tailwind-transition

# install with pnpm
pnpm add svelte-tailwind-transition
```

## Setup

setup your Tailwind configuration

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-tailwind-transition/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {}
	},
	plugins: []
};
```

## Example

```svelte
<script lang="ts">
	import Transition from 'svelte-tailwind-transition';
	let run: boolean = $state(false);
	let show: boolean = $state(false);
</script>

<div class="mb-4">
	<button
		class="rounded bg-blue-300 px-2 py-1"
		onclick={() => {
			if (!run) {
				show = !show;
				run = true;
			}
		}}
	>
		Click
	</button>
</div>
<Transition
	{show}
	enter="duration-1000"
	enterFrom="scale-y-0 opacity-0"
	enterTo="scale-y-100 opacity-100"
	leave="duration-1000"
	leaveFrom="scale-y-100 opacity-100"
	leaveTo="scale-y-0 opacity-0"
	beforeEnter={() => console.log('beforeEnter')}
	afterEnter={() => {
		console.log('afterEnter');
		run = false;
	}}
	beforeLeave={() => console.log('beforeLeave')}
	afterLeave={() => {
		console.log('afterLeave');
		run = false;
	}}
>
	<div class="block w-24 origin-top overflow-hidden rounded bg-red-500">
		<ul>
			<li>Menu 1</li>
			<li>Menu 2</li>
			<li>Menu 3</li>
			<li>Menu 4</li>
		</ul>
	</div>
</Transition>
```

## Props

| Prop Name   | Type     | Default Value |
| ----------- | -------- | ------------- |
| children    | Snippet  |               |
| show        | boolean  | false         |
| enter       | string   |               |
| enterFrom   | string   |               |
| enterTo     | string   |               |
| leave       | string   |               |
| leaveFrom   | string   |               |
| leaveTo     | string   |               |
| beforeEnter | function |               |
| afterEnter  | function |               |
| beforeLeave | function |               |
| afterLeave  | function |               |
