import { Link } from "react-router-dom"; // Assuming react-router, adjust if using Next.js router
import { ArrowLeft, Unplug, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Shadcn UI button component
import "./index.css";

const NotFoundPage = () => {
	return (
		<div className='min-h-screen w-full bg-axon-dark-gray relative overflow-hidden flex items-center justify-center'>
			{/* --- Background Neural Net Pattern (Subtle) --- */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.03),transparent_50%)]'></div>
				<svg
					className='absolute w-full h-full opacity-[0.04] text-axon-blue'
					xmlns='http://www.w3.org/2000/svg'>
					<pattern
						id='neural-net'
						x='0'
						y='0'
						width='100'
						height='100'
						patternUnits='userSpaceOnUse'>
						<circle cx='10' cy='10' r='1' fill='currentColor' />
						<path
							d='M10 10 L90 90 M10 90 L90 10'
							stroke='currentColor'
							strokeWidth='0.5'
							fill='none'
						/>
					</pattern>
					<rect
						x='0'
						y='0'
						width='100%'
						height='100%'
						fill='url(#neural-net)'
					/>
				</svg>
			</div>

			{/* --- Main Content --- */}
			<div className='relative z-10 text-center p-8 max-w-2xl mx-auto flex flex-col items-center'>
				{/* Disconnected Icon with pulsing effect */}
				<div className='relative mb-8'>
					<div className='absolute -inset-4 bg-axon-blue/20 rounded-full blur-2xl animate-pulse-slow'></div>
					<div className='w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative'>
						<Unplug size={48} className='text-axon-rose animate-pulse' />
						{/* A secondary broken spark icon overlapping */}
						<ZapOff
							size={24}
							className='text-axon-blue absolute bottom-4 right-4'
						/>
					</div>
				</div>

				{/* Glitched 404 Title */}
				<h1 className='text-8xl md:text-9xl font-black tracking-tighter mb-2 relative'>
					<span
						className='bg-linear-to-r from-axon-blue via-purple-500 to-axon-rose bg-clip-text text-transparent relative z-10 glitch-text'
						data-text='404'>
						404
					</span>
					{/* Subtle glow behind the text */}
					<span className='absolute -inset-2 bg-axon-blue/20 blur-3xl rounded-full z-0'></span>
				</h1>

				<h2 className='text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight'>
					Neural Connection Lost
				</h2>

				<p className='text-muted-foreground text-lg mb-8 leading-relaxed max-w-md'>
					We couldn't establish a link to the sector you requested. It may have
					been severed, moved, or never existed within the Axon network.
				</p>

				{/* Actions */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<Link to='/'>
						{/* Using your standard Axon gradient button style */}
						<Button className='w-full sm:w-auto gap-2 bg-axon-gradient hover:opacity-90 text-white rounded-full px-8 py-6 text-md'>
							<ArrowLeft size={18} />
							Return to Dashboard
						</Button>
					</Link>
					<Button
						variant='outline'
						className='w-full sm:w-auto gap-2 rounded-full px-8 py-6 text-md border-white/10 text-white hover:bg-white/5 hover:text-white'
						onClick={() => window.history.back()}>
						Go Back
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
