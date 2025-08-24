import Icon from "@/components/ui/icon";
import IconBtn from "@/components/ui/icon-button";
import {
    AnimatePresence,
    motion,
    MotionConfig,
    MotionProps,
} from "motion/react";
import { useEffect, useState } from "react";
import { TAGS_DATA } from "./const";
import { Editor } from "@tiptap/core";

interface Props {
  editor?: Editor;
  setTag?: (tag: (typeof TAGS_DATA)[number]) => void;
  tags?: typeof TAGS_DATA;
}

const TAGS_ANI: MotionProps = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const Suggestions = ({ editor, setTag, tags: selectedTags }: Props) => {
  const [visible, setVisible] = useState(false);
  const [tags, setTags] = useState<typeof TAGS_DATA>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const updateTitle = () => {
      const text = editor?.getText() || "";
      setTitle(text);
    };

    editor?.on("update", updateTitle);
    return () => {
      editor?.off("update", updateTitle);
    };
  }, [editor]);

  useEffect(() => {
    let timers: NodeJS.Timeout[];
    let show = false;
    if (!title) show = false;

    const filteredTags = getFilteredTags();

    if (filteredTags.length > 0 && title) show = true;

    if (show) {
      timers = [
        setTimeout(() => {
          setVisible(true);
          setTags(filteredTags);
        }, 500),
      ];
    } else {
      timers = [
        setTimeout(() => {
          setVisible(false);
        }, 100),
        setTimeout(() => {
          setTags([]);
        }, 350),
      ];
    }
    return () => timers.forEach((t) => clearTimeout(t));
  }, [title]);

  function getFilteredTags() {
    return TAGS_DATA.filter((tag) =>
      title ? title.toLowerCase().includes(tag.label.toLowerCase()) : false,
    ).filter((tag) =>
      selectedTags ? !selectedTags.find((t) => t.value === tag.value) : true,
    );
  }

  function handleClick(tag: (typeof TAGS_DATA)[number]) {
    if (setTag) setTag(tag);
    setTags((prev) => {
      const newTags = prev.filter((t) => t.value !== tag.value);
      if (newTags.length === 0) setVisible(false);
      return newTags;
    });
  }

  return (
    <MotionConfig transition={{ duration: 0.2, ease: "easeOut" }}>
      <motion.div
        initial={false}
        animate={{ height: visible ? "auto" : 0, opacity: visible ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="py-2 px-6 flex items-center gap-2">
          <IconBtn onClick={() => setVisible(false)}>
            <Icon name="SPARKLE" className="text-gray-400" />
          </IconBtn>
          <AnimatePresence mode="popLayout">
            {tags.map((tag) => (
              <motion.button
                onClick={() => handleClick(tag)}
                layout
                layoutDependency={title + `${tags.length}`}
                {...TAGS_ANI}
                key={tag.value}
                className="py-1.5 px-3 inline-flex items-center gap-2 border border-dashed border-gray-200 rounded-lg cursor-pointer text-gray-400"
              >
                {tag.icon}
                <span className="text-xs font-medium">{tag.label}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
};
export default Suggestions;
