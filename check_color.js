import colors from 'tailwindcss/colors.js';

const zinc = colors.zinc || colors.default?.zinc; // Handle potential ESM interop

if (zinc) {
  console.log("Zinc 950:", zinc[950]);
} else {
  console.log("Zinc palette not found directy. Dumping keys:", Object.keys(colors));
}
