import { ActionFunction, json } from "@remix-run/cloudflare";
import { themeCookie } from "~/utils/theme.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const theme = formData.get("theme");

  if (typeof theme !== "string") {
    return json({ success: false }, { status: 400 });
  }

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await themeCookie.serialize(theme),
      },
    }
  );
};