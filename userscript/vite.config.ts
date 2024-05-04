import { PluginOption, defineConfig } from "vite";
import fs from "node:fs";

export default defineConfig(({ mode }) => {
    console.log("Building in", mode);
    return {
        plugins: [bundlePlugin],
        base: "./",
        root: "../",
        build: {
            cssCodeSplit: false,
            cssMinify: false,
            emptyOutDir: false,
            outDir: "dist",
            minify: false,
            sourcemap: false,
            lib: {
                entry: "userscript/src/index.tsx",
                name: "userscript",
                fileName: (_format) => `react-userscripts.user.js`,
                formats: ["iife"],
            },
            rollupOptions: {
                output: {
                    banner: `// ==UserScript==`,
                    inlineDynamicImports: true,
                },
            },
        },
        preview: {
            port: 8124,
            strictPort: true,
        },
        define: {
            // Don't pick up weird variables from `NODE_ENV`
            // https://github.com/vitejs/vite/discussions/13587
            "process.env.NODE_ENV": JSON.stringify(mode),
        },
    };
});

const bundlePlugin: PluginOption = {
    name: "bundle-plugin",
    apply: "build",
    enforce: "post",
    generateBundle(options, bundle) {
        // Gather all the CSS together to be injected later
        let css = "";
        for (const fileName in bundle) {
            const chunk = bundle[fileName];
            if (chunk.type === "asset" && chunk.fileName.endsWith(".css")) {
                console.log(
                    "\nFound CSS chunk",
                    chunk.fileName,
                    "Inlining and removing from bundle."
                );
                css += chunk.source;
                delete bundle[fileName];
            }
        }
        for (const fileName in bundle) {
            const chunk = bundle[fileName];
            if (chunk.type === "chunk") {
                // This may mess the source map :-(
                chunk.code = addHeader(chunk.code);

                // Inject the CSS into the bundle
                chunk.code += `;\n(function(){
                    const el = document.createElement("style");
                    el.innerText = ${JSON.stringify(css)};
                    el.type = "text/css";
                    document.head.appendChild(el);
                })();`;
            }
        }
        function addHeader(code: string) {
            const header = fs.readFileSync("src/userscript-header.js", "utf-8");
            console.log("\nAdding header to userscript:\n", header);
            return `${header}\n${code}`;
        }
    },
};
