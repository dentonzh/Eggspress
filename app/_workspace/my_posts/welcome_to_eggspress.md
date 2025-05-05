---
title: "Welcome to Eggspress!"
date: "2023-10-25T00:00:00-0400"
weight: 20
subtitle: ""
subheading: "Here are a few things you should know about publishing to your new site"

author: "eggie, beakster"
snippet: "Welcome to the world of Eggspress! In this post, Eggie and Beakster will show you all of the things you can do in your Eggspress content."
sidebar: "eggspress_links"
category: "miscellaneous"

prevPost: ""
nextPost: "another-placeholder"

image: "fields.jpeg"
imagePositionY: 25
imagePositionX: 50
showImageInHeader: true

isVisible: true
isArchived: false
isContentHidden: false
contentMessage: ""

relatedPost1: "another-placeholder"
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
relatedPost5: ""
relatedPost6: ""
relatedPost7: ""
relatedPost8: ""
relatedPost9: ""
---

We're so egg-cited to have you here! I'm [Eggie](my_authors/eggie.md) and this is my friend [Byline](my_authors/beakster.md). In this post, we'll show off all of the elements you'll be able to include in your posts! We'll look at headings, tables, blockquotes, code blocks, and even a few footnotes. Let's dive in!

## How do I add content to my posts?

In addition to the content you're reading here, you can customize and add your own sidebars, create new author profiles, and much more.

This is done by setting the "[frontmatter](https://eggspress.vercel.app/blog/frontmatter)." If you need help getting started with editing this content, we recommend starting with [this article](https://eggspress.vercel.app/blog/editing-content) from the [Getting started guide](https://eggspress.vercel.app/getting-started).

![Eggie and Byline frolicking through the fields](fields.jpeg)

### Referencing other content

To create a reference, take the filename of the content item you're trying to reference. Then, drop its extension and set it as the value of the relevant frontmatter key.

Phew, that was a mouthful. Maybe it's easier just to show you by example.

The sidebar on this page is stored in a file called `eggspress_links.md` (found in the `my_sidebars` folder). To use it, drop the `.md` extension part of the name so that it's now `eggspress_links`. This turns into `sidebar: eggspress_links` in your frontmatter.

You'll follow this same process to attribute posts to authors, set previous / next posts, and specify which posts are related to one you're editing.

### Author Profile

Author profiles are stored in files in a folder called `my_authors`. Eggspress pulls data from these files to create the author cards you see for us on this page!

Author profiles also help generate the author pages you see when you click on our names in the author cards.

> **Quick side note:** You can attribute a post to multiple authors by separating authors by commas.

### Related, Previous, and Next Posts

Eggspress can point your readers to other posts on your site, guiding them to relevant information.

These links can appear at the end of a post and/or in the sidebar. You can set which posts are related and one post each for your previous and next posts.

## Styling your content

### Markdown tables

We wanted to take a moment here and demo one of our favorite Eggspress features - markdown tables! They make it so easy to organize information in clean rows and columns.

For example, let's look at a handy table comparing some popular egg dishes, cook times, and why people love eating them[^1]:

| Egg Type    | Time       | Why People Love It                                              |
| ----------- | ---------- | --------------------------------------------------------------- |
| Soft-Boiled | 6 minutes  | The runny yolk is perfect for dipping toast                     |
| Hard-Boiled | 12 minutes | Easy protein on-the-go                                          |
| Scrambled   | 8 minutes  | Fluffy, creamy, and versatile                                   |
| Over Easy   | 5 minutes  | Get that beautiful runny yolk to mix with other breakfast items |
| Poached     | 4 minutes  | Fancy egg cups to impress your guests                           |

There you have it - an egg-cellent markdown table example! As you can see, it's great for breaking down detailed information in a reader-friendly format.

### Bulleted lists and another footnote

Humans have been gobbling up eggs since the Neolithic Age![^2] Did you know:

- Chicken domestication began over 8,000 years ago in Southeast Asia
- Egyptians and Chinese were among the first to create artificial incubation
- Eggs became a common food in Europe, Asia, and the Middle East centuries ago

Fascinating stuff, right Byline? Our ancestors loved eggs just as much as we do today!

### Blockquotes

> I was able to get my blog up and running in under an hour thanks to Eggspress's simple setup!

- Mary Thompson, Lifestyle Blogger

> I love how fast and optimized Eggspress is. My site loads lighting fast even with tons of images.

- James Lee, Travel Photographer

> Eggspress is the easiest way I've found to publish my thoughts to the world!

- Jane, Eggspress user

### Code Blocks with Syntax Highlighting

You can share your code snippets by sandwiching one or more lines of code between two lines of three backticks. To enable syntax highlighting, simply add the name of the programming language you're presenting at the end of the first set of backticks like so:

````markdown
```python
def greet(name):
    print(f"Hello, {name}!")

person = "World"
greet(person)
```
````

The above will render into this code block:

```python
def greet(name):
    print(f"Hello, {name}!")

person = "World"
greet(person)
```

## Bulk Editing Links

Need to automatically replace the base URL and/or add a prefix or suffix to URLs that match a specific domain? Update `my_settings/links.md`.
The following is an example of a modified link:

> [Search 20,000 online courses](https://opencourser.com) with OpenCourser!

In this example, we specify `opencourser.com` as the base URL to match. For all matching external links that have `opencourser.com` as the base URL, we add
`?utm_source=eggspress&utm_medium=blog&utm_campaign=new_blog` as a suffix. This is applied to all content items. In our settings, this looks like this:

```
modifyLinkBaseUrl1: "opencourser.com"
modifyLinkStrictMatch1: true
modifyLinkSetPrefix1: ""
modifyLinkSetSuffix1: "?utm_source=eggspress&utm_medium=blog&utm_campaign=new_blog"
modifyLinkSetNewBaseUrl1: ""
```

If we also needed to match instances of different subdomains and top-level domains, we can set strict matching to `false`. This can be useful if you need to apply the same changes to sites that may have different subdomains (e.g. `www.opencourser.com`) or TLDs (e.g. `amazon.com`, `amazon.jp`, etc.)

## Start writing!

Hopefully this little tour cracked open all the egg-cellent things Eggspress can do! We showed you headings, tables, quotes, footnotes - all formatted in simple markdown. Now you can start styling your first post however you like!

Get started by renaming this file and editing its contents. Happy blogging! 😄

Best,
Eggie & Byline

[^1]: Egg cooking times source: The Incredible Egg Cookbook by the American Egg Board
[^2]: Egg history facts from The Incredible Egg
