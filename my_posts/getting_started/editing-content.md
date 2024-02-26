---
title: Editing Eggspress Content
subheading: Learn how files in Eggspress work and how to edit them
image: ""
imagePositionY: "85"
imagePositionX: "50"
weight: 42
date: 2023-11-23T00:00:00-0400
author: denton
snippet: In this fifth and final part of our Getting Started Guide, we'll walk you through how to edit files in your workspace and customize their appearance to get the results you want.
description: Learn to set up, configure, and publish on Eggspress. The final part of our guide looks at editing our files and getting them ready for the presses.
sidebar: eggspress_links
category: Getting Started
prevPost: "configuring-editor"
nextPost: ""
relatedPost1: "frontmatter"
relatedPost2: "using-templates"
relatedPost3: "linking-internal-content"
relatedPost4: ""
---


This is the fifth and final part of the [Getting Started Guide](/blog/getting-started). 

In this section, we'll break down the structure of files in your workspace folder. We'll then discuss the different types of content you can add, like posts, custom pages, and author profiles. 

Finally, we'll point out some key settings you can configure. These include setting the site's name and choosing a color scheme.

## Content folders start with `my_`
Your workspace folder contains a series of folders prefixed with `my_`. When Eggspress builds your site, it looks through each of these folders to determine which pages to build and how to build them.

To simplify things, we'll call these folders **content folders**.

Every word you write, every image you add, and every setting you configure will be contained in files within these folders.

![](Pasted%20image%2020231126154113.png)

There are only a few rules to follow when it comes to these folders:
1. Do not rename these folders
2. Do not move these folders elsewhere

Within these folders, however, you may name your files and organize them however you like.

![](photos.jpg)
## Working with your content files
When we [created our workspace](my_posts/getting_started/create-your-workspace.md), we uploaded a set of placeholder files to our Github repository. We'll now have a look at some of these files to understand how they work.

In your workspace folder, open `my_posts`. Then open `welcome-to-eggspress.md` in your desktop editor.

In Obsidian, you can do this by clicking on `my_posts` in the files pane left of the editor. Then click on `welcome-to-eggspress.md` (note that the file extension, `.md`, is hidden from view in Obsidian). If you don't see this pane, click the "Files" icon in the upper-left corner.

![](Pasted%20image%2020231129114507.png)

The first thing you might notice is that this file contains two sections. The first section near the top is the **frontmatter** and the second section is the **content**.
### Frontmatter
Frontmatter has important data about your file and is contained between two sets of dashes ("`---`").

Frontmatter can help us:
- Decide what text, images, or other content may appear alongside our main content
- Generate metadata that are invisible to your readers, but useful for other consumers (including web crawlers like Google)
- Pull in data from other content files in our workspace folder
- Specify how a specific content item appears on your site

Data in frontmatter is stored as a set of **key-value pairs**. 

The **key** is a string of text that Eggspress looks for when trying to retrieve a specific **value**.
#### Examples
It's easier to understand frontmatter by looking at a few examples.

To set the title of a post, you would assign a value to the key "title" like so: 

`title: "My First Post"`

In this example, the value is "My First Post."

You may also leave a field empty. For example, if you don't wish to have an author's details appear in a post, you can set your author as:

`author: ""`

Frontmatter can even be used to call up data from other content files. For example, you can tell Eggspress to pull up a specific sidebar that appears alongside your content:

`sidebar: "upcoming-events"`

This will display a sidebar built with data from `my_sidebars/upcoming_events.md` alongside the content calling it.

By default, we use double quotes to contain our values. However, you should **omit** double quotes for:
- Numeric values (e.g. 0, 50, 100, 47.5)
- Boolean values (`true` and `false`)

Here is an example of the three types (string, number, and boolean) of values you might want to set to define how your posts are ordered:
`orderPostsBy: "weight"`
`orderPostsByReversed: false`
`weight: 50`

Note that the values `false` and `50` do not have double quotes surrounding them.

We encourage you to read [about frontmatter](/blog/frontmatter) in our reference docs, which delve into more detail about how to use frontmatter in your content.

#### Frontmatter is optional
All frontmatter in Eggspress is optional,  even for keys like `title` and `name`. However, we strongly encourage you to supply values to relevant keys where possible.

At a minimum, we suggest setting `title` (or `name`) and `description`. For your posts, we also recommend providing a value for `snippet`, which is the text that appears when your posts are listed on your site. 

These keys inform readers about your content before they click into it.

![](pier.jpg)
### Content section
Everything below the frontmatter is your **content**. This is where you'll write the body for content items like posts, custom pages, and author profiles.

You can write text directly to this section, but if you wish to style your text (like italicizing or bolding text, creating links, or inserting images) you will need to use either HTML or Markdown.

In most instances, you should use Markdown to style text in Eggspress. If you're new to Markdown, check out this [introduction](https://www.markdownguide.org/getting-started/) and the [syntax guide](https://www.markdownguide.org/basic-syntax/).

#### What is Markdown?
In **Eggspress**, every content file has the file extension `.md` (or `.mdx`). 

File extensions help determine the file type. You may be familiar with some already. File types like `.jpg`, `.gif`, and `.png` are common for images. `.docx`. `.xlsx`, and `.pdf` are popular types for Word, Excel, and Adobe Reader documents.

**Markdown** is used around the web for authoring content. This makes it particularly well suited to those who write blogs and create other content on the web.

Files ending in `.md` (or `.mdx`) tell Eggspress that we're working with text styled with **Markdown**, which is widely used for its simple-to-use syntax. This makes it perfectly suited for blogging or authoring websites.

Instead of having to write code like this:
```
<h2>Editing your content files</h2>
<p>If you've made it this far...</p>
<p>In <strong>Eggspress</strong>, every content file is...</p>
<p><strong>Markdown</strong> is a file type with...</p>
<p>Instead of having to write code like:</p>
<code>(this block of code)</code>
```

You need only write:
```
## Editing your content files
If you've made it this far...
In **Eggspress**, every content file is...
**Markdown** is a file type with...
Instead of having to write code like:
\```
(the previous block of code)
\```
```

You write in Markdown and Eggspress takes care of the rest.[^1]

Most Markdown editors let you use shortcut keys like CTRL+B (for bolding, CTRL+I (for italicizing), and CTRL+K (for inserting links) as you might use them in non-Markdown editors like Microsoft Word. 

We encourage you to memorize either the syntax or shortcut keys for your most commonly used stylings.

### Template files
To accelerate your workflow, we've included a set of files in `my_templates`.

Files starting with `#.frontmatter` contain a full set of frontmatter keys that are available to a specific content type.

Files starting with `#.reference` contain:
1. The full set of frontmatter keys for a specific content type
2. Additional information on setting the frontmatter in the content section
3. A comprehensive set of Markdown syntax examples

As you become familiar with authoring content, you'll rely more on `#.frontmatter`-prefixed templates than you will on `#.reference`-prefixed ones.

Note: Be careful to avoid copying and pasting frontmatter across content types. For example, using `#.frontmatter.post.md` on a file in `my_pages` may result in errors or produce unexpected results.
## Creating your first post
Now that you have the idea for how content files work, we'll create our very first post. There are three ways to do this:
1. Create a new file and insert frontmatter from `#.frontmatter.<type>.md`
2. Create a new file and paste frontmatter from an existing post
3. Copy and paste an existing file and renaming it

If you're using Obsidian, you can [create files from templates](my_posts/reference/using-templates.md) with ease by using the "Insert template" function.

## Filenames are important
In Eggspress, filenames play two important roles. They:
1. Determine the paths on your site
2. Become "identifiers" that you can reference from other files

In order to build paths or become identifiers, Eggspress converts filenames into **slugs**. These slugs are created by applying these changes to a filename:
1. Drop the extension (e.g. `.md` or `.mdx`)
2. Convert the filename to all lowercase
3. Replace spaces and underscores with hyphens (dashes)

### Examples
Let's say you have a file named `welcome_to_eggspress.md` somewhere in your `my_posts` folder.

During build, Eggspress will place this file at the path `/blog/welcome-to-eggspress`. Anyone wishing to read this file can navigate to `https://<your-domain>/blog/welcome-to-eggspress`.

As an author, you can also reference this file from another file.

Let's say you wish to have this post display in the "Related Posts" section of another post that's stored as `another_placeholder.md`. To do so, you could set `relatedPost1: "welcome-to-eggspress"` in the frontmatter of `another_placeholder.md`.

The same applies to categories, sidebars, and author profiles.

For example, if you have an author profile stored as `Eggie Shellvetica.md` somewhere in `my_authors`, you can attribute a post to this author by setting your post's frontmatter to `author: "eggie-shellvetica"`.

In each of these examples, we formed our slug by dropping the file extension, lowercasing everything, and converting spaces and underscores to hyphens.

### Common pitfalls
Because filenames play an important role in identifying where things are, you should avoid renaming files after they've been committed to Github. Doing so may cause existing links to break. 

![](phone.jpg)

Finally, if you are keeping your content in separate subfolders, you must take special care to give them unique names. 

If you have two files with the same name under the same content folder like so:
- `my_posts/tutorials/introduction.md`
- `my_posts/blog-stuff/introduction.md`

Only one of these files will render at `https://<your-domain/blog/introduction`.

## Other content types
For the most part, other content types function similarly to posts, with minor differences. We'll summarize what these are.
### Custom pages
Custom pages, stored in `my_pages`, are useful for serving as a reference for your readers or to share one-off information. Examples of custom pages include:
- Specification sheets for a product
- Glossaries and other references
- About pages
- A resume / CV
- A testimonials page

Links to your custom pages can be found on every page of your site either through the footer or the navigation menu.

### Author profiles
Author profiles are files stored in the `my_authors` folder. These contain data used to generate author pages and author cards.

Readers can click on author cards to navigate to author pages. These will list the author's posts and show more frontmatter values found in the author profile.

Unlike custom pages or posts, the content section of author pages is optional. If populated, it will render under the "Biography" heading of the author's page. This section can be found below the list of posts attributable to the author.

### Linking authors to posts
As mentioned earlier, you can reference an author by providing the slug of the filename of the author profile. You should supply this slug as the value to the key `author`.

For example, setting `author: "eggie-shellvetica"` will generate an author card using data found in `my_authors/eggie shellvetica.md`.

You can also list multiple authors on each post by separating author "slugs" with commas (e.g. `author: "eggie-shellvetica, byline-beakster"`).

## Categories
The folder `my_categories` and its files are **optional**.

When you reference a category in a post file, Eggspress will automatically generate a category page that displays all posts belonging to that category.

You should, however, create files in `my_categories` for categories where you wish to:
- Specify name and subheading text
- Define a custom sidebar that appears on a category page
- Specify how you wish to sort posts in that category (by `alphabetical`, `weight`, or `date`)

On Eggspress Docs, we define a sidebar that appears when you visit the category page for `getting-started`. We also specify that posts be sorted by `weight` (rather than by `date`). This sorts posts found in this category by the `weight` values we assigned to each post.

By doing this, posts always show up in their correct order.

## Custom sidebars
Sidebars let you display useful information to your readers alongside your main content. You can create one sidebar that you reuse everywhere, use no sidebars at all, or create a sidebar for each content item you create.

Unlike other content types, sidebars contain up to 9 sections each with optional fields. Each section can have a heading, text, a link, and/or an image.

Note that sidebars only appear on larger screens (they will not appear on mobile devices).
## Settings and preferences
Out of the box, Eggspress includes default settings. These settings govern how things appear, how the site generates metadata fields, and how pages behave.

Unlike files in other `my_`-prefixed folders, files in `my_settings` should *not* be renamed.

The settings you'll most likely want to change when you begin customizing your site are the following in `metadata.md`:
- `title` - the name of your site
- `tagline` - the bit of text that appears beneath the title on your front page
- `metaTitle` - the title that search indexes like Google see and display
- `metaDescription` - the short blurb that appears in search results under the title
- `ogDescription` - the short blurb that appears in social cards (the kind you see when you paste a link to Twitter, Facebook, or Whatsapp)

If you have your own domain name that is *not* a `<your-project>.vercel.app` address, you must also update `metaBaseUrl`. 

For example, if your domain for your Eggspress site is [opencourser.com](https://opencourser.com), your setting should have the key-value pair `metaBaseUrl: "https://opencourser.com"`. 

Read Vercel's documentation on configuring a [custom domain](https://vercel.com/docs/projects/domains/add-a-domain) for instructions on how to set up your custom domain.

`links.md` contains a set of fields that allow you to customize links to your social media profiles or other websites. These appear in the footer of your site.

`appearance.md` includes a set of fields that allow you to specify how your site and its pages appear. It also includes a set of fields prefixed with `show` that allow you to toggle certain elements on and off.

The content section (below the frontmatter) of files in `my_settings` are *not* read by Eggspress. As such, we've repurposed this section to leave you additional information about how to configure frontmatter in these files. If you'd like, you can also leave notes for yourself in the content section.

`my_settings` has two subfolders, `colors` and `brand`.

`colors` contains a set of pre-defined color schemes. You can reference your preferred color scheme by setting the `colorScheme` field of `appearance.md`.

`brand` contains a set of image files that represent your favicon, logo, and app icon. You can replace these files with your own brand images.
## Tidying up
When you're ready to publish your next update, upload your workspace files again to your forked Eggspress repository.

Note that when you upload your workspace to Github, it will replace existing files found at the same path. If you upload `my_settings/metadata.md` again, it will replace the old `my_settings/metadata.md` without prompting you to confirm whether to replace your old file.

Uploading your workspace will never remove existing files from Github. This means that you will need to remove files that you no longer need. For example, you probably will want to delete `welcome-to-eggspress.md` and `another-placeholder.md` from your `my_posts` folder.

To remove files from your repostiry, click `my_posts` in Github. Then, for each file you wish to remove, click on its filename. This will display a preview of your file.

On the file preview page, click the three dots in the upper-right corner. Select "Delete file" followed by "Commit changes" to remove the unwanted file.

![](Pasted%20image%2020231125193501.png)

For additional help, read Github's documentation on [deleting a file](https://docs.github.com/en/repositories/working-with-files/managing-files/deleting-files-in-a-repository). 

If you want to keep a file in your workspace, but wish to prevent it from publishing to your site, you can prefix it with "#."  Eggspress ignores files that start with a "#" in its filename.

To prevent posts and pages from showing up on your site (but still allow those pages to be accessible to anyone with a direct link), set `isVisible: false` for those content items.

To hide content, but allow anyone with a direct link to see a message indicating that a page is no longer available, set `hideContent: true`.

## You're all set!
If you've made it this far, then you know enough to set up and maintain your Eggspress site. 

A few reminders as you begin your next post:
- To get a jumpstart on a new post, page, or author, copy the frontmatter found in their respective folder with a filename ending in `#.template.md` 
- Filenames that you give to your posts, pages, and authors should be unique
- Avoid changing filenames to posts, pages, and authors that have been published to your site for a while as doing so will break existing links to them


![](_fa4aa3fa-cf85-4264-8ee8-4f7119d3378c.jpeg)

[^1]: Another benefit of Markdown is that it's widely used in other blogging frameworks and platforms like Gatsby, Hugo, and Ghost. There are also a number of plugins made for Wordpress that take Markdown and convert them into Wordpress-readable posts. This gives you the freedom to migrate off of Eggspress easily if you ever decide to go with something else.
