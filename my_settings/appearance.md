---
fontFamily: "Readex Pro"

sidebar: "index"
brandText: "Eggspress Docs"
showBrandLogo: true
showBrandText: false

numberOfPostsPerPage: 8

hiddenContentMessage: "This page is archived and may contain out of date information"
hiddenContentIsHidden: false
hiddenContentIsHiddenMessageHeading: "This content is unavailable"
hiddenContentIsHiddenMessageBodyText: "We're sorry, the page you're visiting is no longer available."

paginatedPostHeadlineSeparator: ""
paginatedCategoryHeadlineSeparator: ""
paginatedAuthorHeadlineSeparator: ""
paginatedPostSubtitlePrefix: " // Page "
paginatedCategorySubtitlePrefix: " // Page "
paginatedAuthorSubtitlePrefix: " // Page "

paginatedSubheadingIndexPrefix: "Displaying posts "
paginatedSubheadingTotalPrefix: " of "

orderPostsBy: "weight"
orderPostsByReversed: false
orderPostsInCategoriesBy: "weight"
orderPostsInCategoriesByReversed: false
orderPostsInAuthorsBy: "weight"
orderPostsInAuthorsByReversed: false

orderPagesBy: "alphabetical"
orderPagesByReversed: false

orderCategoriesBy: "alphabetical"
orderCategoriesByReversed: false

orderAuthorsBy: "weight"
orderAuthorsByReversed: false

showTableOfContentsOnMobile: true
showTableOfContentsInSidebar: true

showPostCardCategory: true
showPostCardDate: true
showPostCardAuthor: false
showPostCardSnippet: true
showPostCardReadMoreButton: true

showAuthorCardDescription: true
showAuthorCardLinks: true
showAuthorCardProfileImage: true
showAuthorCardProfileImageOnRight: false

colorThemeNavDark: "[#201603]"
colorThemeNavLight: "amber-300"
colorThemeHeroDark: "[#201603]"
colorThemeHeroLight: "amber-300"
colorThemeBodyDark: "[#2e1f0d]"
colorThemeBodyLight: "yellow-100"
colorThemeFooterDark: "[#0f0c00]"
colorThemeFooterLight: "amber-200"

colorNavBarBrandTextDark: "gray-100"
colorNavBarBrandTextLight: "gray-800"

colorNavMenuBackgroundDark: "yellow-400"
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

colorSidebarPinnedPostDark: ""
colorSidebarPinnedPostLight: ""
colorSidebarHeadingDark: ""
colorSidebarHeadingLight: ""
colorSidebarTextDark: ""
colorSidebarTextLight: ""
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

For a list of available fonts, see https://fonts.google.com/variablefonts#font-families
Note: when setting fonts, replace spaces in names with underscores ("Roboto Flex" becomes "Roboto_Flex," for example).

The "sidebar" key allows you to specify which sidebar to display on the main ("index") page. By default, it points to a sidebar in the my_sidebars folder named index.md. To change this sidebar, open the my_sidebars folder and edit index.md.

Keys prefixed with "showPostCard" allow you to toggle elements that appear in post cards on and off. The title of the post must appear, but all other elements can be switched on or off. If an item is on, it should be set to "true" (without quotation marks) and "false" or empty otherwise.

Keys prefixed with "color" allow you to define the color scheme of your Eggspress blog. Eggspress uses Tailwind, which includes an expansive palette of predefined colors to choose from here: https://tailwindcss.com/docs/customizing-colors.

All color keys are split between light and dark mode with "Light" and "Dark" suffixes.

To set a custom color, set the value of a color to its hexadecimal value in square brackets. For example, colorHeroHeadlineLight: "[#239e44]" sets the site title / content headline text to a green color defined by hexadecimal value #239e44.

The value "transparent" can also be used to set a color key.

To change your icons and logos, replace the files in the `my_settings/brand` folder with your files of the exact names. These files must be in .png format.
