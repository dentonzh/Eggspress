---
title: "About"
subtitle: "What is Eggspress?"
subheading: "This is a custom page"

isVisible: true
isArchived: false
isContentHidden: false
contentMessage: ""

sidebar: "eggspress-links"
weight: 50
---

This is a brand new Eggspress site! Come back soon for more content on this page.


**If you're the author:**

You can find this page in `my_pages` as `about.md`. In the frontmatter, you'll notice that there is this field, `sidebar: "eggspress-links"`. This means that this page should display a sidebar with data stored in `my_sidebars/eggspress_links.md`.

Below the sidebar key is an entry `weight: 50`. The higher the weight, the lower this page will appear in a list of pages. If you create a new page with `weight: 20` for example, that new page will appear above this page. 

To adjust how custom pages are sorted, open `my_settings/appearance.md` and update `orderPagesBy`. By default, it is set to `"alphabetical"`, but this can be changed to `"weight"` or `"date"`. You can reverse the sorting order by setting `orderPagesByReversed` to `true`.

The default settings for custom pages sorting are:

```
orderPagesBy: "alphabetical"
orderPagesByReversed: false
```