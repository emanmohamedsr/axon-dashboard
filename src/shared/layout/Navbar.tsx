import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, PanelLeftClose, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../assets";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

const Navbar = () => {
	const { open, toggleSidebar } = useSidebar();
	return (
		<nav className='p-4 flex justify-between items-center'>
			<Button variant='ghost' size='icon' onClick={toggleSidebar}>
				<PanelLeftClose
					className={cn(
						"h-[1.2rem] w-[1.2rem]  transition-all",
						open ? "rotate-0" : "-rotate-180",
					)}
				/>
			</Button>
			<div className='flex gap-4 justify-center items-center'>
				<Link to={"/"}>
					<img className='object-cover w-8' src='/logo.svg' alt='logo' />
				</Link>
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={assets.avatar} alt='avatar' />
							<AvatarFallback>ES</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={10}>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className='h-[1.2rem] w-[1.2rem] mr-2' />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className='h-[1.2rem] w-[1.2rem] mr-2' />
							Settings
						</DropdownMenuItem>
						<DropdownMenuItem variant='destructive'>
							<LogOut className='h-[1.2rem] w-[1.2rem] mr-2 text-destructive' />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};

export default Navbar;
