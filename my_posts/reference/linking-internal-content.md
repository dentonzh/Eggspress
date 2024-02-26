---
title: Linking Internally
subtitle: "Using Internal Links"
subheading: "Learn how to link to other content on your Eggspress site"
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 200
date: 2023-12-07T12:12:83
author: "denton"
snippet: "There are many ways to create a link to other pages on your Eggspress site. Here's how."
description: "Eggspress makes it very easy to create links from one page to another. Here's how to do it."
sidebar: "eggspress_links"
category: "Reference"
prevPost: ""
nextPost: ""
relatedPost1: "editing-content"
relatedPost2: "linking-external-content"
relatedPost3: ""
relatedPost4: ""
relatedPost5: ""
relatedPost6: ""
relatedPost7: ""
relatedPost8: ""
relatedPost9: ""
---

Internal links take your readers to another page on your site. This article looks at three different ways to create them:

1. Using Obsidian's linking tool
2. Writing exact links by hand
3. Writing "shortened" links by using filenames

![](my_posts/reference/images/paper_airplane.jpg)

## Using Obsidian to create internal links
By far the easiest way to create internal links in Eggspress is to use Obsidian's tool for [linking notes](https://help.obsidian.md/Getting+started/Link+notes). This gives you a simple interface for finding and selecting another file in your workspace folder to link.

To use this, type the left square bracket ("\[") twice when editing a document in Obsidian. Then begin typing the filename of the file you wish to link. As you type, Obsidian will show you files that match your query. Select the file you wish to link and press the enter key on your keyboard.

## Forming links manually
If you're not using Obsidian or you wish to get in the practice of forming links by hand, then the next two sections cover all that you need to know.

To create a link, use Markdown syntax, `[]()`. You can set up this syntax by hand, but many desktop editors will also use the shortcut keys `Ctrl + K` (`Cmd + K` on Mac).

Once the square brackets and parentheses are set up, you can form your link by writing:
1. The link text between the two square brackets
2. The URL (the web address) between the two parentheses

Here are a couple of examples:

- `[find online courses](https://opencourser.com)` becomes [find online courses](https://opencourser.com)
- `[getting started guide](/getting-started)` becomes [getting started guide](/getting-started)

The first link is an external link that goes to an external resource. We know this because it's on a different domain. 

The second is an internal link. When we click on this link, we see that it takes us to another page in Eggspress Docs.

If you look carefully, you'll notice that internal links omit the protocol (e.g. `https://`) and domain. While you *could* include the protocol and domain to internal resources, we strongly recommend against doing so.

## Getting the exact internal link
To understand how to build your links, you'll need to understand how Eggspress generates URLs.

Eggspress does this by looking at each file in your workspace folder.

First, it looks each file's content type, which is determined by the content folder it's in. For example, documents found in `my_posts` are posts.

The content type determines how your routes are constructed:
- `my_posts` -> `/blog/<resource>`
- `my_pages` -> `/page/<resource>`
- `my_authors` -> `/author/<resource>`
- `my_categories` -> `/<category>`

Note that files in `my_settings`, `my_sidebars`, and `my_templates` are not linkable.

Then, Eggspress uses the content's filename to generate a "slug." This means that it takes your filename, drops the extension (`.md` or `.mdx`), and replaces all underscores and spaces with hyphens (dashes).

For example, if you have a file located in your workspace at `my_posts/show_notes/episode_003.md`, it will have an internal URL at `/blog/episode-003`.

To link to this file, you would write something like:

`[episode 3 show notes](/blog/episode-003)`

When Eggspress builds your site, it will convert this Markdown string into a link that will take readers to a blog post with the slug "episode-003."
## Using shortcuts that substitute internal links
The steps we outlined above will help you generate links in the exact manner that Eggspress generates them. However, Eggspress will also read internal links that are formatted:

1. Using the relative file path in your workspace folder
2. Using just the filename of your content file

Using our example from earlier, all of these are correct:
1. `[ep. 3 notes](/blog/episode-003)`
2. `[ep. 3 notes](my_posts/show_notes/episode_003.md)`
3. `[ep. 3 notes](episode_003.md)`

The third method is the fastest way to generate an internal link by hand. This makes it a nifty shortcut for linking files quickly.

The caveat to this third method is that it lacks information about content type. This means that Eggspress will look in each content folder for this file in a specific order (`my_posts` first, followed by `my_pages` and finally `my_authors`). 

If you have files of the same name in multiple content folders, you should consider using the first two methods.

Note that the last two methods use a convention that's unique to Eggspress. You should not form URLs like this when working with other platforms or tools.

