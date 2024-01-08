---
title: Creating Your Workspace
subheading: Learn how to create and upload your workspace folder
image: ""
imagePositionY: "85"
imagePositionX: "50"
weight: 30
date: 2023-11-23T00:00:00-0400
author: denton
snippet: In Part 3 of our Getting Started Guide, we'll add content to our new Eggspress site by creating and uploading our workspace folder.
description: Learn to set up, configure, and publish on Eggspress. This third part of our guide covers creating and uploading your workspace folder.
sidebar: eggspress_links
category: Getting Started
prevPost: "fork-and-deploy"
nextPost: "configuring-editor"
relatedPost1: "configure-obsidian"
relatedPost2: "using-templates"
relatedPost3: ""
relatedPost4: ""
---

This is the third part of the [Getting Started Guide](/blog/getting-started). 

In this section, we'll create our workspace folder. This is where we'll store our content.

If you're comfortable creating folders and dragging and dropping files on your computer, this part will be relatively easy. But just in case, we've added a few extra details to help you along.

![](lumber.jpg)

## Why we need a workspace folder
Instead of using a content management system (CMS) like WordPress or Ghost, Eggspress uses a file-based system to store your content.

This means that you can edit and manage your content anywhere. As long as you have a way to manage your folders and files (on your computer, tablet, or phone), you'll be able to publish to Eggspress.

To help you get started quickly, we provide a "starter workspace" that includes all of the files and folders that you need.
## Download the starter workspace
Use the link you saved in [the previous step](/blog/fork-and-deploy) to navigate to your new Eggspress site.

Near the bottom of the screen is a large button labeled "Download Eggspress Starter Workspace." Click on this to download `eggspress_starter_workspace.zip`.

Navigate to this file on your computer.

If you can't find it, go back to your site and try the following steps:
1. Right-click on the green download button 
2. Select "Save link as..." 
3. Select "Desktop" or another folder you can easily access
4. Click "Save" 

Locate your file and proceed to the next step.

## Extract / expand / unzip your workspace folder
The zip file you downloaded is an "archive" file. It acts like a box filled with all of the folders and files you'll need to start your workspace.

Our next step is to unpack this box so that it's contents are in a folder on our computer. The instructions for doing so vary depending on whether you use Windows, Mac, or Linux.

If you're unfamiliar with zip archives, you may find these reference guides helpful:
- [Windows](https://support.microsoft.com/en-us/windows/zip-and-unzip-files-8d28fa72-f2f9-712f-67df-f80cf89fd4e5#:~:text=To%20unzip%20a%20single%20file,and%20then%20follow%20the%20instructions.)
- [Mac](https://support.apple.com/guide/mac-help/zip-and-unzip-files-and-folders-on-mac-mchlp2528/mac)
- [Linux](https://itsfoss.com/unzip-linux/)

### On Mac
Double click on `eggspress_starter_workspace.zip` to automatically expand its contents. Thus will create a new folder on your computer of the same name, `eggspress_starter_workspace`.

### On Windows
Before you open `eggspress_starter_workspace.zip`, [create a new folder](https://support.microsoft.com/en-au/office/create-a-new-folder-cbbfb6f5-59dd-4e5d-95f6-a12577952e17), which will contain our starter workspace.

Open `eggspress_starter_workspace.zip` to display the contents of the `.zip` file and extract its contents by:
1. Selecting all folders in `eggspress_starter_workspace.zip` 
2. Dragging the selected folders into the empty folder you created

Alternatively, you can achieve the same result using the context menu:
1. Right-click on `eggspress_starter_workspace.zip`
2. Select "Extract all..."
3. Click the "Browse..." button
4. Double-click the empty folder you created
5. Click "Select Folder"
6. Click "Extract"


![](Pasted%20image%2020231126154113.png)

If done correctly, your workspace folder should now contain all of the contents from `eggspress_starter_workspace.zip`. You can now delete `eggspress_starter_workspace.zip` from your computer.
### A small glossary
The workspace folder has several parts to it:
- The **root** of your workspace folder is the location on your computer where you can see all of the `my_`-prefixed folders (as in the screenshot above)
- The **content folders**, prefixed with "my_," contain all of your contents and settings
- Each `my_`-prefixed folder can contain **subfolders**, which are nested folders

We will use these terms to reference different parts of your workspace folder.
## Handling your workspace folder
Once you've created your workspace folder, you can move or rename it at any time.

We recommend giving it a descriptive name (like `Workspace - Name-of-your-site`) and placing it somewhere on your computer that you'll remember.

If you use a sync drive like Dropbox, we recommend moving your workspace there. This will keep your workspace backed up to the cloud and (with further configuration) allow you to edit from other devices.

## Upload your workspace folder to Github
Earlier, we created a forked repository in our personal Github account. 

Presently, this repository contains only the code that's used to build Eggspress sites. Because it has no content, we see Eggspress in "Set Up Mode" when we visit our site.

To bring our site to life, we need to add content.

In this step, we'll do this by uploading our newly created workspace folder to Github. We'll use Github's web interface so you'll be able to upload your files through your web browser.

If you're familiar with Git, you may wish to use the command line interface instead.

![](github.jpg)

Before we begin, make sure your workspace folder is open and you're at its root. If you're in the right place, you'll see a set of folders with names starting with `my_`. 

If you cannot find your workspace folder or your workspace folder is empty, then you may need to repeat the section above to re-create your workspace folder.

### Drag and drop
With your workspace folder open, return to your browser and open the Github tab.

If this tab is no longer available, open a new tab and [navigate to Github](https://github.com). If you are logged in, you should see your profile icon in the far upper-right corner of the page. Click on it, then click "My repositories." Finally, click on the name of the repository you created earlier by forking.

On your repository page, you'll see a list of folders and files along with numerous other buttons and links. 

If you're new to Github, this may be overwhelming. Thankfully, from this point forward, you'll only need to interact with a handful of buttons.

One of these is the "Add file" button, which is located right above the list of files in your repository. Clicking on it will display a dropdown menu. Select "Upload files."

For the next step, you'll need to switch between your browser and the file explorer on your computer.

In your file explorer ("Finder" on Mac), navigate to the root of your workspace folder. In other words, open your workspace folder so that you see the set of folders whose names start with `my_`.

Next, you'll select all of these files and drag them into your browser. Here's how:

1. If your file explorer's window is maximimized, "unmaximize" it and resize it so that you can see your web browser behind it
2. Select all of the `my_`-prefixed folders that are on your computer (Ctrl + A on Windows/Linux, Command + A on Mac)
3. With these folders selected, left-click one of the selected files and hold your left mouse button down
4. With the left mouse button held down, drag (by moving your mouse) the selected folders over your browser
5. Drop (let go of the left mouse button) the selected folders onto the rectangular box in Github labeled "Drag files here"

![](Pasted%20image%2020231125173141.png)

![](Pasted%20image%2020231125173322.png)

Alternatively, you may click "choose your files." Be careful to select the root folder of your workspace folder (you want to upload the contents of your workspace folder, not the workspace folder itself).

If you did this correctly, a status bar will appear. This indicates Github's progress in uploading your files. When this bar is full and your files are uploaded, scroll down until you see a section titled "Commit changes." 
### Committing your files
When you "commit" your files, you're effectively telling Github to incorporate your new files into your repository. 

Each time you commit files to your repository, you create a commit. Over time, you'll have many commits. You can think of a commit as a snapshot of your repository. 

For our purposes, commits are useful for two reasons. They give us a log of every change we've ever published to our site. They also allow us to go back to a previous commit, which is handy for undoing a one or more changes.

Before you commit, you can provide a short "commit message." These can help you keep a log of your changes. You can also leave a description with more information. Note that both commit messages and descriptions are optional.

For this first commit, a good message might just be "Initial workspace contents added." Here are some examples of messages you might use in the future:
- Changed images for *(some post)*
- Revised (*some post*) for grammatical errors
- Update headline and subtitle colors
- Add *(some person)* as a new author
- Attribute *(some post)* to *(some author)*

When you're done writing your message, click "Commit changes." You'll see a spinner appear as Github incorporates your new files into your repository. When your new commit is ready, Github will take you back to your repository page.

![](Pasted%20image%2020231125173408.png)

![](Pasted%20image%2020231125173832.png)

### Good practice: Uploading in smaller batches

In the step above, we uploaded everything from our workspace folder in one go. As your site grows, you might want to upload files in smaller batches (for example, one post along with its images). This has a few benefits:
1. You'll have more snapshots to return to
2. You'll be able to find pinpoint errors (if there are any) more easily
3. You'll lower the chances of publishing drafts that you aren't ready to publish yet

The steps to uploading in smaller batches is almost the same as uploading an entire workspace folder. The main difference is that you must first select the correct subfolder on Github first before you add files.

For example, if you're uploading all files from `my_posts`, you must open to `my_posts` on Github. This can be done by clicking `my_posts` in the Github web interface when you're viewing your forked repository.

Selecting a folder brings you to a new layout on Github that displays your folders and files on the left. If you select a folder or a file, you will preview its contents.

Here, you can upload files by clicking a button on the upper-right side. Depending on your screen size, this button can be labeled as either "Add file" or as three dots ("..."). Click on this button to display a dropdown menu and select "Upload files."

![](Pasted%20image%2020231128152150.png)

## Publishing your new changes
Earlier, you pointed Vercel to your repository on Github. As a result, whenever Vercel detects a change to this repository, it will automatically begin building a site with your latest files.

In other words, you do not need to take any additional actions after commiting your files on Github.

On average, it takes a minute or two from the moment you commit your files to the moment your new site is ready. Once enough time has passed, you can visit your new site and see your new changes applied.

If your site does not update after a few minutes, then Vercel may have run into an error building it. Refer to our guide [troubleshooting your build](/blog/troubleshooting-your-build) for simple things you could check to resolve any errors.

Note: Vercel will build a new site for every commit. If you make many commits in rapid succession, Vercel will build each commit as they arrive. If this happens, you may need to wait longer before seeing your latest changes reflected on your site.

## Recap
Congratulations! You've just completed the most challenging part of the guide. If you need a break, this is a good place to take a pause.

Your site now contains a few content items that are placeholders. These demonstrate how your pages might look and what you can do with Eggspres.

In the next part, we'll set up a desktop editor that we'll use to edit files on Eggspress. We'll introduce Obsidian, our recommended editor. We'll also provide some guidance on how you can configure other Markdown editors if you prefer something aside from Obsidian.

![](fishing.jpg)
