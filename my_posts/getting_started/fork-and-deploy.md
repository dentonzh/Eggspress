---
title: Forking and Deploying to the Web
subheading: Learn how to launch your site to the web and make it visible to the world
image: ""
imagePositionY: "85"
imagePositionX: "50"
weight: 20
date: 2023-11-23T00:00:00-0400
author: denton
snippet: The first step to setting up Eggspress is to fork and deploy the main Eggspress repository. We'll show you how to do this using your web Browser. To complete these step, you'll need accounts on Github and Vercel.
description: Learn how to fork the Eggspress repository and deploy it using Github and Vercel.
sidebar: eggspress_links
category: Getting Started
prevPost: "getting-started"
nextPost: "create-your-workspace"
relatedPost1: "update-eggspress"
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
---

This is the second part of the [Getting Started Guide](/blog/getting-started). 

In this section, we'll launch Eggspress onto the web. When you're done, you'll have a link that you can use to access your site and share your site with others.

![](fork%201.jpeg)

## Forking Eggspress
Begin by forking the main Eggspress repository by logging into your Github account and using this link: [fork Eggspress](https://github.com/dentonzh/Eggspress/fork).

Think of forking as a way to copy Eggspress' code onto your own Github account. This is akin to installing an app. Instead of installing it to your phone or computer, however, you're installing it onto your Github.

You should now see a page titled "Create a new fork." Give your fork the a name and a description of your choosing. You can assign any name you want, although we recommend one that helps describe your site.

If you haven't settled on a name yet, use a placeholder for now. You can always change the name and description for your repository later.

When you're ready, click the green "Create fork" button.

![](Pasted%20image%2020231125172256.png)

Clicking "Create fork" brings up a spinner indicating that Github is creating your fork. When everything is ready, you'll be taken to a page that displays the contents of your repository.

Right now, your forked repository contains only the code that's needed to run Eggspress. It's identical to the main repository except for maybe its name. Later, you'll add your content to your forked repository.

In addition to making it easy to set up Eggspress, forking lets us [update our copy of Eggspress](/blog/update-eggspress) with just one click, meaning you can enjoy all of the new improvements and features without configuring anything.

In the next step, we'll deploy our site. This means putting our files on a server and having our visitors be able to load those files from that server.

Before we do that, bookmark your repository page. You'll need to access this page a few times throughout this guide. You'll also need to access it whenever you want to publish a new post or make changes to your site.

## Launching your site
[Vercel](https://vercel.com/) is a service that will help us deploy and serve our site.

At a high level, it runs the code you have in your forked repository. This code takes the content files in your repository and builds them into webpages. It then stores these web pages and serves them from its servers.

All we need to do is tell Vercel where our files are.

We can do this by opening Vercel's [dashboard view](https://vercel.com/dashboard). On this page, click the "Add new..." button and select "Project" from the dropdown menu.

If you chose "Continue with Github" to create your Vercel account earlier, you should see your repositories listed by default. 

Click the "Import" button near the entry that corresponds with your Eggspress repository.

Note: if you do not see your repository, please refer to Vercel's documentation on [importing projects](https://vercel.com/docs/getting-started-with-vercel/import) and for [troubleshooting](https://vercel.com/guides/unable-to-find-github-repository) missing repositories.

![](Pasted%20image%2020231125172817.png)

On the "Configure project" screen:
- Enter a project name (you must use all lowercase and use dashes in place of spaces or underscores)
- Select "Next.js" under "Framework Presets"

You do not need to configure anything else on this page.

Click "Deploy" to build your new site. You will see status updates indicating the progress of your site build. During the "building" phase, Vercel runs your code and assembles all of the pages for your site. 

This step usually takes the longest and it's not uncommon for it to last upwards of a minute.

![](Pasted%20image%2020231125172514.png)

![](my_posts/getting_started/images/Pasted%20image%2020231204204005.png)

When Vercel has finished the build steps, you'll see a "Congratulations" message. Click "Continue to Dashboard," which will bring you to your project dashboard (this is different from your Vercel dashboard).

On your project dashboard, click the "Visit" button on the upper-right corner. You should now see your new site!

![](my_posts/getting_started/images/Pasted%20image%2020231204204101.png)

![](Pasted%20image%2020231126192841.png)

Because your repository has no content, it is currently in "Set Up Mode." Your page should display a few next steps to take. If you're following this guide, you can ignore those instructions and follow along here instead.

At this point, we recommend bookmarking your site or writing your link someplace. You'll need to access your site and share it with others.

If you prefer a different subdomain (`https://<subdomain>.vercel.app`) or have your own custom domain (`https://<your-domain>`) you'd like to use, follow [these steps](https://vercel.com/guides/how-do-i-add-a-custom-domain-to-my-vercel-project).

## Recap
We now have a working Eggspress site that anyone can see. 

We accomplished this by forking, which creates a copy of Eggspress on our own personal Github account. We then told Vercel where our repository is on Github so that it can pull our files together into a functioning site.

In the next part, we'll create a workspace folder on our computer. This folder contains several other folders (subfolders) within it that help organize our files and provide structure.