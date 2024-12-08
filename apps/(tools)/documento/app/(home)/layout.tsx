import { baseOptions } from "@/app/layout.config";
import Live from "@/components/live";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions}>
      <Live />
      {children}
    </HomeLayout>
  );
}
