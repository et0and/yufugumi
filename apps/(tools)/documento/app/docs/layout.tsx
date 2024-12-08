import { baseOptions } from "@/app/layout.config";
import { Live } from "@/components/live";
import { sanityFetch } from "@/sanity/lib/live";
import { DOCS_QUERY } from "@/sanity/lib/queries";
import type { DOCS_QUERYResult } from "@/sanity/types";
import type { PageTree } from "fumadocs-core/server";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import React, { type ReactNode } from "react";

import { Suspense } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const live = await Live();
  const content = await Content({ children });

  return (
    <>
      {live}
      {content}
    </>
  );
}

async function Content({ children }: { children: ReactNode }) {
  const docs = (await sanityFetch({ query: DOCS_QUERY }))
    .data as DOCS_QUERYResult;
  const root: PageTree.Root = {
    name: "Docs",
    children: [],
  };

  for (const page of docs) {
    root.children.push({
      type: "page",
      name: page.title ?? "",
      url: `/docs/${page.slug?.current}`,
    });
  }

  return (
    <DocsLayout tree={root} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
