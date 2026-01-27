import TextType from "@/components/TextType";
import { images } from "../assets";
import "../styles/index.css";
const StartingView = () => {
	return (
		<div className='relative top-[50%] -translate-y-[50%] z-10 flex flex-row items-center gap-2 max-w-5xl w-full px-8'>
			<div className='flex-1 hidden sm:flex justify-center animate-fade-up delay-100'>
				<img
					className='w-full max-w-[600px] object-contain animate-float'
					src={images.eve}
					alt='Eve AI'
				/>
			</div>

			<div className='flex-1 flex flex-col gap-2 sm:gap-6 text-start sm:text-left'>
				<h1 className='text-lg sm:text-2xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-up delay-500'>
					Welcome to
					<span
						className='font-extrabold drop-shadow-sm ml-4'
						style={{
							background: "var(--axon-gradient)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							color: "transparent",
						}}>
						EVE
					</span>
				</h1>

				<TextType
					text={[
						"Your AI-powered assistant!",
						"Ready to analyze, optimize, and execute your tasks with precision and speed.",
						"Let's achieve greatness together.",
					]}
					className='text-xl text-muted-foreground/80 leading-relaxed animate-fade-up delay-700'
					typingSpeed={75}
					deletingSpeed={35}
					pauseDuration={1500}
					showCursor={true}
					cursorCharacter='|'
					cursorBlinkDuration={0.5}
				/>
			</div>
		</div>
	);
};

export default StartingView;
