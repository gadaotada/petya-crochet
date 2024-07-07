import { redirect } from "next/navigation";

import { validateRequest } from "@/services/auth/main";

export default async function TemplateControl({ children }: { children: React.ReactNode }) {

    const { user } = await validateRequest();
	
    if (user) {
		return redirect("/control/admin");
	}

    return <div>{children}</div>
  }