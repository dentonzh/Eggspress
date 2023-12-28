---
title: "Welcome to Eggspress"
subtitle: ""
subheading: "This is a placeholder post packed with all of the bells and whistles Eggspress offers"

isVisible: true
hideContent: false

image: "fields.jpeg"
imagePositionY: 25
imagePositionX: 50
showImageInHeader: true

weight: 20
date: "2023-10-25T00:00:00-0400"
author: "eggie, beakster"
snippet: "This introductory post demonstrates various markdown formats you can use in your posts, such as headings, tables, quotes, and footnotes. When you're ready, rename this file and replace its contents with your own!"
description: "This introductory post walks through some key features of the Eggspress platform."
sidebar: "eggspress_links"
category: "miscellaneous"

prevPost: ""
nextPost: "another-placeholder"

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


We're so egg-cited to have you here! I'm [Eggie](my_authors/eggie.md) and this is my friend [Byline](my_authors/beakster.md). In this post, we'll show off all of the elements you'll be able to include in your posts! We'll look at headings, tables, blockquotes, and even a few footnotes. Let's dive in!


## How do I add content to my posts?

In addition to the content you're reading here, you could add sidebar data, author information, and much more. Most of that is set through the "[frontmatter](https://eggspress.vercel.app/blog/frontmatter)." If you need help getting started with editing this content, we recommend starting with [Editing Eggspress Content](https://eggspress.vercel.app/blog/editing-content) from the official [Getting Started Guide](https://eggspress.vercel.app/getting-started).

![Eggie and Byline frolicking through the fields](fields.jpeg)

### Referencing other content

To create a reference, you take the filename of the thing you're trying to reference and set it as a value for the correct frontmatter key. That's a mouthful, so it's probably easier just to show you an example!

The sidebar on this page is stored in a file called `eggspress_links.md` (found in the `my_sidebars` folder). To use it, drop the `.md` extension part of the name so that it's now `eggspress_links`. This turns into `sidebar: eggspress_links` in your frontmatter.

### Author Profile

On this post, you'll find author cards for us. They include our profile images, short blurbs about us, and a few links we wanted to share with our readers.

If you click on them, they'll take you to our author pages. Here, you can see all of the posts we've published to this site and even more information about us!

To create your very own author profile, go to the `my_authors` folder of your workspace and add a new file. To reference this file, follow the steps above under "Referencing other content". To reference multiple authors, separate each author reference with a comma.

### Related Posts

Point your readers to relevant content on your site by linking them to related posts. Related posts will always appear below your post contents and in the sidebar on larger screens.


## Styling your content

### Markdown tables

We wanted to take a moment here and demo one of our favorite Eggspress features - markdown tables! They make it so easy to organize information in clean rows and columns.

For example, let's look at a handy table comparing some popular egg dishes, cook times, and why people love eating them[^1]:

| Egg Type | Time | Why People Love It |
|-|-|-|
| Soft-Boiled | 6 minutes | The runny yolk is perfect for dipping toast |
| Hard-Boiled | 12 minutes | Easy protein on-the-go |
| Scrambled | 8 minutes | Fluffy, creamy, and versatile | 
| Over Easy | 5 minutes | Get that beautiful runny yolk to mix with other breakfast items |
| Poached | 4 minutes | Fancy egg cups to impress your guests |

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

## Start writing!

Hopefully this little tour cracked open all the egg-cellent things Eggspress can do! We showed you headings, tables, quotes, footnotes - all formatted in simple markdown. Now you can start styling your first post however you like!  

Get started by renaming this file and editing its contents. Happy blogging! 😄

Best,
Eggie & Byline

[^1]: Egg cooking times source: The Incredible Egg Cookbook by the American Egg Board 
[^2]: Egg history facts from The Incredible Egg
