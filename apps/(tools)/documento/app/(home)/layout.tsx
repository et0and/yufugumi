import { baseOptions } from "@/app/layout.config";
import Live from "@/components/live";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const live = await Live();

  return (
    <HomeLayout {...baseOptions}>
      {live}
      {children}
    </HomeLayout>
  );
}
