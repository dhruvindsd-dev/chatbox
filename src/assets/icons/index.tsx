import ASSIGN from "./assign.svg";
import ATTACHMENTS from "./attachments.svg";
import BOLD from "./bold.svg";
import CHEVRON_RIGHT from "./chevron-right.svg";
import CODE from "./code.svg";
import DUE from "./due.svg";
import EMOJI from "./emoji.svg";
import ENTER from "./enter.svg";
import HEADING from "./heading.svg";
import ITALIC from "./italic.svg";
import LINK from "./link.svg";
import NUM_LIST from "./num-list.svg";
import PRIORITY from "./priority.svg";
import TAG from "./tag.svg";
import THUNDER from "./thunder.svg";
import TODO_LIST from "./todo-list.svg";
import TODO from "./todo.svg";
import UL_LIST from "./ul-list.svg";

import PRIORITY_HIGH from "./priority-high.svg";
import PRIORITY_LOW from "./priority-low.svg";
import PRIORITY_MEDIUM from "./priority-medium.svg";
import PRIORITY_URGENT from "./priority-urgent.svg";
import PROJECTS from "./projects.svg";
import TODO_BACKLOG from "./todo-backlog.svg";
import TODO_CANCEL from "./todo-cancel.svg";
import TODO_DONE from "./todo-done.svg";
import TODO_PROGRESS from "./todo-progress.svg";
import TAG_A from "./tag-a.svg";
import SPARKLE from "./sparkle.svg";

const ICONS = {
  ATTACHMENTS,
  BOLD,
  CHEVRON_RIGHT,
  CODE,
  DUE,
  EMOJI,
  ENTER,
  HEADING,
  ITALIC,
  LINK,
  NUM_LIST,
  THUNDER,
  TODO_LIST,
  UL_LIST,

  TODO,
  ASSIGN,
  PRIORITY_HIGH,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  PRIORITY_URGENT,
  PRIORITY,
  PROJECTS,
  TAG,
  TODO_BACKLOG,
  TODO_CANCEL,
  TODO_DONE,
  TODO_PROGRESS,
  TAG_A,
  SPARKLE,
};

export type IconName = keyof typeof ICONS;
export default ICONS;
