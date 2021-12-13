<script lang="ts">
	import Gun from 'gun'

	interface User {

	}

	interface Message {
		author: User;
		content: string;
	}

	let typedMessage = ""
	let messages: Message[] = []
	let namespace = "aaaaa"

	const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);
	$: gun.get(namespace).get("messages").put(messages)
	gun.get(namespace).get("messages").on(newMessages => messages = newMessages)

	const inputMessage = (event: KeyboardEvent) => {
		if (event.key == "Enter") {
			messages = [...messages, { author: {}, content: typedMessage }]
			typedMessage = ""
		}
	}
</script>

<main>
	{#each messages as message}
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