import Button3d from "@/components/ui/button-3d";
import Icon from "@/components/ui/icon";
import IconBtn from "@/components/ui/icon-button";
import { Editor } from "@tiptap/react";
import { toast } from "sonner";
import EmojiBtn from "./emoji";
import LinkBtn from "./link";
import TagUsers from "./tag";

interface Props {
  editor: Editor | null;
  titleEditor: Editor | null;
}

const Controls = ({ editor, titleEditor }: Props) => {
  if (!editor) {
    return null;
  }

  const handleCreateTask = () => {
    const title = titleEditor?.getText() || "";
    const description = editor?.getHTML() || "";

    if (!title.trim()) return toast.error("Title is required");

    if (!description.trim() || description === "<p></p>")
      return toast.error("Description is required");

    toast.success("Task created successfully");
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const src = reader.result as string;
          editor.chain().focus().setImage({ src }).run();
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const insertMention = (user: { username: string; name: string }) => {
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "mention",
          attrs: {
            id: user.username,
            label: user.name,
          },
        },
        {
          type: "text",
          text: " ",
        },
      ])
      .run();
  };

  const toggleBold = () => editor.chain().focus().toggleBold().run();

  const toggleItalic = () => editor.chain().focus().toggleItalic().run();

  const toggleHeading = () =>
    editor.chain().focus().toggleHeading({ level: 1 }).run();

  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();

  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();

  const toggleTaskList = () => editor.chain().focus().toggleTaskList().run();

  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();

  return (
    <div className="border-t border-t-gray-100 p-4 flex items-center justify-between text-gray-600">
      <div className="flex items-center gap-1">
        <IconBtn active={false} onClick={handleImageUpload}>
          <Icon name="ATTACHMENTS" size={18} />
        </IconBtn>
        <TagUsers onSelectUser={insertMention} />
        <EmojiBtn editor={editor} />
        <IconBtn
          active={editor.isActive("heading", { level: 1 })}
          onClick={toggleHeading}
        >
          <Icon name="HEADING" size={18} />
        </IconBtn>
        <IconBtn active={editor.isActive("bold")} onClick={toggleBold}>
          <Icon name="BOLD" size={18} />
        </IconBtn>
        <IconBtn active={editor.isActive("italic")} onClick={toggleItalic}>
          <Icon name="ITALIC" size={18} />
        </IconBtn>
        <IconBtn
          active={editor.isActive("codeBlock")}
          onClick={toggleCodeBlock}
        >
          <Icon name="CODE" size={18} />
        </IconBtn>
        <LinkBtn editor={editor} />
        <IconBtn
          active={editor.isActive("orderedList")}
          onClick={toggleOrderedList}
        >
          <Icon name="NUM_LIST" size={18} />
        </IconBtn>
        <IconBtn
          active={editor.isActive("bulletList")}
          onClick={toggleBulletList}
        >
          <Icon name="UL_LIST" size={18} />
        </IconBtn>
        <IconBtn active={editor.isActive("taskList")} onClick={toggleTaskList}>
          <Icon name="TODO_LIST" size={18} />
        </IconBtn>
      </div>
      <Button3d onClick={handleCreateTask}>
        Create
        <div className="w-[1px] h-[32px] bg-white/20" />
        <Icon name="ENTER" size={16} />
      </Button3d>
    </div>
  );
};
export default Controls;
