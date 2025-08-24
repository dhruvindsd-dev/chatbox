"use client";
import Input from "./sections/input";
import TopInfo from "./sections/top-info";

const TaskModal = () => {
  return (
    <div className="w-[720px] bg-white shadow rounded-[10px]">
      <TopInfo />
      <Input />
    </div>
  );
};
export default TaskModal;
