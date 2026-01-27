import {
	useRouteError,
	isRouteErrorResponse,
	useNavigate,
} from "react-router-dom";
import { AlertTriangle, RefreshCcw, Home, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorFallbackPage = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	let errorMessage = "Unknown error occurred";
	let errorStack = "No stack trace available";

	if (isRouteErrorResponse(error)) {
		errorMessage = `${error.status} ${error.statusText}`;
		errorStack = error.data?.message || "Route Error";
	} else if (error instanceof Error) {
		errorMessage = error.message;
		errorStack = error.stack || "";
	} else if (typeof error === "string") {
		errorMessage = error;
	}

	const handleReset = () => {
		window.location.reload();
	};

	return (
		<div className='min-h-screen w-full bg-axon-dark-gray relative overflow-hidden flex items-center justify-center p-4'>
			{/* --- Background Effects --- */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-20 z-10 pointer-events-none'></div>
				<div className='absolute inset-0 bg-red-500/5 animate-pulse-slow'></div>
				<svg
					className='absolute w-full h-full opacity-[0.05] text-red-500'
					xmlns='http://www.w3.org/2000/svg'>
					<pattern
						id='neural-net-error'
						x='0'
						y='0'
						width='100'
						height='100'
						patternUnits='userSpaceOnUse'>
						<path
							d='M10 10 L90 90 M10 90 L90 10'
							stroke='currentColor'
							strokeWidth='0.5'
							fill='none'
						/>
						<rect x='49' y='49' width='2' height='2' fill='currentColor' />
					</pattern>
					<rect
						x='0'
						y='0'
						width='100%'
						height='100%'
						fill='url(#neural-net-error)'
					/>
				</svg>
			</div>

			{/* --- Main Error Card --- */}
			<div className='relative z-20 w-full max-w-3xl backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-up'>
				{/* Header Bar */}
				<div className='bg-red-500/10 border-b border-red-500/20 p-4 flex items-center gap-3'>
					<div className='flex gap-2'>
						<div className='w-3 h-3 rounded-full bg-red-500/80'></div>
						<div className='w-3 h-3 rounded-full bg-yellow-500/80'></div>
						<div className='w-3 h-3 rounded-full bg-green-500/30'></div>
					</div>
					<div className='ml-auto text-xs font-mono text-red-400 opacity-80 uppercase tracking-widest'>
						System Critical Failure
					</div>
				</div>

				<div className='p-8 flex flex-col items-center text-center'>
					<div className='relative mb-6'>
						<div className='absolute -inset-4 bg-red-500/20 rounded-full blur-xl animate-pulse'></div>
						<AlertTriangle
							size={64}
							className='text-red-500 relative z-10 animate-bounce-short'
						/>
					</div>

					<h1 className='text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight'>
						Runtime Exception
					</h1>

					<p className='text-muted-foreground text-lg mb-8 max-w-lg'>
						The neural interface encountered an unhandled exception. The process
						has been terminated.
					</p>

					{/* Developer Terminal */}
					<div className='w-full text-left bg-black/80 border border-white/5 rounded-lg p-4 mb-8 font-mono text-sm overflow-hidden relative group'>
						<div className='absolute top-2 right-2 text-xs text-gray-500 flex items-center gap-1'>
							<Terminal size={12} /> STACK TRACE
						</div>

						<div className='max-h-40 overflow-y-auto custom-scrollbar'>
							<p className='text-red-400 mb-2'>$ error: {errorMessage}</p>
							<p className='text-gray-600 opacity-60 break-all pl-4 border-l-2 border-white/10 whitespace-pre-wrap'>
								{errorStack}
							</p>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row gap-4 w-full justify-center'>
						<Button
							onClick={handleReset}
							className='bg-red-600 hover:bg-red-700 text-white gap-2 px-8 py-6 rounded-full shadow-lg shadow-red-900/20 transition-all hover:scale-105'>
							<RefreshCcw size={18} />
							Reboot System
						</Button>

						<Button
							variant='outline'
							onClick={() => navigate("/")}
							className='border-white/10 text-white hover:bg-white/5 gap-2 px-8 py-6 rounded-full'>
							<Home size={18} />
							Safe Mode (Home)
						</Button>
					</div>
				</div>

				<div className='bg-black/60 p-2 text-center'>
					<p className='text-[10px] text-gray-600 font-mono tracking-[0.2em]'>
						ERROR_CODE: 0xCRASH_AXON_V6 // MEMORY_DUMP_COMPLETE
					</p>
				</div>
			</div>
		</div>
	);
};

export default ErrorFallbackPage;
