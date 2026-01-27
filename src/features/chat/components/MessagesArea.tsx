import { Bot, CirclePower, RotateCcw, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { Button } from "@/components/ui/button";

interface MessagesAreaProps {
	onStartChat: (val: boolean) => void;
}

export default function MessagesArea({ onStartChat }: MessagesAreaProps) {
	const { status, messages, sendMessage, stop, regenerate } = useChat({
		transport: new TextStreamChatTransport({ api: "/api/chat" }),
	});

	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const isLoading = status === "streaming" || status === "submitted";
	const isError = status === "error";

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isLoading]);

	const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (input.trim()) onStartChat(true);

		if (!input.trim() || isLoading) return;

		await sendMessage({
			text: input,
		});

		setInput("");
	};

	return (
		<div className='w-full h-[calc(100%-72px)] flex-1 flex flex-col'>
			{/* --- Chat Area --- */}
			<div className='flex-1 overflow-hidden'>
				<div className='h-full overflow-y-auto'>
					<div className='p-4 space-y-6'>
						{messages?.map((m) => (
							<div
								key={m.id}
								className={`flex items-start gap-3 ${
									m.role === "user" ? "flex-row-reverse" : "flex-row"
								}`}>
								{/* Avatar Bubble */}
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
										m.role === "user" ?
											"bg-axon-rose/10 border border-axon-rose/20"
										:	"bg-axon-blue/10 border border-axon-blue/20"
									}`}>
									{m.role === "user" ?
										<User size={14} className='text-axon-rose' />
									:	<Bot size={16} className='text-axon-blue' />}
								</div>

								{/* Message Bubble */}
								<div
									className={`p-3.5 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
										m.role === "user" ?
											"bg-white text-black rounded-tr-sm shadow-sm"
										:	"bg-axon-lighter-blue dark:bg-axon-dark-gray border border-white/10 rounded-tl-sm shadow-sm"
									}`}>
									{m.parts && m.parts.length > 0 ?
										m.parts.map((part, index) => {
											if (part.type === "text")
												return <span key={index}>{part.text}</span>;
											return null;
										})
									:	<span className='whitespace-pre-wrap'>
											{(m as { content?: string }).content ||
												"You have hit the message limit. please wait an hour and try again."}
										</span>
									}
								</div>
							</div>
						))}

						{isError && (
							<>
								<div className='text-red-500'>An error occurred.</div>
								<Button
									type='button'
									variant={"ghost"}
									onClick={() => regenerate()}>
									<RotateCcw size={16} className='text-axon-blue mr-2' />
								</Button>
							</>
						)}

						{/* Loading Animation (Eve Thinking) */}
						{isLoading && (
							<div className='flex items-start gap-3'>
								<div className='w-8 h-8 rounded-full bg-axon-blue/5 border border-axon-blue/10 flex items-center justify-center'>
									<div className='flex gap-1'>
										<span className='w-1 h-1 bg-axon-blue rounded-full animate-bounce delay-0'></span>
										<span className='w-1 h-1 bg-axon-blue rounded-full animate-bounce delay-150'></span>
										<span className='w-1 h-1 bg-axon-blue rounded-full animate-bounce delay-300'></span>
									</div>
								</div>
								<span className='text-xs text-gray-500 pt-2 animate-pulse'>
									Processing...
								</span>
								<Button type='button' variant={"ghost"} onClick={() => stop()}>
									<CirclePower size={16} className='text-red-500 ml-2' />
								</Button>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>
				</div>
			</div>

			{/* --- Input Area --- */}
			<form
				onSubmit={handleSend}
				className='p-4 backdrop-blur-md bg-axon-blue/10 dark:bg-white/5 border-t border-axon-blue/20 dark:border-white/10'>
				<div className='relative flex items-center'>
					<input
						className='w-full mt-auto bottom-0 bg-axon-blue/10 dark:bg-white/5 border border-axon-blue/20 dark:border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-axon-blue/50 focus:border-axon-blue/50 transition-all placeholder:text-gray-500'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						disabled={status !== "ready"}
						placeholder='Ask Eve anything...'
					/>
					<button
						type='submit'
						disabled={status !== "ready"}
						className='absolute right-3 p-2 rounded-full bg-axon-gradient text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all'>
						<Send size={16} />
					</button>
				</div>
			</form>
		</div>
	);
}
