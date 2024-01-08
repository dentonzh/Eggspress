---
title: "Troubleshoot Issues with Images"
subtitle: "and Other Media"
subheading: "Troubleshoot issues with images and media"
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 50
date: 2023-12-22T11:12:83
author: "denton"
snippet: "Read this article if you are experiencing issues with images and videos on Eggspress"
description: "Read this article if you are experiencing issues with images and videos on Eggspress"
sidebar: "eggspress_links"
category: "troubleshooting"
prevPost: ""
nextPost: ""
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

Images and videos can breathe life into your content. Occasionally, you may run into issues where certain images and videos do not appear. Here are some reasons why this is and what you can do to resolve them.

![](my_posts/troubleshooting/images/blank_canvas.jpeg)

## Improperly formed Markdown syntax
The correct way to format an image or video is by using the `![]()` syntax.

For this to work correctly, you should specify `alt` text in between the square brackets. This is a text description of your image and appears when the image cannot load due to poor connection or a server issue. This is also the text that screen readers use to describe an image to users.

Between the parentheses, you must supply a reference to the image or video. At a minimum, you must provide the filename here.

Here is an example of a properly referenced image using just the filename of the image:

`![Eggie and Byline riding bicycles](bicycles.jpg)`

And here is a properly reference image using the file path to your image, relative to your workspace folder:

`![Eggie and Byline riding bicycles](my_posts/path/to/bicycles.jpg)


## What if images still do not appear?
If you are certain that your syntax is formed correctly, here are a couple of other troubleshooting steps you can take:

1. Ensure that there is no other formatting applied to your images (e.g. headings, bold or italic text styling, etc.)
2. Check that the image you are trying to link to exists in the `my_posts` folder of your workspace

Any image you insert into a post must also exist *somewhere* in `my_posts`. Some desktop editors may place your images *outside* of this folder if you paste an image in. Other editors may simply link to an online resource if you are inserting an image you found on the Internet.

If you are using an image on the Internet, you may need to save it to `my_posts` first before inserting it into your document.

## An image appears, but it is different from the one you referenced

If an image different from the one you expect appears, it may be possible that you are using the same filenames for your images in multiple areas. If this is the case, you must move your images closer to your Markdown (`.md`) file. 

Eggspress looks for images across your `my_posts` folder. This allows authors to organize their images as they please, but it introduces some ambiguity. This can result in referencing the wrong image.

Here's the order in which Eggspress looks for images:
1. First it checks in the same folder that the referencing content is in
2. Then it checks in each subfolder and subfolders of those subfolders, etc.
3. Finally, it searches all folders above the referencing content


To ensure that the correct image appears, move a referenced image closer to the referencing content. Preferably, this is either in a subfolder relative to the referencing folder or better yet, in the same folder as the referencing file.

## Vercel limits reached
For most users, Eggspress is free to publish to. However, if you have a lot of traffic and also have many images, you may reach some limits.

One of these limits is related to image optimization. Each time you add a new image to your Eggspress site, Vercel must optimize it. Note that previous images you have added before are cached, meaning they will not count towards the number of images optimized in subsequent builds.

For free users, this limit is 1,000 source images optimized per month. If you exceed this limit, you may be asked to upgrade to Vercel's Pro tier.

The other limit is related to bandwidth. Vercel allows free users to transfer 100GB per month. If you have many images and/or high traffic, you may exceed these limits. At this point, Vercel may ask you to upgrade to their Pro tier.

## Video support is currently limited
Although most modern browsers support many video formats, Eggspress has not been tested on all formats. If you are having issues with video, we suggest converting your videos to either `.mp4` or `.webm` formats.

We also strongly recommend compressing and resizing your videos to smaller sizes where possible. This is to avoid hitting any bandwidth limits unexpectedly.

