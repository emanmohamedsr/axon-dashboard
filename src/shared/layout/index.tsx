import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
	return (
		<div className='w-full flex'>
			sidebar
			<main className='w-full'>
				<Navbar />
				<div className='px-4'>
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default RootLayout;
