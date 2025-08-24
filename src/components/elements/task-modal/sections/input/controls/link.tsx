import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import IconBtn from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  editor: Editor;
}

const LinkBtn = ({ editor }: Props) => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [hasSelection, setHasSelection] = useState(false);

  // Track selection changes
  useEffect(() => {
    const updateSelection = () => {
      setHasSelection(!editor.state.selection.empty);
    };

    updateSelection();

    editor.on("selectionUpdate", updateSelection);
    editor.on("update", updateSelection);

    return () => {
      editor.off("selectionUpdate", updateSelection);
      editor.off("update", updateSelection);
    };
  }, [editor]);

  console.log({ hasSelection });

  function addLink() {
    if (!link) return toast.error("Please enter a link");
    const urlPattern = /^(https?:\/\/[^\s]+)/g;
    if (!urlPattern.test(link)) return toast.error("Please enter a valid link");

    // Get the current selection
    const { from, to } = editor.state.selection;

    // Apply link only to the selected text, then move cursor and unset link
    editor
      .chain()
      .focus()
      .setTextSelection({ from, to })
      .setLink({ href: link })
      .setTextSelection(to) // Move cursor to end of selection
      .run();

    toast.success("Link added");
    setOpen(false);
    setLink(""); // Clear the input
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <IconBtn disabled={!hasSelection}>
          <Icon name="LINK" size={18} />
        </IconBtn>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <Input
          value={link}
          onChange={(e) => setLink(e.currentTarget.value)}
          placeholder="Enter link"
        />
        <div className="flex justify-end mt-2">
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" disabled={!link} onClick={addLink}>
            Add link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default LinkBtn;
