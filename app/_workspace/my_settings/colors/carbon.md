---
colorThemeNavDark: "slate-900"
colorThemeNavLight: "gray-100"
colorThemeHeroDark: "slate-900"
colorThemeHeroLight: "gray-100"
colorThemeBodyDark: "slate-800"
colorThemeBodyLight: "white"
colorThemeFooterDark: "slate-900"
colorThemeFooterLight: "gray-100"

colorScrollbarThumbDark: "#6073a6"
colorScrollbarThumbLight: "#cccccc"
colorScrollbarTrackDark: "#364161"
colorScrollbarTrackLight: "#eeeeee"

colorNavBarBrandTextDark: "gray-100"
colorNavBarBrandTextLight: "gray-800"

colorNavMenuBackgroundDark: "slate-800"
colorNavMenuBackgroundLight: "white"
colorNavMenuBackgroundShadowDark: "gray-700/50"
colorNavMenuBackgroundShadowLight: "gray-700/50"
colorNavMenuTextDark: "gray-200"
colorNavMenuTextLight: "gray-800"

colorHeroHeadlineDark: "gray-200"
colorHeroHeadlineLight: "gray-800"
colorHeroSubtitleDark: "gray-400"
colorHeroSubtitleLight: "gray-500"
colorHeroSubheadingDark: "gray-200"
colorHeroSubheadingLight: "gray-800"
colorHeroSectionStringDark: "gray-200"
colorHeroSectionStringLight: "gray-800"
colorHeroSectionLinkDark: "gray-200"
colorHeroSectionLinkLight: "gray-800"
colorHeroDateDark: "gray-200"
colorHeroDateLight: "gray-800"
colorHeroSectionDateBorderDark: "gray-500"
colorHeroSectionDateBorderLight: "gray-300"

colorContentBodyHeadingDark: "gray-200"
colorContentBodyHeadingLight: "gray-800"
colorContentBodyTextDark: "gray-200"
colorContentBodyTextLight: "gray-800"
colorContentLinkTextDark: "blue-400"
colorContentLinkTextLight: "blue-600"
colorContentCodeTextDark: "sky-100"
colorContentCodeTextLight: "sky-900"
colorContentCodeBackgroundDark: "[#0e415e]"
colorContentCodeBackgroundLight: "gray-200"
colorContentBlockquoteBorderDark: "gray-500"
colorContentBlockquoteBorderLight: "gray-300"
colorContentTableBorderDark: "gray-600"
colorContentTableBorderLight: "gray-400"
colorContentCodeBlockBackgroundDark: ""
colorContentCodeBlockBackgroundLight: ""

colorReturnToTopButtonBackgroundDark: "gray-700"
colorReturnToTopButtonBackgroundLight: "gray-200"
colorReturnToTopButtonTextDark: "white"
colorReturnToTopButtonTextLight: "gray-800"

colorPostCardHeadingDark: "gray-100"
colorPostCardHeadingLight: "gray-900"
colorPostCardTextDark: "gray-200"
colorPostCardTextLight: "gray-800"
colorPostCardReadMoreTextDark: "gray-400"
colorPostCardReadMoreTextLight: "gray-600"

colorAuthorCardHeadingDark: "gray-100"
colorAuthorCardHeadingLight: "gray-900"
colorAuthorCardTextDark: "gray-200"
colorAuthorCardTextLight: "gray-800"
colorAuthorCardLinkLabelDark: "gray-200"
colorAuthorCardLinkLabelLight: "gray-800"
colorAuthorCardLinkTextDark: "blue-300"
colorAuthorCardLinkTextLight: "slate-600"
colorAuthorCardLinkTextHoverDark: "slate-600"
colorAuthorCardLinkTextHoverLight: "slate-800"

colorSidebarRelatedPostDark: "gray-100"
colorSidebarRelatedPostLight: "gray-900"
colorSidebarRelatedPostHoverDark: "gray-200"
colorSidebarRelatedPostHoverLight: "gray-800"

colorSidebarPinnedPostDark: "gray-100"
colorSidebarPinnedPostLight: "gray-800"
colorSidebarHeadingDark: "gray-200"
colorSidebarHeadingLight: "gray-700"
colorSidebarTextDark: "gray-300"
colorSidebarTextLight: "gray-600"
colorSidebarLinkTextDark: "blue-300"
colorSidebarLinkTextLight: "slate-600"
colorSidebarLinkTextHoverDark: "slate-600"
colorSidebarLinkTextHoverLight: "slate-800"

colorTableOfContentsTextDark: "gray-200"
colorTableOfContentsTextLight: "gray-700"
colorTableOfContentsTextHoverDark: "blue-800"
colorTableOfContentsTextHoverLight: "blue-400"
colorTableOfContentsTextActiveDark: "blue-800"
colorTableOfContentsTextActiveLight: "blue-400"

colorFooterLinkTextDark: "gray-200"
colorFooterLinkTextLight: "gray-700"

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