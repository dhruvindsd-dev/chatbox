"use client";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const TaskModal = dynamic(() => import("@/components/elements/task-modal"), {
  ssr: false,
  loading: () => (
    <div>
      <Skeleton className="h-[210px] w-[720px] rounded-2xl" />
      <Skeleton className="h-[90px] mt-4 w-[720px] rounded-2xl" />
    </div>
  ),
});

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 gap-12">
      <TaskModal />
    </div>
  );
}
