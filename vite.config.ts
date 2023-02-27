import path from "path";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
        svgoOptions: {
          plugins: [
            {
              name: "removeAttrs",
              params: {
                attrs: ["class", "data-name", "fill", "stroke"],
              },
            },
          ],
        },
      }),
    ],
  };
};
