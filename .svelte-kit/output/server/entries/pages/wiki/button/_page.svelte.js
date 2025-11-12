import { x as attributes, y as clsx, J as attr_class, z as ensure_array_like, K as stringify } from "../../../../chunks/index.js";
import { tv } from "tailwind-variants";
import { l as escape_html } from "../../../../chunks/context.js";
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const colors = [
      "accent",
      "gray",
      "zinc",
      "neutral",
      "stone",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose"
    ];
    const button = tv({
      base: [
        "relative isolate inline-flex h-8 min-w-8 shrink-0 cursor-pointer appearance-none items-center justify-center gap-x-2 gap-y-2 rounded border border-solid border-gray-300/90 bg-gray-50/20 px-3 align-middle text-sm leading-5 font-medium wrap-break-words whitespace-nowrap text-gray-900 shadow-sm outline-0 transition-[background-color,border-color,color,fill,stroke,opacity,box-shadow,transform] duration-200 select-none before:border-solid after:border-solid hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50 [-webkit-tap-highlight-color:transparent]"
      ],
      variants: {
        variant: {
          glass: "overflow-x-clip overflow-y-clip border-0 border-solid border-gray-200 bg-zinc-500 text-white shadow-inner [text-shadow:0_1px_2px_#0000004d] before:border-0 before:border-gray-200 hover:bg-zinc-500",
          solid: "border-0 border-gray-200 bg-zinc-500 text-white shadow before:border-0 before:border-gray-200 after:border-0 after:border-gray-200 hover:bg-zinc-500/90",
          subtle: "border-0 border-solid border-gray-200 bg-gray-50 before:border-0 before:border-gray-200 after:border-0 after:border-gray-200 hover:bg-gray-100 shadow-none dark:border-gray-800 dark:before:border-gray-800 dark:after:border-gray-800 dark:text-gray-200 dark:bg-gray-950  dark:focus-visible:outline-zinc-600 dark:hover:bg-gray-900",
          surface: "",
          outline: "",
          ghost: "",
          plain: ""
        },
        colorScheme: Object.fromEntries(colors.map((c) => [c, ""])),
        size: {
          xs: "h-6 min-w-6 gap-x-1 gap-y-1 px-2 text-xs leading-4",
          sm: "h-7 min-w-7 px-2.5 text-sm leading-5",
          md: "",
          lg: "h-10 min-w-10 gap-x-3 gap-y-3 rounded-md px-5",
          xl: "h-12 min-w-12 gap-x-3 gap-y-3 rounded-md px-6 text-base leading-6"
        }
      },
      compoundVariants: [
        /*	...generateColorVariants(
        	"solid",
        	(c) => `bg-${c}-solid text-${c}-contrast hover:opacity-90`,
        ),
        ...generateColorVariants(
        	"outline",
        	(c) =>
        		`border border-${c}-fg text-${c}-fg hover:bg-${c}-subtle`,
        ),
        ...generateColorVariants(
        	"ghost",
        	(c) => `text-${c}-fg hover:bg-${c}-subtle`,
        ),
        ...generateColorVariants(
        	"subtle",
        	(c) => `bg-${c}-subtle text-${c}-fg hover:bg-${c}-muted`,
        ),*/
      ],
      defaultVariants: { variant: "surface", size: "md", colorScheme: "accent" }
    });
    const glassOverlay = "pointer-events-none absolute inset-0 border-0 border-solid border-gray-200 bg-[linear-gradient(#fff_40%,#0003)] opacity-20 transition-opacity duration-200 hover:bg-zinc-500 group-hover:bg-[linear-gradient(#fffc_40%,#0009)]";
    let {
      variant,
      size,
      colorScheme,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const buttonClass = button({ variant, size, colorScheme, class: className });
    const finalButtonClass = variant === "glass" ? `${buttonClass} group` : buttonClass;
    $$renderer2.push(`<button${attributes({ class: clsx(finalButtonClass), ...restProps })}>`);
    if (variant === "glass") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_class(clsx(glassOverlay))} aria-hidden="true"></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    children?.($$renderer2);
    $$renderer2.push(`<!----></button>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const variants = [
      "solid",
      "outline",
      "ghost",
      "subtle",
      "surface",
      "glass",
      "plain"
    ];
    const colors = [
      "accent",
      "gray",
      "red",
      "green",
      "blue",
      "yellow",
      "purple",
      "pink"
    ];
    const sizes = ["xs", "sm", "md", "lg", "xl"];
    let variant = "solid";
    let color = "accent";
    let size = "md";
    let disabled = false;
    const needsColor = ["solid", "outline", "ghost", "subtle"].includes(variant);
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"><div class="max-w-4xl p-8 mx-auto"><h1 class="mb-8 text-3xl font-semibold text-gray-900 dark:text-white">Button Playground</h1> <div class="bg-white rounded-2xl dark:bg-gray-800"><div class="p-12 border-b dark:border-gray-700"><div class="flex items-center justify-center">`);
    Button($$renderer2, {
      variant,
      colorScheme: needsColor ? color : void 0,
      size,
      disabled,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Button Text`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div> <div class="p-6 space-y-6"><div class="grid grid-cols-2 gap-4 sm:grid-cols-4"><div><label class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">Variant</label> `);
    $$renderer2.select(
      {
        value: variant,
        class: "w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(variants);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let v = each_array[$$index];
          $$renderer3.option({ value: v }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(v)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> `);
    if (needsColor) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div><label class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">Color</label> `);
      $$renderer2.select(
        {
          value: color,
          class: "w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        },
        ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(colors);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let c = each_array_1[$$index_1];
            $$renderer3.option({ value: c }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(c)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div><label class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">Size</label> `);
    $$renderer2.select(
      {
        value: size,
        class: "w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(sizes);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let s = each_array_2[$$index_2];
          $$renderer3.option({ value: s }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(s.toUpperCase())}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">State</label> <button${attr_class(`w-full px-3 py-2 text-sm font-medium transition-colors rounded-lg ${stringify("bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400")}`)}>${escape_html("Enabled")}</button></div></div></div></div></div></div>`);
  });
}
export {
  _page as default
};
