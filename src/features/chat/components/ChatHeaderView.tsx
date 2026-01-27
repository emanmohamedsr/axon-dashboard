import { images } from "@/shared/assets";
import { Sparkles } from "lucide-react";

const ChatHeaderView = () => {
	return (
		<div className='w-full p-4 border-b border-white/5 bg-linear-to-r from-axon-blue/10 to-transparent flex items-center gap-3'>
			<div className='relative'>
				<div className='w-10 h-10 rounded-full bg-axon-gradient p-px'>
					<div className='w-full h-full bg-accent rounded-full flex items-center justify-center overflow-hidden'>
						<img
							src={images.eve}
							alt='AI'
							className='w-full h-full object-cover'
						/>
					</div>
				</div>
				<span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full animate-pulse'></span>
			</div>
			<div>
				<h3 className='font-bold tracking-wide flex items-center gap-2'>
					EVE AI
					<Sparkles className='w-3 h-3 text-axon-blue' />
				</h3>
				<p className='text-[10px] text-gray-400 uppercase tracking-wider'>
					Axon Intelligence Node
				</p>
			</div>
		</div>
	);
};

export default ChatHeaderView;
