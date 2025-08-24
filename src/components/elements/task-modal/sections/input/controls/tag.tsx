import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Icon from "@/components/ui/icon"
import IconBtn from "@/components/ui/icon-button"
import Image from "next/image"
import { USER_DATA } from "../const"

interface Props {
	onSelectUser?: (user: { username: string; name: string }) => void
}

const TagUsers = ({ onSelectUser }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<IconBtn>
					<Icon name="TAG_A" size={16} />
				</IconBtn>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[180px] rounded-lg" align="start" sideOffset={4}>
				{USER_DATA.map((i) => (
					<DropdownMenuItem
						onClick={() => {
							if (onSelectUser) {
								onSelectUser({ username: i.username, name: i.name })
							} else {
								console.log(i.username)
							}
						}}
						key={i.username}
						className="flex items-center gap-1.5 cursor-pointer">
						<Image width={16} height={16} src={i.img} className="size-4 rounded-full" alt={i.name} />
						<span>{i.name}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
export default TagUsers
