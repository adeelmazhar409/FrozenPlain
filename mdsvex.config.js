// import { defineMDSveXConfig as defineConfig } from "mdsvex";
// import path from "node:path"
// import { fileURLToPath } from "node:url";

// const dirname = path.resolve(fileURLToPath(import.meta.url), '../')

// const config = defineConfig({
//     extensions: ['.md', '.svx'],
//     layout: {}
// })

// export default config

import path from "path";
import { fileURLToPath } from "url";
import { createHighlighter } from "@bitmachina/highlighter";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
    extensions: [".md"],
    layout: path.resolve(
        __dirname,
        "./src/components/mdsvex/mdsvex.svelte"
    ),
    smartypants: {
        quotes: false,
        ellipses: false,
        backticks: false,
        dashes: false
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
        /**
         * Add slugs to headers
         **/
        rehypeSlug
        // () => (tree) => {
        //     visit(tree, (node) => {
        //         if (node?.type === "raw") {
        //             console.log(node);
        //         }
        //     });
        // }
    ],
    // highlight: {
    //     highlighter: async (code, lang) => {
    //         const highlighted = (
    //             await createHighlighter({
    //                 paths: { themes: `${path.resolve(__dirname, "./other/themes/")}/` },
    //                 theme: "light"
    //             })
    //         )(code, lang);

    //         // remove the pre tag
    //         const transformed = highlighted
    //             .replace(/<(\/)?(pre)>/g, "")
    //             .replace(/{/g, "&#123;")
    //             .replace(/}/g, "&#125;");

    //         const withSvelte = `<pre >
    //         {@html \`${transformed}\`}
    //         </pre>`;

    //         return withSvelte;
    //     }
    // }
};