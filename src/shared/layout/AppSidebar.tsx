import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
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
import { useIsMobile } from "@/shared/hooks/use-mobile";
import {
	Activity,
	Calendar,
	ChartArea,
	ChevronUp,
	Home,
	LogOut,
	Map,
	Settings,
	SquareCheckBig,
	User,
	UsersRound,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { images } from "../assets";

// Platform items.
const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Team",
		url: "/team",
		icon: UsersRound,
	},
	{
		title: "Calendar",
		url: "/calendar",
		icon: Calendar,
	},
	{
		title: "Tasks",
		url: "/tasks",
		icon: SquareCheckBig,
	},
];

// Statistics charts items.
const statsChartItems = [
	{
		title: "Line Charts",
		url: "/charts/line",
	},
	{
		title: "Bar Charts",
		url: "/charts/bar",
	},
	{
		title: "Pie Charts",
		url: "/charts/pie",
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
								src='/logo.svg'
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
							Platforms
						</SidebarGroupLabel>
						{items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<NavLink to={item.url}>
									{({ isActive }) => (
										<SidebarMenuButton
											className={cn(
												"cursor-pointer",
												isActive && "bg-axon-gradient",
											)}>
											<item.icon />
											<span>{item.title}</span>
										</SidebarMenuButton>
									)}
								</NavLink>
							</SidebarMenuItem>
						))}
					</SidebarGroup>

					<SidebarGroup>
						<SidebarGroupLabel className='font-bold'>
							Statistics
						</SidebarGroupLabel>
						<Collapsible
							open={openCollapsedGroup3}
							onOpenChange={setOpenCollapsedGroup3}
							className='group/collapsible'>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton className='font-medium text-md'>
										<ChartArea />
										charts
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
										{statsChartItems.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<NavLink to={item.url}>
													{({ isActive }) => (
														<SidebarMenuSubButton
															asChild
															className={cn(
																"cursor-pointer",
																isActive && "bg-axon-gradient",
															)}>
															<span>{item.title}</span>
														</SidebarMenuSubButton>
													)}
												</NavLink>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					</SidebarGroup>

					<SidebarGroup>
						<SidebarGroupLabel className='font-bold'>Portals</SidebarGroupLabel>
						<SidebarMenuItem>
							<NavLink to='/maps'>
								{({ isActive }) => (
									<SidebarMenuButton
										className={cn(
											"cursor-pointer flex items-center gap-2",
											isActive && "bg-axon-gradient",
										)}>
										<Map className='w-[1.2rem] h-[1.2rem]' />
										<span className='font-semibold font-lg'>
											Connection Map
										</span>
									</SidebarMenuButton>
								)}
							</NavLink>
						</SidebarMenuItem>
					</SidebarGroup>

					<SidebarGroup>
						<SidebarGroupLabel className='font-semibold font-lg'>
							Notifications
						</SidebarGroupLabel>
						<SidebarMenuItem>
							<NavLink to='/notifications/system'>
								{({ isActive }) => (
									<SidebarMenuButton
										className={cn(
											"cursor-pointer flex items-center gap-2",
											isActive && "bg-axon-gradient",
										)}>
										<Activity className='w-[1.2rem] h-[1.2rem] ' />
										System
										<SidebarMenuBadge className='cursor-pointer'>
											24
										</SidebarMenuBadge>
									</SidebarMenuButton>
								)}
							</NavLink>
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
										src={images.avatar}
										alt='avatar'
									/>
									<AvatarFallback>ES</AvatarFallback>
								</Avatar>
								<span>Eman Soliman</span>
								<ChevronUp className='ml-auto' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={cn(!isMobile && open && "w-52")}
							side='top'
							align={`${isMobile || (isMobile && !open) ? "end" : "center"}`}
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
