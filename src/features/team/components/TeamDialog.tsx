import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { team } from "../types/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import useTeam from "@/features/team/hooks/useTeam";
import { useState, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
const formSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2).max(100),
	id: z.string(),
	role: z.enum(["Admin", "Designer", "Developer", "Analyst"]),
	status: z.enum(["Active", "Inactive", "Pending", "Banned"]),
});

interface Iprops {
	teamMember?: team;
	children: ReactNode;
	onClose?: () => void;
}
const TeamDialog = ({ teamMember, children, onClose }: Iprops) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: teamMember?.name || "",
			email: teamMember?.email || "",
			role: teamMember?.role || "Developer",
			status: teamMember?.status || "Active",
			id: teamMember?.id || uuidv4(),
		},
	});
	const onsubmit = (data: z.infer<typeof formSchema>) => {
		setTeamMember(data);
		setOpen(false);
		form.reset();
		onClose?.();
		toast.success(
			`Team member ${teamMember ? "updated" : "added"} successfully!`,
		);
	};
	const setTeamMember = useTeam((state) => state.setTeamMember);
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogPortal>
				<DialogOverlay className='backdrop-blur-xs' />
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{teamMember ? "Edit Team Member" : "Add Team Member"}
						</DialogTitle>
						<DialogDescription>
							{teamMember
								? `Editing ${teamMember.name}`
								: "Adding a new team member"}
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onsubmit)}
							className='flex flex-col gap-4'>
							{/* Name */}
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Email */}
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='Email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex items-center gap-4 flex-wrap'>
								{/* Role */}
								<FormField
									control={form.control}
									name='role'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Role</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='max-w-[180px]'>
														<SelectValue placeholder='Select a role' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Roles</SelectLabel>
														<SelectItem value='Admin'>Admin</SelectItem>
														<SelectItem value='Designer'>Designer</SelectItem>
														<SelectItem value='Developer'>Developer</SelectItem>
														<SelectItem value='Analyst'>Analyst</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Status */}
								<FormField
									control={form.control}
									name='status'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='max-w-[180px]'>
														<SelectValue placeholder='Select a status' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Statuses</SelectLabel>
														<SelectItem value='Active'>Active</SelectItem>
														<SelectItem value='Inactive'>Inactive</SelectItem>
														<SelectItem value='Pending'>Pending</SelectItem>
														<SelectItem value='Banned'>Banned</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button variant='primary' type='submit'>
								{teamMember ? "Update Member" : "Add Member"}
							</Button>
						</form>
					</Form>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};

export default TeamDialog;
