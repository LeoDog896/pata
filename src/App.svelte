<script lang="ts">
	import { customStore } from "./gunStore"
	import Gun from "gun/gun"

	const namespace = "alpha-0.0.1"
	const gun = Gun();
	const messages = customStore(gun.get(namespace).get("messages").map(), {
		add: content => ref.set({ content, author: {} }),
		delete: key => ref.get(key).put(null)
	})

	interface User {

	}

	interface Message {
		author: User;
		content: string;
	}

	let typedMessage = ""

	const inputMessage = (event: KeyboardEvent) => {
		if (event.key == "Enter") {
			messages.add(typedMessage)
			typedMessage = ""
		}
	}
</script>

<main>
	{#each $messages as message}
		<p>{message.content}</p>
	{/each}
	<input bind:value={typedMessage} on:keyup={inputMessage} placeholder="Type your message; Press enter to send">
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>