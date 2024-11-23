<script lang="ts">
	import Transition from '$lib/index.js';
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
			<li>xxxx</li>
			<li>xxxx</li>
			<li>xxxx</li>
			<li>xxxx</li>
			<li>xxxx</li>
		</ul>
	</div>
</Transition>
