import MessagesArea from "./MessagesArea";
import StartingView from "./StartingView";
import ChatHeaderView from "./ChatHeaderView";
import { useState } from "react";

const Chatbot = () => {
	const [startChat, setStartChat] = useState(false);
	return (
		<div className='w-full h-full flex items-center justify-center p-4'>
			<div className='relative w-full h-[600px] flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-linear-to-br from-background via-axon-blue/5 to-axon-rose/5 border border-axon-light-blue/20 shadow-2xl'>
				{!startChat ?
					<StartingView />
				:	<ChatHeaderView />}
				<MessagesArea onStartChat={setStartChat} />
			</div>
		</div>
	);
};

export default Chatbot;
