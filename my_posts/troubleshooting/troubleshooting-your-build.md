---
title: "Troubleshoot Build Issues"
subtitle: ""
subheading: How to fix issues that occur during the build process
image: ""
imagePositionY: "85"
imagePositionX: "50"
weight: 150
date: 2023-11-23T00:00:00-0400
author: denton
snippet: This post will help you troubleshoot issues you might be having with your build on Vercel and what to do if you're still having issues.
description: This troubleshooting document on Eggspress focuses on issues with the build process on Vercel.
sidebar: eggspress_links
category: Troubleshooting
prevPost: ""
nextPost: ""
relatedPost1: ""
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
---

When you upload, modify, or remove files and commit your changes to Github, Vercel should automatically build your new site. This build process can take upwards of a minute after which your site will update with the latest version of your workspace files.

If your changes do not appear, it could mean that Vercel ran into errors.

## Steps you can take to fix this problem
To confirm whether Vercel ran into errors, go to your [Vercel dashboard](https://vercel.com/dashboard) and select your Eggspress site by clicking on its name. On your project page, look for a link labeled "Deployments" near the top of the screen.

### Looking for builds with errors
The Deployments page will show you a list of your builds including your failed builds. These are ordered chronologically with your most recent builds displaying near the top. 

Typically, each build corresponds to a specific commit on Github. If you're running into issues with a recent commit, look to see if there are issues near the top. A successful build will have a green dot. A red dot indicates an error. 

![](Pasted%20image%2020231128125005.png)

### Attempt to redeploy
On the same entry as the "Error" build, look for the three dots on the right-hand side of the page. Click on it and then select "Redeploy" from the dropdown menu that appears.

![](Pasted%20image%2020231128125400.png)

This will begin the build process again. Stay on this page to see if anything changes with the new build. If your new build shows a green dot, then the previous error may have been a one-off issue with something unrelated to your content.

### Edit your files
If a redeploy doesn't fix the issue, you can try to get some clues about where the issue is coming from. Most likely, it's from a file you recently changed in your Github repository.

To view a log of the build process and view the error messages associated with it, click the three dots on the right-hand side of the page and select "Inspect Deployment" from the dropdown menu that appears.

Typically, you'll see the page that Vercel was attempting to build when the error occurred. From there, work backwards and see if you can find the specific change that caused this error.

![](Pasted%20image%2020231128125900.png)
*This error is a result of a bug in the Eggspress code that has now been fixed*

Usually, errors are more likely to occur as a result of problems in the frontmatter (the fields in the top part of your `.md` files between the two sets of dashes "---"). Here are some common problems with frontmatter:

- Using double quotes in your text (`"Why "Hello World" is Everywhere"` needs to have its quotation marks "escaped" using backslashes so that it becomes `"Why \"Hello World\" is Everywhere"`)
- Using quotation marks around boolean (true / false) values (`isVisible: false` is correct; `isVisible: "false"` is not)

You may also have errors if you have the incorrect type of content in the wrong folder. For example, if you have a file containing post content that's stored in `my_pages` instead of `my_posts`.

## Need more help?
If you can't figure out what went wrong or you repeatedly run into errors, [create an issue](https://github.com/dentonzh/Eggspress/issues/new) with details from your deployment. If possible, copy and paste the error messages that appear when you inspect deployment. It would also be helpful to attach the file causing the error or to link us to your Github repository.

We'll try our best to fix the problem.

## Prevent this issue or its impact
When making a lot of changes (adding many new files or changing and deleting existing ones), we recommend doing so in smaller batches. This will help you narrow down which files are the source of errors. When you do discover an error, it will be easier to find the error-causing file and either modify it to resolve the problem or remove it from your repository.

If you are running into errors that are unexpected, things that shouldn't be causing any errors, it could be a bug in our code. If you find any bugs, please report them by creating an issue (see above).