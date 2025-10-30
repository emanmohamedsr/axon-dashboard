import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarSeparator,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Activity,
	BotMessageSquare,
	Calendar,
	ChevronUp,
	Home,
	Inbox,
	LogOut,
	Map,
	MoreHorizontal,
	Plus,
	Search,
	Settings,
	User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

// Menu items.
const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Inbox",
		url: "#",
		icon: Inbox,
	},
	{
		title: "Calendar",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

const AppSidebar = () => {
	const isMobile = useIsMobile();
	const { open } = useSidebar();
	const [openCollapsedGroup3, setOpenCollapsedGroup3] = useState(false);
	return (
		<Sidebar variant='floating' collapsible='icon'>
			<SidebarHeader className='py-4'>
				<SidebarMenu>
					<SidebarMenuButton asChild>
						<Link to={"/"}>
							<img
								className={cn(
									"bg-transparent object-cover rounded-full",
									!open ? "size-[1.2rem]" : "size-10",
								)}
								src='/public/logo.svg'
								alt='logo'
							/>
							<span className='bg-linear-to-r from-[#6FA6F0] via-[#9FB8E8] to-[#F3B8C7] bg-clip-text text-transparent font-bold -ml-1 text-xl tracking-wide'>
								Axon
							</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarSeparator />

			<SidebarContent>
				<SidebarMenu className={cn(open && "px-2 my-2")}>
					<SidebarGroup>
						<SidebarGroupLabel className='font-bold font-lg'>
							platform
						</SidebarGroupLabel>
						{items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<a href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarGroup>

					<SidebarGroup>
						<SidebarGroupLabel className='font-bold'>general</SidebarGroupLabel>
						<Collapsible
							open={openCollapsedGroup3}
							onOpenChange={setOpenCollapsedGroup3}
							className='group/collapsible'>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton className='font-semibold text-md'>
										<BotMessageSquare />
										Models
										<ChevronUp
											className={cn(
												"ml-auto transition-all",
												openCollapsedGroup3 ? "rotate-0" : "rotate-180",
											)}
										/>
									</SidebarMenuButton>
								</CollapsibleTrigger>

								<CollapsibleContent>
									<SidebarMenuSub>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton asChild>
												<span>model 1</span>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton asChild>
												<span>model 2</span>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					</SidebarGroup>

					<SidebarGroup>
						<SidebarGroupLabel className='font-bold'>
							projects
						</SidebarGroupLabel>
						<SidebarGroupAction>
							<Plus />
						</SidebarGroupAction>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href='#'>
									<Map />
									<span className='font-semibold font-lg'>Maps</span>
								</a>
							</SidebarMenuButton>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuAction>
										<MoreHorizontal />
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent side='right' align='start'>
									<DropdownMenuItem>
										<span>Edit Project</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<span>Delete Project</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarGroup>

					<SidebarGroup>
						<SidebarGroupLabel className='font-semibold font-lg'>
							Notifications
						</SidebarGroupLabel>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Activity />
								System
							</SidebarMenuButton>
							<SidebarMenuBadge>24</SidebarMenuBadge>
						</SidebarMenuItem>
					</SidebarGroup>
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								<Avatar className={cn(!open && "size-[1.2rem]")}>
									<AvatarImage
										className='object-contain'
										src={assets.avatar}
										alt='avatar'
									/>
									<AvatarFallback>ES</AvatarFallback>
								</Avatar>
								<span>Eman Soliman</span>
								<ChevronUp className='ml-auto' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={cn(isMobile ? "w-[16rem]" : "w-52")}
							side='top'
							align='center'
							sideOffset={10}>
							<DropdownMenuItem>
								<User className='h-[1.2rem] w-[1.2rem] mr-2' />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className='h-[1.2rem] w-[1.2rem] mr-2' />
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem variant='destructive'>
								<LogOut className='h-[1.2rem] w-[1.2rem] mr-2 text-destructive' />
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
export default AppSidebar;
