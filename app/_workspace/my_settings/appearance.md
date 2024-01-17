---
fontFamily: "Roboto_Flex"

colorScheme: "carbon"
theme: "eggspress"

sidebar: "index"
brandText: "Eggspress"
showBrandLogo: true
showBrandText: false

numberOfPostsPerPage: 8

showShareButtonInHeader: true
showShareButtonInPostContent: true
showShareButtonInPostSidebar: true
showShareButtonInPageContent: true
showShareButtonInPageSidebar: true

showShareByLinkButton: true
showShareByEmailButton: true
showShareByXButton: true
showShareByFacebookButton: true
showShareByLinkedinButton: true
showShareByRedditButton: true
showShareByHackernewsButton: false
showShareByFlipboardButton: false
showShareByWhatsappButton: false
showShareByTelegramButton: false

orderPostsBy: "date"
orderPostsByReversed: false
orderPostsInCategoriesBy: "date"
orderPostsInCategoriesByReversed: false
orderPostsInAuthorsBy: "date"
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

Eggspress makes it easy to use Google Fonts via the fontFamily key above. We recommend using variable fonts, which you can find in this list https://fonts.google.com/variablefonts#font-families and preview at https://fonts.google.com/?vfonly=true

Note: when setting fonts, replace spaces in names with underscores ("Roboto Flex" becomes "Roboto_Flex," for example).

The "sidebar" key allows you to specify which sidebar to display on the main ("index") page. By default, it points to a sidebar in the my_sidebars folder named index.md. To change this sidebar, open the my_sidebars folder and edit index.md.

Keys prefixed with "showPostCard" allow you to toggle elements that appear in post cards on and off. The title of the post must appear, but all other elements can be switched on or off. If an item is on, it should be set to "true" (without quotation marks) and "false" or empty otherwise.

To change your icons and logos, replace the files in the `my_settings/brand` folder with your files of the exact names. These files must be in .png format.

To set your color scheme, you can define the name of a file in `my_settings/colors/` without its extension. You may create your own colors either by modifying an existing palette or duplicating an existing palette and modifying it.