import { ScrollArea } from "@/components/ui/scroll-area";
import "@/styles/prosemirror.scss";
import { Extension } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import Attributes from "./attributes";
import Controls from "./controls";
import SimpleMention from "./mention/simple-mention";

const PlainTextOnly = Extension.create({
  name: "plainTextOnly",

  addKeyboardShortcuts() {
    return {
      Enter: () => true,
      "Shift-Enter": () => true,
      "Mod-b": () => true,
      "Mod-i": () => true,
      "Mod-u": () => true,
      Escape: ({ editor }) => {
        editor.commands.blur();
        return true;
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view: EditorView, event: ClipboardEvent) => {
            const clipboardData = event.clipboardData;
            if (!clipboardData) return false;

            const text = clipboardData.getData("text/plain");
            const cleanText = text.replace(/\s+/g, " ").trim(); // Clean up whitespace

            const { state, dispatch } = view;
            const { from, to } = state.selection;
            const tr = state.tr.replaceWith(
              from,
              to,
              state.schema.text(cleanText),
            );
            dispatch(tr);
            return true; // Prevent default paste behavior
          },
        },
      }),
    ];
  },
});

const CustomImage = Image.extend({
  renderHTML({ HTMLAttributes }) {
    const { src, alt, title, ...attrs } = HTMLAttributes;

    return [
      "div",
      { class: "image-wrapper" },
      [
        "img",
        {
          src,
          alt,
          title,
          ...attrs,
        },
      ],
      [
        "button",
        {
          class: "delete-button",
          type: "button",
          "data-delete-image": "true",
        },
        "×",
      ],
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            click: (view: EditorView, event: Event) => {
              const target = event.target as HTMLElement;
              if (target.getAttribute("data-delete-image") === "true") {
                event.preventDefault();
                event.stopPropagation();

                // Find the image wrapper element
                const wrapper = target.closest(".image-wrapper");
                if (wrapper) {
                  // Find the position of the image in the document
                  const pos = view.posAtDOM(wrapper, 0);
                  if (pos !== null) {
                    const tr = view.state.tr.delete(pos, pos + 1);
                    view.dispatch(tr);
                  }
                }
                return true;
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});

const EscapeHandler = Extension.create({
  name: "escapeHandler",

  addKeyboardShortcuts() {
    return {
      Escape: ({ editor }) => {
        editor.commands.blur();
        return true;
      },
    };
  },
});

type Props = Record<string, never>;

const Input = ({}: Props) => {
  const titleEditor = useEditor({
    immediatelyRender: true,
    extensions: [
      Document,
      Paragraph,
      Text,
      PlainTextOnly,
      Placeholder.configure({
        placeholder: "Task title",
      }),
    ],
  });

  const descriptionEditor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({
        heading: false,
        orderedList: false,
      }),
      Heading.configure({ levels: [1] }),
      CustomImage,
      OrderedList,
      ListItem,
      TaskList,
      TaskItem,
      Placeholder.configure({
        placeholder: "Describe this task",
      }),
      SimpleMention,
      EscapeHandler,
      Link.configure({
        openOnClick: false,
        autolink: false,
      }),
    ],
  });

  return (
    <div>
      <div className="py-6 px-6 flex flex-col text-gray-600 gap-[18px] font-medium">
        <EditorContent editor={titleEditor} />
        <ScrollArea>
          <div className="max-h-[550px] text-sm">
            <EditorContent className="text-sm" editor={descriptionEditor} />
          </div>
        </ScrollArea>
      </div>
      <Attributes editor={titleEditor} />
      <Controls editor={descriptionEditor} titleEditor={titleEditor} />
    </div>
  );
};
export default Input;
