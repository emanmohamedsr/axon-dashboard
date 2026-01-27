import express from 'express';
import cors from 'cors';
import { streamText } from 'ai'; // شلنا convertToCoreMessages عشان الخطأ
import { google } from '@ai-sdk/google';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

function cleanMessages(messages) {
	return messages.map(m => {
		let content = m.content;

		if ((!content || typeof content !== 'string') && m.parts) {
			content = m.parts
				.filter(part => part.type === 'text')
				.map(part => part.text)
				.join('');
		}

		return {
			role: m.role,
			content: content || 'You have hit the message limit. please wait an hour and try again.',
		};
	});
}

app.post('/api/chat', async (req, res) => {
	const { messages } = req.body;

	try {
		const cleanHistory = cleanMessages(messages);
		const result = streamText({
			model: google('gemini-2.5-flash'),
			system: "You are EVE, an advanced AI assistant. You are helpful, precise, and have a futuristic tone.",
			messages: cleanHistory,
		});

		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.setHeader('Transfer-Encoding', 'chunked');

		for await (const chunk of result.textStream) {
			res.write(chunk);
		}

		res.end();

	} catch (error) {
		console.error('SERVER ERROR:', error);
		if (!res.headersSent) {
			res.status(500).json({ error: 'Internal Server Error' });
		} else {
			res.end();
		}
	}
});

app.listen(PORT, () => {
	console.log(`✅ Axon AI Server is running on http://localhost:${PORT}`);
});

//** Terminal ai chat */

// import { streamText } from "ai";
// import { google } from "@ai-sdk/google";
// import "dotenv/config";
// import * as readline from "node:readline/promises";


// const terminal = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// });

// const messages = [];

// async function main() {
// 	console.log("Chat started! (Type 'exit' to stop)");

// 	while (true) {
// 		const userInput = await terminal.question("You: ");

// 		if (userInput.toLowerCase() === 'exit') {
// 			terminal.close();
// 			break;
// 		}

// 		messages.push({ role: "user", content: userInput });

// 		try {
// 			const result = streamText({
// 				model: google("gemini-2.5-flash"),
// 				messages,
// 			});

// 			let fullResponse = "";
// 			process.stdout.write("\nAssistant: ");

// 			for await (const delta of result.textStream) {
// 				fullResponse += delta;
// 				process.stdout.write(delta);
// 			}
// 			process.stdout.write("\n\n");

// 			messages.push({ role: "assistant", content: fullResponse });

// 		} catch (error) {
// 			console.error("\nError:", error.message);
// 		}
// 	}
// }

// main().catch(console.error);