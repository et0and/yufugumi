import fs from "fs";
import path from "path";
import { cache } from "react";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

interface MDXData {
  metadata: Metadata;
  slug: string;
  content: string;
}

function parseFrontmatter(fileContent: string): {
  metadata: Metadata;
  content: string;
} {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match?.[1] ?? "";
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key = "", ...valueArr] = line.split(": ");
    const value = valueArr.join(": ").trim();
    const trimmedKey = key.trim();
    if (isValidMetadataKey(trimmedKey)) {
        metadata[trimmedKey] = value;
    }
});

  if (!metadata.title || !metadata.publishedAt || !metadata.summary) {
    throw new Error("Invalid frontmatter: missing required fields");
  }

  return { metadata: metadata as Metadata, content };
}

// Type guard function to check if a string is a valid Metadata key
function isValidMetadataKey(key: string): key is keyof Metadata {
  return ['title', 'publishedAt', 'summary', 'image'].includes(key);
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string): {
  metadata: Metadata;
  content: string;
} {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

const getMDXData = cache((dir: string): MDXData[] => {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
});

export const getCataloguePosts = cache((): MDXData[] => {
  return getMDXData(path.join(process.cwd(), "catalogue"));
});

export async function getPaginatedCataloguePosts(
  page: number,
  postsPerPage: number,
): Promise<{
  posts: MDXData[];
  totalPages: number;
}> {
  const allPosts = getCataloguePosts();
  const sortedPosts = allPosts.sort((a, b) =>
    a.metadata.title.localeCompare(b.metadata.title),
  );

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages,
  };
}
