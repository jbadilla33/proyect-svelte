import adapter from "@sveltejs/adapter-static"; // Cambia auto por static

export default {
  kit: {
    adapter: adapter({
      fallback: "404.html", // Importante para Single Page Apps
    }),
  },
};
/*import adapter from '@sveltejs/adapter-auto';

const config = {
	kit: {
			adapter: adapter()
	}
};

export default config;*/
