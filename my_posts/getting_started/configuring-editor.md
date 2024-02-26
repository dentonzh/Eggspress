---
title: Configuring Your Desktop Editor
subheading: Learn how to set up an editor to use with Eggspress
image: ""
imagePositionY: "85"
imagePositionX: "50"
weight: 40
date: 2023-11-23T00:00:00-0400
author: denton
snippet: In Part 4 of our Getting Started Guide, we'll set up our desktop editor and start editing files in our workspace folder. When you're done with this part, you'll be able to create content that looks as good as it reads.
description: Learn to set up, configure, and publish on Eggspress. This fourth part of our guide covers setting up our desktop editor and editing our files.
sidebar: eggspress_links
category: Getting Started
prevPost: "create-your-workspace"
nextPost: "editing-content"
relatedPost1: ""
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
---


This is the fourth part of the [Getting Started Guide](/blog/getting-started). 

In this section, we'll set up our desktop editor so that it's compatible with Eggspress. We'll also configure our desktop editor to help us automate mundane tasks, where possible.

![](oranges.jpg)

## Setting up your desktop editor
You can edit your content in any text editor. Even Notepad and TextEdit are sufficient.

However, if you plan on authoring content regularly, we recommend using [Obsidian](https://obsidian.md). Obsidian comes packed with powerful features that help us:
- Link to other content in our workspace dynamically
- Automatically place a pasted or drag-and-dropped image into a subfolder
- Preview styled text as we type
- Create new posts using templates

## Configuring Obsidian
When you [created your workspace folder](/blog/create-your-workspace), you also copied a folder named `.obsidian` from `eggspress_starter_workspace.zip`. This folder contains settings we configured to optimize your writing experience. 

Some of these settings are required for Eggspress to work properly.

On Mac and Linux, this `.obsidian` file is hidden by default. Don't worry if it doesn't appear in your workspace folder.

The easiest way to check if your Obsidian is properly configured is to insert a link by using the shortcut key `Ctrl + K` (`Cmd + K` on Mac). If you see `[]()`, then your Obsidian is properly configured. If you see `[[]]`, then you must [configure Obsidian manually](https://eggspress.vercel.app/blog/configure-obsidian).

### Installing Obsidian
Obsidian is available on Windows, Mac, Linux, Android, and iOS. To install it, visit [the Obsidian site](https://obsidian.md) and click the purple "Get Obsidian" button. If you need help installing Obsidian, please refer to Obsidian's [installation guide](https://help.obsidian.md/Getting+started/Download+and+install+Obsidian).

Obsidian is completely free to use with Eggspress. However, there are paid premium features like Obsidian Sync that allow you to sync your vaults in the cloud.
### Open your Workspace Folder as your Vault
When you open Obsidian for the first time, you'll be greeted with options to create or load a vault.

Select the option "Open folder as vault" and select your workspace folder. If done correctly, you should see all of your `my_`-prefixed folders appear on the left-hand pane. If you do not, you can try again by clicking the "Open another vault" button (see below).

![](Pasted%20image%2020231126155305.png)

![](Pasted%20image%2020231126155437.png)

If you're an existing Obsidian user, you will need to use the "Open another vault" menu to create a new vault. See next paragraph.

At any time, you can switch to another vault or create a new vault. To do this, select the "Open another vault" button near the bottom-left corner of Obsidian. You will see a window open with a set of options that allow you to create a new vault or open an existing vault.

![](Pasted%20image%2020231126155811.png)

Obsidian is now properly configured for Eggspress.
### Using another editor
Eggspress remains agnostic to the editor you use. When using another Markdown editor, ensure that:
1. Images and videos are copied to your workspace folder when you insert them into your content (by pasting, for example)
2. Links are formatted using standard Markdown syntax (`[]()`)
3. Images and videos are formatted using standard Markdown syntax (`![]()`)
4. Frontmatter is visible in your editor (some editors may hide frontmatter)

Lastly, confirm that your editor uses the "right kind" of Markdown. 

Markdown comes in several varieties. Eggspress uses [Github Flavored Markdown (gfm)](https://github.github.com/gfm/), which takes standard Markdown and extends it with additional features like footnotes and tables.

![](my_posts/getting_started/images/typewriter.jpg)
## Recap
We now have all of the pieces we need to edit and publish great content on Eggspress. So far, we've:
- Created a repository on Github to store our content
- Pointed Vercel to our repository so that it can build our site
- Set up our workspace folder to hold our content and settings
- Installed and configured our desktop editor

In the next and final part of our guide, we'll look at the individual files in our workspace folder. We'll learn about their structure and how to edit them to get the best result possible.