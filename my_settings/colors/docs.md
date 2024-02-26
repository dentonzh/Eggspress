---
colorThemeNavDark: "[#201603]"
colorThemeNavLight: "amber-300"
colorThemeHeroDark: "[#201603]"
colorThemeHeroLight: "amber-300"
colorThemeBodyDark: "[#2e1f0d]"
colorThemeBodyLight: "yellow-100"
colorThemeFooterDark: "[#0f0c00]"
colorThemeFooterLight: "amber-200"  

colorScrollbarThumbDark: "#a5875f"
colorScrollbarThumbLight: "#e3deb5"
colorScrollbarTrackDark: "#623e37"
colorScrollbarTrackLight: "#f2eed9"

colorNavBarBrandTextDark: "gray-100"
colorNavBarBrandTextLight: "gray-800"

colorNavMenuBackgroundDark: "[#efe3cd]"
colorNavMenuBackgroundLight: "white"
colorNavMenuBackgroundShadowDark: "yellow-700/50"
colorNavMenuBackgroundShadowLight: "gray-700/50"
colorNavMenuTextDark: "yellow-800"
colorNavMenuTextLight: "gray-800"

colorHeroHeadlineDark: "stone-400"
colorHeroHeadlineLight: "green-950"
colorHeroSubtitleDark: "stone-600"
colorHeroSubtitleLight: "lime-700"
colorHeroSubheadingDark: "stone-400"
colorHeroSubheadingLight: "green-900"
colorHeroSectionStringDark: "stone-400"
colorHeroSectionStringLight: "green-900"
colorHeroSectionLinkDark: "stone-400"
colorHeroSectionLinkLight: "green-900"
colorHeroDateDark: "stone-400"
colorHeroDateLight: "green-900"
colorHeroSectionDateBorderDark: "amber-700"
colorHeroSectionDateBorderLight: "amber-500"

colorContentBodyHeadingDark: "stone-300"
colorContentBodyHeadingLight: "stone-800"
colorContentBodyTextDark: "stone-300"
colorContentBodyTextLight: "stone-800"
colorContentLinkTextDark: "yellow-200"
colorContentLinkTextLight: "yellow-800"
colorContentCodeTextDark: "yellow-200"
colorContentCodeTextLight: "yellow-900"
colorContentCodeBackgroundDark: "yellow-900"
colorContentCodeBackgroundLight: "yellow-200"
colorContentCodeBlockBackgroundDark: "#171e29"
colorContentCodeBlockBackgroundLight: "#fffcd8"

colorPostCardHeadingDark: "stone-300"
colorPostCardHeadingLight: "stone-800"
colorPostCardTextDark: "stone-300"
colorPostCardTextLight: "stone-800"
colorPostCardReadMoreTextDark: "stone-300"
colorPostCardReadMoreTextLight: "stone-800"

colorAuthorCardHeadingDark: "stone-300"
colorAuthorCardHeadingLight: ""
colorAuthorCardTextDark: "stone-300"
colorAuthorCardTextLight: ""
colorAuthorCardLinkLabelDark: ""
colorAuthorCardLinkLabelLight: ""
colorAuthorCardLinkTextDark: ""
colorAuthorCardLinkTextLight: ""
colorAuthorCardLinkTextHoverDark: ""
colorAuthorCardLinkTextHoverLight: ""

colorSidebarRelatedPostDark: ""
colorSidebarRelatedPostLight: ""
colorSidebarRelatedPostHoverDark: ""
colorSidebarRelatedPostHoverLight: ""

colorSidebarPinnedPostDark: "gray-300"
colorSidebarPinnedPostLight: "gray-600"
colorSidebarHeadingDark: "gray-300"
colorSidebarHeadingLight: "gray-600"
colorSidebarTextDark: "gray-300"
colorSidebarTextLight: "gray-600"
colorSidebarLinkTextDark: "yellow-100"
colorSidebarLinkTextLight: "amber-900"

colorTableOfContentsTextDark: ""
colorTableOfContentsTextLight: ""
colorTableOfContentsTextHoverDark: ""
colorTableOfContentsTextHoverLight: ""
colorTableOfContentsTextActiveDark: ""
colorTableOfContentsTextActiveLight: ""

colorFooterLinkTextDark: "yellow-100"
colorFooterLinkTextLight: ""
---

Keys prefixed with "color" allow you to define the color scheme of your Eggspress blog. Eggspress uses Tailwind, which includes an expansive palette of predefined colors to choose from here: https://tailwindcss.com/docs/customizing-colors.

If a color key is empty (""), then the color selected will be the one specified by the theme.

To set the text color of the main headline in dark mode to a light gray, we could do something like:

`colorHeroHeadlineDark: "gray-200"`.

It is also possible to set opacity in addition to color by affixing a forward slash and a number (usually increments of 10, but some increments of 5-- see https://tailwindcss.com/docs/text-color#changing-the-opacity). This will make an element semi-transparent.

For example, to set the background color of the shadow underlying the dropdown menu in dark mode to a darker gray with 50% opacity, we set:

`colorNavMenuBackgroundShadowDark: "gray-700/50"`

All color keys are split between light and dark mode with "Light" and "Dark" suffixes.

To set a custom color, set the value of a color to its hexadecimal value in square brackets. For example, colorHeroHeadlineLight: "[#239e44]" sets the site title / content headline text to a green color defined by hexadecimal value #239e44.

The value "transparent" can also be used to set a color key.
