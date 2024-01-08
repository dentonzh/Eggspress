---
title: Configuring Obsidian for Eggspress
subheading: Learn how to set up Obsidian with your Eggspress workspace
image: ""
imagePositionY: "85"
imagePositionX: "50"
weight: 150
date: 2023-12-01T00:00:00-0400
author: denton
snippet: Obsidian is our recommended editor that we use to draft content on Eggspress. In this reference doc, we look at the settings you should configure to make Obsidian work with Eggspress.
description: Obsidian is our recommended editor that we use to draft content on Eggspress. Here's how to set up Obsidian for Eggspress.
sidebar: eggspress_links
category: reference
prevPost: ""
nextPost: ""
relatedPost1: ""
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
---

Obsidian is a powerful editor, when using it we recommend eggspress starter, etc.

Each vault has its own set of settings in Obsidian. This comes in handy especially if you're an existing Obsidian user or plan to use Obsidian for other projects. Settings you apply to your vault for Eggspress won't affect your settings in other vaults.

Before we begin editing our files, you **must** make the following changes to your workspace folder's vault settings.

To change your Obsidian settings, click the gearwheel icon in the bottom-left corner.

![](Pasted%20image%2020231126160328.png)

Under the "Editor" tab, set "Properties in document" to "Source." This will allow us to copy and paste our frontmatter (more on this in the next section). We strongly recommend applying this setting so you can create new posts easily.

![](Pasted%20image%2020231126160742.png)

Next, we'll make several changes under "Files & Links."

First, we need to disable "Use Wikilinks." By default, Obsidian uses Wikilinks to create links and images. Wikilinks is not standard Markdown, however. If you leave this option on, links and images you add to your page will not appear correctly on your site.

![](my_posts/reference/images/Pasted%20image%2020231201133325.png)

Next, we need to change "Default location for new attachments." Recall that Eggspress only looks for content within your `my_`-prefixed folders, not the root workspace folder. For Eggspress to find and publish your images, you must change this setting to "Same folder as current file" or "In subfolder under current folder."

We use "In subfolder under current folder" and specify "images" for the "Subfolder name" setting. You may wish to keep your images in another subfolder or in the same folder as your current file. It's a matter of personal preference.

![](Pasted%20image%2020231126160829.png)
Your new vault is now configured to work with your Eggspress workspace!