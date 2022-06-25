import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import path from "path";
import fs from "fs";
import glob from "glob";

export function myRemarkPlugin(fullPath: string, matterResult: any) {
  let amIAnAlert = false;
  return async (tree: any) => {
    await visit(tree, (node) => {
      if (node.value) {
        if (amIAnAlert) {
          const text = toString(node);
          const html = text;
          node.type = "html";
          node.children = undefined;
          node.value = html;
        }

        if ((node.value as string).match(/{{< figure/gm)) {
          const imgRegex = /< figure.*?src="(.*?)"[^>]+>/g;
          const imageSrc = imgRegex.exec(node.value);
          if (imageSrc) {
            console.log("imageSrc", imageSrc);
            let data = node.data || (node.data = {});
            const attributes = node.attributes || {};
            data.hName = "img";
            data.hProperties = {
              // width: 200,
              height: 200,
              class: "asd",
              src: `https://docs.mendix.com${imageSrc[1]}`,
            };
          }
        }
        // if ((node.value as string).match(/< figure [^>]*src="[^"]*"[^>]*>/gm)) {
        //   const imgRegex = /< figure.*?src="(.*?)"[^>]+>/g;
        //   const imageSrc = imgRegex.exec(node.value);
        //   if (imageSrc) {
        //     let data = node.data || (node.data = {});
        //     const attributes = node.attributes || {};
        //     data.hName = "img";
        //     data.hProperties = {
        //       // width: 200,
        //       height: 200,
        //       class: "asd",
        //       src: `https://docs.mendix.com${imageSrc[1]}`,
        //     };
        //   }
        // }
        if (
          (node.value as string).match(/{{% \/alert %}}/gm) ||
          (node.value as string).match(/{{%\/alert %}}/gm)
        ) {
          const text = toString(node).replace(`{{% /alert %}}`, "");
          amIAnAlert = false;
          const html = `</div>${text}`;
          node.type = "html";
          node.children = undefined;
          node.value = html;
        }

        if ((node.value as string).match(/{{% alert color="warning" %}}/gm)) {
          const trigger = `{{% alert color="warning" %}}`;
          if (trigger.length === node.value.length) {
            const html = `<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">`;
            node.type = "html";
            node.children = undefined;
            node.value = html;
          } else {
            const text = toString(node);
            const parsedText = text
              .replace(`{{% alert color="warning" %}}`, "")
              .replace(`{{% /alert %}}`, "");
            const html = `<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">${parsedText}</div>`;
            node.type = "html";
            node.children = undefined;
            node.value = html;
          }
        }
        if (
          (node.value as string).match(/{{% alert color="info" %}}/gm) ||
          (node.value as string).match(/{{%alert type="info" %}}/gm)
        ) {
          const trigger = `{{% alert color="info" %}}`;
          // if (trigger.length === node.value.length) {
          const text = toString(node).replace(
            trigger,
            `<div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">`
          );
          const html = `${text}`;
          node.type = "html";
          node.children = undefined;
          node.value = html;
        }
        if (
          (node.value as string).match(/{{% alert color="success" %}}/gm) ||
          (node.value as string).match(/{{%alert type="success" %}}/gm)
        ) {
          amIAnAlert = true;
          const trigger = `{{% alert color="success" %}}`;
          if (trigger.length === node.value.length) {
            const html = `<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">`;
            node.type = "html";
            node.children = undefined;
            node.value = html;
          } else {
            const text = toString(node);
            const parsedText = text
              .replace(`{{% alert color="success" %}}`, "")
              .replace(`{{%alert type="info" %}}`, "")
              .replace(`{{% /alert %}}`, "");
            const html = `<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">${parsedText}</div>`;
            node.type = "html";
            node.children = undefined;
            node.value = html;
          }
        }
      }

      if (node.type === "heading") {
        let text = toString(node);
        if (text.includes("{#")) {
          const t = text.split("{#");
          const y = t[1].split("}");
          const html = `
					<h${node.depth} id='${y[0]}'>
					${t[0]}
					</h${node.depth}>`;
          node.type = "html";
          node.children = undefined;
          node.value = html;
        }
      }

      if (node.type === "link") {
        // // New Page String

        const splitUrl = (node.url as string).split("/");
        if (splitUrl.length >= 2) {
          const cleanURLArray: string[] = splitUrl.filter(Boolean);
          const currentSubDir = fullPath.split("/docs/")[1].split("/")[0];
          const fullFolderPath = path.join(
            process.cwd(),
            "/docs/" + currentSubDir
          );
          const fileToFind = cleanURLArray[cleanURLArray.length - 1];
          try {
            const foundFile = glob.sync(
              `${fullFolderPath}/**/${fileToFind}.md`
            );
            if (foundFile.length) {
              const splitName = foundFile[0].split(process.cwd());
              const removedEmptyStrings = splitName.filter(Boolean);
              const splitfileExtention = removedEmptyStrings[0].split(".md");
              let text = toString(node);
              const html = `
							<a class="text-blue-600 hover:text-blue-700" href="${splitfileExtention[0]}.md">
							${text}
							</a>`;
              node.type = "html";
              node.children = undefined;
              node.value = html;
            } else {
              const walk = (dir: string, nameToHit: string) => {
                const files = fs.readdirSync(dir);
                files.forEach((file) => {
                  var filepath = path.join(dir, file);
                  const stats = fs.statSync(filepath);
                  if (stats.isDirectory()) {
                    if (nameToHit.trim() === file.trim()) {
                      let text = toString(node);
                      const html = `
											<a class="text-purple-600 hover:text-purple-700" href="${
                        filepath.split(process.cwd()).filter(Boolean)[0]
                      }/_">
											${text}
											</a>`;
                      node.type = "html";
                      node.children = undefined;
                      node.value = html;

                      return filepath;
                    } else {
                      walk(filepath, nameToHit);
                    }
                  }
                });
              };
              const madeSubPath = path.join(
                process.cwd(),
                "/docs/" + currentSubDir + "/" + cleanURLArray[0]
              );
              walk(madeSubPath, cleanURLArray[1]);
            }
          } catch (error) {}
        }
      }
    });
  };
}
