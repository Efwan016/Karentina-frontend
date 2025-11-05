import type { Config } from "svgo";

const config: Config = {
  multipass: true,
  plugins: [
    {
      name: "prefixIds",
      params: {
        prefixIds: false,
      },
    },
  ],
};

export default config;
