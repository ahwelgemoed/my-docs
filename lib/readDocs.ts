import glob from "glob-promise";
import matter from "gray-matter";
import { lstat, readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
// import remarkPrettier from "remark-prettier";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

import { unified } from "unified";
import { myRemarkPlugin } from "./mendixRemarkPlugin";
import remarkPrettier from "remark-prettier";

export type FilesInPath = {
  fullPath: string;
  relativePath: string;
};

const pathToDocsFolder = join(process.cwd(), "docs");

function createRelativePath(fillPath?: string): string {
  if (fillPath) {
    return join(pathToDocsFolder, fillPath);
  }
  return pathToDocsFolder;
}

export async function filesInRelativePath(
  path?: string
): Promise<FilesInPath[]> {
  const relativePath = createRelativePath(path);
  const mdFiles = await glob(`${relativePath}/**/*.md`);

  const y = await buildFilesFolder(createRelativePath());
  const builtFiles = mdFiles.map((file) => {
    return {
      fullPath: file,
      relativePath: file.replace(relativePath, ""),
    };
  });
  return builtFiles;
}

type FolderStructure = {
  type: "FOLDER";
  files: (FileStructure | FolderStructure)[];
  path: string;
};
type FileStructure = {
  type: "FILE";
  path: string;
};

async function buildFilesFolder(
  workingFromPath: string
): Promise<FolderStructure> {
  let files = [];
  const allPaths = await readdir(workingFromPath).then((list) =>
    list.filter((item) => !/(^|\/)\.[^/.]/g.test(item))
  );
  for (const path of allPaths) {
    const fileOrDir = await lstat(`${workingFromPath}/${path}`);
    // IS FILE
    if (fileOrDir.isFile()) {
      const file: FileStructure = {
        type: "FILE",
        path,
      };
      files.push(file);
    }
    //IS DIR
    if (fileOrDir.isDirectory()) {
      files.push(await buildFilesFolder(`${workingFromPath}/${path}`));
    }
  }
  return {
    type: "FOLDER",
    files,
    path: `${workingFromPath}`,
  };
}

export async function getFileData(path: string) {
  const fullPath = await createRelativePath(path);
  const rawFileData = await readFile(fullPath, "utf8");
  const matterResult = await matter(rawFileData);
  const processedContent = await unified()
    .use(remarkParse)
    // .use(remarkPrettier) //Breaks on vercel
    .use(remarkDirective)
    .use(remarkGfm)
    .use(() => myRemarkPlugin(fullPath, matterResult) as any)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.value;

  return {
    matter: matterResult.data,
    html: contentHtml,
  };
}
