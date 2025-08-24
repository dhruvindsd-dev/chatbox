import { EmojiPicker, EmojiPickerContent, EmojiPickerFooter, EmojiPickerSearch } from "@/components/ui/emoji-picker"
import Icon from "@/components/ui/icon"
import IconBtn from "@/components/ui/icon-button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Editor } from "@tiptap/react"
import { useState } from "react"

interface Props {
	editor: Editor | null
}

const EmojiBtn = ({ editor }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<IconBtn>
					<Icon name="EMOJI" size={18} />
				</IconBtn>
			</PopoverTrigger>
			<PopoverContent className="w-fit p-0">
				<EmojiPicker
					className="h-[342px]"
					onEmojiSelect={({ emoji }) => {
						setOpen(false)
						if (editor) {
							editor.chain().focus().insertContent(emoji).run()
						}
					}}>
					<EmojiPickerSearch />
					<EmojiPickerContent />
					<EmojiPickerFooter />
				</EmojiPicker>
			</PopoverContent>
		</Popover>
	)
}
export default EmojiBtn
