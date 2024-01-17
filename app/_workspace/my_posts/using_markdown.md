---
title: "Using Markdown"
date: "2023-10-12T00:00:00-0400"
weight: 20
subtitle: "with Brief Examples"
subheading: "Here's how you can style your content using Markdown"

author: "eggie"
snippet: "In this article, we'll discuss what Markdown is and show you examples of how you can use it in your Eggspress content."
description: "New to Markdown? We'll show you how you can use Markdown to style your Eggspress site"
sidebar: "eggspress_links"
category: "Miscellaneous"

prevPost: "welcome-to-eggspress"
nextPost: ""

image: "plane.jpeg"
imagePositionY: 30
imagePositionX: 50
showImageInHeader: true

isVisible: true
isArchived: false
isContentHidden: false
contentMessage: ""

relatedPost1: ""
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
relatedPost5: ""
relatedPost6: ""
relatedPost7: ""
relatedPost8: ""
relatedPost9: ""
---


## Getting Started with Markdown

Markdown is a simple formatting syntax that converts plain text into HTML elements. It allows you to style posts with headers, lists, links, and more without needing to write clunky HTML tags.

![Eggie and Byline taking flight over their home](plane.jpeg)

## Why Use Markdown?

Here are some key benefits of writing in markdown[^1]:

- **Easy to read/write** - The simple plaintext formatting helps content stay readable and accessible. Much better than heavy syntax or code.
- **Fast formatting** - You can style posts incredibly quickly with just a few keystrokes. 
- **Version control friendly** - Markdown plays nicely with tools like Git, allowing cleaner diffs between versions.
- **Future proof** - If you ever migrate your site away from Eggspress, the markdown will port over seamlessly. 
- **Wide device support** - Markdown is interpreted easily across all devices and screens.  

## Examples
If you're reading this page on your new site, then what you see below is the final output of various Markdown syntax. To see the raw Markdown syntax itself, take a peek at the file titled `using_markdown.md` in your `my_posts` folder.


Here is a demonstration of various markdown syntax you can include use in Eggspress pages. 

Excuse the messy formatting—these examples introduce new headings:

---

# Markdown Syntax Demo

## Headings

# Heading 1 
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Text formatting

This is *italic* text. 

This is **bold** text.

This is ~~strikethrough~~ text.

## Lists

### Unordered list

- Item 1
- Item 2
  - Nested item
  - Nested item
- Item 3

### Ordered list  

1. Item 1
2. Item 2
    1. Nested item
    2. Nested item 
3. Item 3

## Links

Here is a [link](https://www.example.com).

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Tables

| Column 1 | Column 2 | Column 3 |
|-|-|-|  
| Row 1 Cell 1 | Row 1 Cell 2 | Row 1 Cell 3 |
| Row 2 Cell 1 | Row 2 Cell 2 | Row 2 Cell 3 |

## Code blocks

```python
print("Hello World") 
```

```javascript
console.log("Hello World")
```

## Footnotes

Here is some text with a footnote[^1].

[^1]: This is the footnote.

## Horizontal rule 

---

## Escaping characters

\*literal asterisks\*


[^1]: Source: [Markdown Guide](https://www.markdownguide.org/getting-started/)