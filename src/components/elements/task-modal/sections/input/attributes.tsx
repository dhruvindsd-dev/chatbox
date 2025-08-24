import ICONS from "@/assets/icons";
import { MultiSelectDropdown } from "@/components/ui/combobox/multi-select";
import { SelectDropdown } from "@/components/ui/combobox/single-select";
import { useState } from "react";
import {
    ASSIGN_DATA,
    PRIORITY_DATA,
    PROJECTS_DATA,
    STATUS_DATA,
    TAGS_DATA,
} from "./const";
import Suggestions from "./suggestions";
import { Editor } from "@tiptap/core";

interface Props {
  editor: Editor;
}

const Attributes = ({ editor }: Props) => {
  const [status, setStatus] = useState<(typeof STATUS_DATA)[number] | null>(
    STATUS_DATA[1],
  );
  const [assignees, setAssignees] = useState<typeof ASSIGN_DATA>([]);
  const [priority, setPriority] = useState<
    (typeof PRIORITY_DATA)[number] | null
  >();
  const [tags, setTags] = useState<typeof TAGS_DATA>([]);
  const [projects, setProjects] = useState<
    (typeof PROJECTS_DATA)[number] | null
  >(null);

  return (
    <>
      <Suggestions
        editor={editor}
        tags={tags}
        setTag={(tag) => {
          if (!tags.find((t) => t.value === tag.value)) {
            setTags((prev) => [...prev, tag]);
          }
        }}
      />
      <div className="pb-[18px] pt-1 px-6 flex gap-2">
        <SelectDropdown
          label="Status"
          icon={<ICONS.TODO_BACKLOG />}
          data={STATUS_DATA}
          placeholder="Select status"
          tooltipText="Change status"
          kbdKey="S"
          value={status?.value}
          onChange={(value) => {
            setStatus(STATUS_DATA.find((item) => item.value === value) || null);
          }}
        />

        <MultiSelectDropdown
          label="Assignees"
          data={ASSIGN_DATA}
          placeholder="Assignees"
          tooltipText="Select assignees"
          kbdKey="a"
          icon={<ICONS.ASSIGN />}
          value={assignees.map((item) => item.value)}
          onChange={(values) => {
            if (values.includes("null")) return setAssignees([]);
            setAssignees(
              ASSIGN_DATA.filter((item) => values.includes(item.value)),
            );
          }}
        />

        <SelectDropdown
          label="Priority"
          icon={<ICONS.PRIORITY />}
          data={PRIORITY_DATA}
          placeholder="Select priority"
          tooltipText="Change priority"
          kbdKey="p"
          value={priority?.value}
          onChange={(value) => {
            setPriority(
              PRIORITY_DATA.find((item) => item.value === value) || null,
            );
          }}
        />

        <MultiSelectDropdown
          label="Tags"
          icon={<ICONS.TAG />}
          data={TAGS_DATA}
          placeholder="Tags"
          tooltipText="Select tags"
          kbdKey="t"
          value={tags.map((item) => item.value)}
          onChange={(values) => {
            setTags(TAGS_DATA.filter((item) => values.includes(item.value)));
          }}
        />

        <SelectDropdown
          label="Projects"
          icon={<ICONS.PROJECTS />}
          data={PROJECTS_DATA}
          placeholder="Projects"
          tooltipText="Select project"
          kbdKey="r"
          value={projects?.value}
          onChange={(value) => {
            setProjects(
              PROJECTS_DATA.find((item) => item.value === value) || null,
            );
          }}
        />
      </div>
    </>
  );
};
export default Attributes;
