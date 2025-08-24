import ICONS from "@/assets/icons"
import Image from "next/image"

export const STATUS_DATA = [
	{ label: "Backlog", value: "backlog", icon: <ICONS.TODO_BACKLOG /> },
	{ label: "Todo", value: "todo", icon: <ICONS.TODO /> },
	{
		label: "In Progress",
		value: "progress",
		icon: <ICONS.TODO_PROGRESS className="text-yellow-500" />,
	},
	{
		label: "Done",
		value: "done",
		icon: <ICONS.TODO_DONE className="text-green-500" />,
	},
	{
		label: "Cancelled",
		value: "cancelled",
		icon: <ICONS.TODO_CANCEL />,
	},
]

export const USER_DATA = [
	{
		name: "Dhruvin D.",
		username: "writenicecode",
		img: "/users/dhruvin.webp",
	},
	{
		name: "Tejas R.",
		username: "suptejas",
		img: "/users/tejas.webp",
	},
]

export const ASSIGN_DATA = [
	{ label: "No assignees", value: "null", icon: <ICONS.ASSIGN /> },
	...USER_DATA.map((user) => ({
		label: user.name,
		value: user.username,
		icon: <Image width={16} height={16} src={user.img} className="size-4 rounded-full" alt={user.username} />,
	})),
]

export const PRIORITY_DATA = [
	{ label: "No Priority", value: "none", icon: <ICONS.PRIORITY /> },
	{ label: "Urgent", value: "urgent", icon: <ICONS.PRIORITY_URGENT /> },
	{ label: "High", value: "high", icon: <ICONS.PRIORITY_HIGH /> },
	{ label: "Medium", value: "medium", icon: <ICONS.PRIORITY_MEDIUM /> },
	{ label: "Low", value: "low", icon: <ICONS.PRIORITY_LOW /> },
]

export const TAGS_DATA = [
	{
		label: "Frontend",
		value: "frontend",
		icon: <div className="size-3 bg-red-500 rounded-full" />,
	},
	{
		label: "Design",
		value: "design",
		icon: <div className="size-3 bg-blue-500 rounded-full" />,
	},
	{
		label: "Backend",
		value: "backend",
		icon: <div className="size-3 bg-green-500 rounded-full" />,
	},
	{
		label: "Bug",
		value: "bug",
		icon: <div className="size-3 bg-yellow-500 rounded-full" />,
	},
	{
		label: "Research",
		value: "research",
		icon: <div className="size-3 bg-purple-500 rounded-full" />,
	},
]

export const PROJECTS_DATA = [
	{ label: "No Project", value: "none", icon: null },
	{ label: "Dimension Ai", value: "dimension-ai", icon: null },
	{ label: "Personal", value: "personal", icon: null },
	{ label: "Nextjs Template", value: "nextjs-template", icon: null },
]
