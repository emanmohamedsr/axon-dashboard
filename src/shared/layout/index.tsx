import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

const RootLayout = () => {
	return (
		<SidebarProvider>
			<div className='w-full flex'>
				<AppSidebar />
				<main className='flex-1 flex flex-col min-h-screen overflow-hidden'>
					<Navbar />
					<div className='px-4 min-h-[calc(100vh-68px)]'>
						<Outlet />
					</div>
				</main>
			</div>
		</SidebarProvider>
	);
};

export default RootLayout;
