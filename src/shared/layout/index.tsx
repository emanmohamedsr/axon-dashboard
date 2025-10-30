import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

const RootLayout = () => {
	return (
		<SidebarProvider>
			<div className='w-full flex'>
				<AppSidebar />
				<main className='w-full'>
					<Navbar />
					<div className='px-4'>
						<Outlet />
					</div>
				</main>
			</div>
		</SidebarProvider>
	);
};

export default RootLayout;
