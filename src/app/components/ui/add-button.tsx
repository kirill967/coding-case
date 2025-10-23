import { Plus } from "lucide-react";
import { Button } from "./button";

export function AddButton(
  props: Omit<React.ComponentProps<typeof Button>, "icon" | "children">
) {
  return <Button icon={<Plus />} {...props} />;
}
