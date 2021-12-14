<script lang="ts">
	import { gun } from "./gunStore"

	const namespace = "alpha-0.0.1"
	const messages = gun.get(namespace).get("messages")
	const mappedMessages = messages.map()

	interface User {

	}

	interface Message {
		author: User;
		content: string;
	}

	let typedMessage = ""

	const inputMessage = (event: KeyboardEvent) => {
		if (event.key == "Enter") {
			messages.put({author: {}, content: typedMessage})
			typedMessage = ""
		}
	}
</script>

<main>
	{#each $mappedMessages as message}
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