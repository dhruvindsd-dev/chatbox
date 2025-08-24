import ICONS from "@/assets/icons";
import Icon from "@/components/ui/icon";

const TopInfo = () => {
  return (
    <div className="p-4 flex gap-2 items-center">
      <div className="py-1.5 px-3 bg-gray-50 rounded-[6px] inline-flex items-center gap-2 text-gray-500">
        <Icon name="THUNDER" className="text-[#3FBC77]" />
        <span className="text-sm font-medium">Frontend</span>
      </div>

      <ICONS.CHEVRON_RIGHT className="size-3 text-gray-600" />

      <span className="text-sm font-medium text-gray-500">New Task</span>
    </div>
  );
};
export default TopInfo;
