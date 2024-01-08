---
fontFamily: "Readex Pro"

colorScheme: "daydream"

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
