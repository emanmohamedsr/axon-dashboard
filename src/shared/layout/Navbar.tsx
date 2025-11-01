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
import {
	LogOut,
	PanelLeftClose,
	SearchIcon,
	Settings,
	User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../assets";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogPortal,
} from "@/components/ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

const Navbar = () => {
	const { open, toggleSidebar } = useSidebar();
	return (
		<nav className='p-4 flex justify-between items-center sm:gap-2'>
			{/* left */}
			<div className=' flex sm:flex-1 sm:gap-2 items-center'>
				{/* sidebar collapsable icon */}
				<Button variant='ghost' size='icon' onClick={toggleSidebar}>
					<PanelLeftClose
						className={cn(
							"h-[1.2rem] w-[1.2rem]  transition-all",
							open ? "rotate-0" : "-rotate-180",
						)}
					/>
				</Button>
				{/* search */}
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='ghost' size='icon' aria-label='Search'>
							<SearchIcon className='h-[1.2rem] w-[1.2rem]' />
						</Button>
					</DialogTrigger>
					<DialogPortal>
						<DialogContent className='top-[20%]'>
							<DialogHeader>
								<DialogTitle>Search</DialogTitle>
								<DialogDescription>
									Search for anything within the dashboard.
								</DialogDescription>
							</DialogHeader>
							<div className='mt-4 flex gap-2'>
								<InputGroup className=''>
									<InputGroupInput placeholder='Search...' />
									<InputGroupAddon>
										<SearchIcon />
									</InputGroupAddon>
								</InputGroup>
								<Button variant={"primary"}>Search</Button>
							</div>
						</DialogContent>
					</DialogPortal>
				</Dialog>
			</div>
			{/* right */}
			<div className='flex gap-4 justify-center items-center'>
				{/* toggle theme */}
				<ModeToggle />
				{/* logo */}
				<Link to={"/"}>
					<img className='object-cover w-6 sm:w-8' src='/logo.svg' alt='logo' />
				</Link>
				{/* profile dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar className='size-6 sm:size-8 cursor-pointer'>
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
