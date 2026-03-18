import { auth } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session) {
    redirect('/login')
  }

  if(session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin w-4 h-4" />
    </div>
  );
}
