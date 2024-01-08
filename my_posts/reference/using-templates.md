---
title: "Using Templates"
subtitle: ""
subheading: "Here's how to use templates in Eggspress"
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 50
date: 2023-12-06T22:32:13-0400
author: "denton"
snippet: "Templates are great for setting up new posts quickly. We'll look at the templates that come included with Eggspress. We'll also walk you through using them with Obsidian or your preferred text editor."
description: "Eggspress uses templates to greatly accelerate your workflow. This guide walks you through using templates."
sidebar: "eggspress-links"
category: "Reference"
prevPost: ""
nextPost: ""
relatedPost1: "editing-content"
relatedPost2: "frontmatter"
relatedPost3: ""
relatedPost4: ""
relatedPost5: ""
relatedPost6: ""
relatedPost7: ""
relatedPost8: ""
relatedPost9: ""
---

Eggspress comes with a set of template files, two for each of the content types (posts, pages, authors, categories, and sidebars). They are easy to use and let you create new posts quickly.

![](my_posts/reference/images/marshmallows.jpg)

## Why use templates
Eggspress brings together individual content files to build into a site. In addition to the text and images that fill the body of a page, these files also include a lot of [frontmatter](my_posts/reference/frontmatter.md), which holds data about:
- Metadata
- References to other files
- Settings unique to the content's rendered page

While it's easy enough to copy and paste frontmatter from the most recent post into a new post, doing so can often result in errors. For example, you may forget to update the `date` field or set the correct `relatedPost`.

Templates give you a fresh start with each new content file you create.

## Using templates with Obsidian
Obsidian is our recommended desktop editor because its features make publishing on Eggspress a breeze. One benefit of using Obsidian is that it has a dedicated function for inserting templates.

To use a template in Obsidian:
1. Create a new note and give it a filename
2. Click the "Insert template" button on the left-hand ribbon
3. Select the template you wish to insert
4. Begin editing your new file

You'll notice that `title` will be pre-populated using the filename you gave your file. `date` will also have the current time.

![](my_posts/reference/images/Pasted%20image%2020231206223035.png)

![](my_posts/reference/images/Pasted%20image%2020231206222959.png)

![](my_posts/reference/images/Pasted%20image%2020231206223156.png)

![](my_posts/reference/images/Pasted%20image%2020231206223418.png)

## Using templates with other editors
If your desktop editor supports templates, you'll want to set your templates folder to `my_templates`. Otherwise, the best way to use templates is to locate the template you want from `my_templates` and copy and paste its contents into a new file.

## Creating new templates
If you find yourself modifying the same frontmatter fields over and over again, you might wish to consider creating your own template. To do so:

1. Create a copy of an existing template you want to use for your new template
2. Rename this file with a descriptive name, but note that it must start with `#`
3. Set the values for your fields

In Obsidian, you can use the strings "`{{title}}`" and "`{{date}}`" in your templates. Obsidian will automatically replace these strings with the filename of your target file and the current date, respectively.

To change the date format, 
1. Open settings (gear wheel icon on the bottom-left corner)
2. Select the "Templates" tab
3. Set "Date Format" to the format you wish to use