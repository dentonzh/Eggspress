---
sidebar: "index"

showPostCardCategory: false
showPostCardDate: false
showPostCardAuthor: false
showPostCardSnippet: true
showPostCardReadMoreButton: true

colorDarkPrimary: "slate-900"
colorDarkSecondary: "slate-800"
colorDarkFooter: "gray-950"
colorLightPrimary: "gray-100"
colorLightSecondary: "white"
colorLightFooter: "gray-100"
---

The "sidebar" key allows you to specify which sidebar to display on the main ("index") page. By default, it points to a sidebar in the my_sidebars folder named index.md. To change this sidebar, open the my_sidebars folder and edit index.md.

Keys prefixed with "showPostCard" allow you to toggle elements that appear in post cards on and off. The title of the post must appear, but all other elements can be switched on or off. If an item is on, it should be set to "true" (without quotation marks) and "false" or empty otherwise.

Keys prefixed with "color" allow you to define the color scheme of your Eggspress blog. Eggspress uses Tailwind, which includes and expansive set of colors to select from. Color shades for these options are limited to 50, 100, 200, 800, 900, and 950. The color "white" is also available without color shades. We recommend choosing 50, 100, and 200 for light mode and 800, 900, and 950 colors for dark mode.