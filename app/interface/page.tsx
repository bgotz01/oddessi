import { redirect } from "next/navigation";

/**
 * The interface has moved to a floating modal available on every page.
 * Redirect anyone who navigates here directly back to the root.
 */
export default function InterfacePage() {
  redirect("/");
}
