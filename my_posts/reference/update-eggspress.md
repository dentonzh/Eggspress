---
title: "Update Eggspress "
subtitle: "Using Sync Fork"
subheading: "Update Eggspress with just one click"
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 150
date: 2023-12-06T12:12:65
author: "denton"
snippet: "Periodically, we'll update the main Eggspress repository with bug fixes, new features, and other changes. Here's how to keep your forked copy of Eggspress up to date."
description: "Eggspress supports updates through Github's \"Sync Fork\" feature. Here's how you can update with one click."
sidebar: "eggspress-links"
category: "reference"
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

Over time, we'll make changes to the code that makes Eggspress work. These changes may:
- Fix bugs
- Add new features
- Add new customization settings
- Improve layout and appearances

In most cases, you can update Eggspress with just one click.

![](my_posts/reference/images/files.jpg)

## Sync Fork
The easiest way to sync your fork is to navigate to your *forked* repository page for Eggspress. To confirm if you're on your forked repository, look for the label "forked from dentonzh/Eggspress" under your repository name.

On this page look for a message above the list of repository files that reads:

```
This branch is *x* commits ahead, *y* commits behind dentonzh:main
```

If you are at least one commit behind, then there are new updates available.

To apply these updates, click the "Sync fork" button that appears to the right of the message. In the pop-up modal that appears, click "Update branch."

**Warning:** do not instruct Github to "Discard *n* commits." Doing so will remove your content and you will have to reupload your workspace to restore your site.

![](my_posts/reference/images/Pasted%20image%2020231125191459.png)
Syncing forks takes just a few seconds. When Github is done syncing, Vercel will begin building a new version of your site.

You may want to log into your [Vercel dashboard](https://vercel.com/dashboard) to ensure that the build using the latest version of Eggspress is successful. If you experience errors, please follow the steps in [Troubleshooting Your Build](/blog/troubleshooting-your-build).
## Issues with syncing
You may experience issues with syncing your fork if you have:
- Modified any files outside of the `my_`-prefixed folders

To resolve these issues, you will need to [resolve conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) manually. This means selecting whether to keep your custom code or to use code from the upstream repository (that is, the main Eggspress repository).

## "Sync fork" unavailable
If you do not see a button for "Sync fork," you may have:
- Changed the visibility of your forked repository to "private"
- Detached your fork

If you have, you will need to ensure that the visibility of your forked repository is [set to "visible."](https://docs.github.com/en/enterprise-server@3.8/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) If it is, [contact Github support](https://support.github.com/?tags=dotcom-direct) and request that they reattach your repository to the main Eggspress repository (dentonzh/Eggspress).

Alternatively, you can try [these instructions](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to sync your fork using the command line.


