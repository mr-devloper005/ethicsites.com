"use client";

import { useParams } from "next/navigation";
import { CreateTaskForm } from "../create-task-form";
import type { TaskKey } from "@/lib/site-config";

export default function CreateTaskPage() {
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  return <CreateTaskForm taskKey={taskKey} requireTaskEnabled />;
}
