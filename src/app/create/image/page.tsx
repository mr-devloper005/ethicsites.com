import { CreateTaskForm } from "../create-task-form";

export default function CreateImagePage() {
  return <CreateTaskForm taskKey="image" requireTaskEnabled={false} />;
}
