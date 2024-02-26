---
title: Using Frontmatter
subheading: Learn how Eggspress uses Frontmatter to build your pages
image: ""
imagePositionY: "85"
imagePositionX: "50"
weight: 150
date: 2023-11-29T00:00:00-0400
author: denton
snippet: Frontmatter contains data that can help create better experiences for you and your readers. Learn how frontmatter works and our advice for using it.
description: Frontmatter contains data that can help create better experiences for you and your readers. Learn how frontmatter works and our advice for using it.
sidebar: eggspress_links
category: "Reference"
prevPost: ""
nextPost: ""
relatedPost1: "editing-content"
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
---

When using Eggspress, you'll end up writing all of your content in `.md` files. These are Markdown files and each one can contain two sections: frontmatter and content.

![](clothesline.jpg)

## What is frontmatter?

Frontmatter is the first section. It contains a set of "key-value" pairs. Here's an example of what these pairs look like:
- `title: "One Hundred Years of Solitude"`
- `author: "marquez"`
- `category: "magical-realism"`
- `sidebar: "latin-american-literature"`
- `publicationYear: 1967`
- `pages: 422`
- `isPublished: true`
- `isPainting: false`

When building your pages, Eggspress looks up keys to retrieve values. It then uses the values it finds to do a variety of things, including:
- Rendering text and images that users can see
- Rendering special components like Author Cards
- Implementing author preferences
- Setting metadata, which search indexes and crawlers read

## Formatting frontmatter
Frontmatter is written in [YAML](https://en.wikipedia.org/wiki/YAML), but to keep things simple, Eggspress uses a very limited set of YAML syntax. We use strings (alphanumeric) for our keys and values can be strings, numbers, or boolean values.

### Strings
Strings are just text. When setting your value to a string, you can choose to wrap them in double quotes. Both of these are valid:
- `title: "One Hundred Years of Solitude"`
- `title: One Hundred Years of Solitude`

However, certain characters like `:` and `-` can cause issues. If you are using special characters (these are: `%,\, { },(),_,- , : [] & * ?,%`), you should enclose your string in double quotes.

Only the first of these two examples is valid:
- `title: "Salt: A World History"`
- `title: Salt: A World History`  *don't do this!*

### Numbers
When defining numbers, do not wrap your value in double quotes.

Only the first of these two examples is valid:
- `publicationYear: 2003`
- `publicationYear: "2003"` *don't do this!*

### Boolean values
There are instances (especially in `my_settings`) where you'll come across boolean values. These act like on and off switches. To set these values, you'll either use `true` or `false` without double quotes.

The first two examples are valid:
- `isPublished: false`
- `isPublished: true`
- `isPublished: "false"` *don't do this!*
- `isPublished: "true"` *don't do this!*

### Date and time
Date and time uses the Date Time String Format as [defined here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format). The format looks like this:
```
YYYY-MM-DDTHH:mm:ss.sssZ
```

You can omit components from this format and still have a valid date. The following are all valid:
- `date: 2023`
- `date: 2023-11`
- `date: 2023-11-29`
- `date: 2023-11-23T00:00:00-0400`

Out of the box, Eggspress' placeholder frontmatter all use the last of these three examples. This is because the date that appears on your posts is parsed during the build time based on the server that is building your site. If you're using Vercel, these regions are [defined here](https://vercel.com/docs/edge-network/regions).

Eggspress only shows the date without the time, so depending on where you are, you may wish to adjust the time accordingly have the proper date appear.

## All fields are optional
Eggspress is designed with flexibility and to that end, does not impose any particular frontmatter fields on authors. You can choose to provide values for all of the fields or none at all.

If you do decide to use frontmatter, we recommend prioritizing `title` (or `name`) followed by `description`. These help search engines like Google find and index your site. Having these fields also helps guide your readers to the content they're interested in.
