Eggspress is a lightweight blogging platform built on Next.js and React. It's designed to help anyone launch a new site with little to no coding experience. There's no command line needed. Best of all, it's lightning fast and completely free![^1]

This guide is an abridged version of [Getting Started Guide](https://eggspress.vercel.app), which includes more details including screenshots. If you're new to Github and deploying sites or you want a live demo of Eggspress, check out the guide. Otherwise, continue on.
## Prerequisites
To use Eggspress, you'll need a:
- Github account ([sign up](https://github.com/join))
- Vercel account ([sign up](https://vercel.com/signup) using "Continue with Github")
- Markdown editor ([Obsidian](https://obsidian.md/) is recommended)
## Forking Eggspress
Log into your Github account and [fork Eggspress](https://github.com/dentonzh/Eggspress/fork). Provide a name and description of your choosing and click "Create fork."

This process takes a few seconds. When completed, Github will take you to your forked copy of the Eggspress repository.

Keep this tab open. We'll return to it in a moment.

## Deploy your site
In a new tab, open [Vercel](https://vercel.com/), which we'll use to build and host our new site.[^2] To accomplish this, we'll tell Vercel where our forked repository is.

From the [dashboard view](https://vercel.com/dashboard), click the "Add new..." button and select "Project" from the dropdown menu.

Select your newly forked Eggspress repository. When prompted for a Project Name, enter a name of your choosing. Under Framework Presets, select "Next.js".

When you're ready, click "Deploy" to build your new site. It will take about 45 seconds to a minute to build your new site. Vercel will redirect you to a new page when this process is complete. On this new page, click on the Project" link near the top of the page, then click the "Visit" button near the upper-right corner of the page.

The page that opens when you click "Visit" uses the public link to your site. Save this link by writing it down or bookmarking it. We will return to your site later. (If you want a different URL, you can set your Vercel address or add a custom domain by following [these steps](https://vercel.com/guides/how-do-i-add-a-custom-domain-to-my-vercel-project).)
## Creating your workspace
Your workspace is a folder on your computer where you'll do most of your editing. To set up your initial workspace, create a new folder on your computer.

On your new site, look for a button that says "Download Eggspress Starter Workspace." Clicking this button will download `eggspress_starter_workspace.zip` to your computer. Open this file and extract its contents to the workspace folder you just created.

This initial workspace contains a series of folders prefixed with `my_`. Files in these folders determine the content that appear on your pages and how they appear on them.
## Uploading your workspace to Github
To get an idea of how these files work, we'll upload our new workspace to Github. Here, we'll upload everything in one go. As your site grows, however, you may want to upload files in smaller batches to avoid publishing drafts that you aren't ready to share yet.

Keep your workspace folder open and return to your browser tab where Github is open. If you're reading this on Github, you may want to open another tab with this page.

Near the top of your forked repository page, you'll find a button labeled "Add file." Clicking this button displays a dropdown menu. Select "Upload files" from this menu. From your workspace folder, drag all of the `my_`-prefixed folders into the rectangle labeled "Drag files here."

On the same page, Github will process your files. When all of your files are uploaded, scroll down and look for a section titled "Commit changes." You may wish to leave a commit message, but this is optional. When you're done, click the green button labeled "Commit changes."

## Publishing new changes to your site
In addition to updating your repository, committing also triggers Vercel to start building a new site based on your latest changes. As with the initial build, this process takes about 45 seconds. As your site grows, this duration may increase very slightly.

If your changes do not appear after two minutes, you may have errors stemming from improperly formed frontmatter or improperly formatted filenames. For troubleshooting, see the [full documentation](https://eggspress.vercel.app). 

## The `my_`-prefixed folders
Your Eggspress workspace contains a series of folders prefixed with `my_`. When Eggspress builds your site, it looks through each of these folders to assemble your site's contents.[^3] 

You have full control over how you structure your files and folders within the `my_`-prefixed folders. You could keep all of your content and images in one folder or nest them in subfolders. Take care, however, not to rename or move the `my_`-prefixed folders themselves.
## Using Obsidian
We recommend using a desktop editor like [Obsidian](https://obsidian.md/).

If you are opening Obsidian for the first time, select "Open Folder As Vault" and select the folder that contains all of your `my_`-prefixed folders. This will allow you to view and organize all of your Eggspress files in one place from Obsidian's interface.

If you're an existing Obsidian user, you will need to "Open another vault."

At any time, you may create a new vault or select a different folder as your vault. You can do this by clicking the "Open Another Vault" button near the bottom-left corner of your Obsidian editor.

In the same bottom-right grouping of icons, select the gearwheel icon to adjust your settings for Obsidian. Note: Obsidian settings are folder-specific. Modifying your settings for your workspace folder will not affect settings for your other Obsidian folders.

The following are changes you **must** make for your Eggspress workspace folder:
- Under "Editor" tab, set "Properties in documents" to "Source"
- Under "Files & Links," disable "Use Wikilinks"
- Under "Files & Links," set "Default location for new attachments" to **either** "Same folder as current file" or "In subfolder under current folder"
## Editing your content
Start by opening the `my_posts` folder, which contains drafts of your posts. In this folder, you'll find the placeholder file `welcome-to-eggspress.md`. You'll notice this file is structured into two parts: the frontmatter and the content.
### Frontmatter
The frontmatter contains a set of "key-value" pairs. Each one represents a data point that Eggspress uses when building your post. 

These pairs are sandwiched between two sets of dashes ("---"). They include metadata and other post-specific preferences.

For example, to set the title of a post, you will assign a value to the key for "title" like so: 

`title: "My First Post"`. 

You may also leave a field empty. For example, if you don't wish to have an author's details appear in a post, you can set your author as:

`author: ""`

Frontmatter can point to other files in your workspace folder. For example, if you set your sidebar like this in your post:

`sidebar: upcoming-events`

Your post will display a sidebar populated with information from `my_sidebars/upcoming_events.md`.

### Content
Everything below the frontmatter is your content, which you can style with Markdown. If you're new to Markdown, check out this [introduction](https://www.markdownguide.org/getting-started/) and the [syntax guide](https://www.markdownguide.org/basic-syntax/).

Each of the `my_` prefixed folders aside from `my_settings` contains a `#.template.md` file. These templates contain all of the frontmatter fields you can use for that particular type of content. They also contain sample Markdown examples in the content section in case you need a quick refresher on how to style your content.

When linking internally to other pages on your site, use relative links. For example, to link to another blog post with the filename `my-second-post.md` with the text "here's my second post", you would use `[here's my second post](/blog/my-second-post)`.
### Filenames for your content
Filenames determine the path to your content on your site. They're also used as identifiers when you reference content from other content.

When creating a path or making a reference, Eggspress replaces spaces and underscores with hyphens to create a "slug." 

For example, a file in your `my_posts` folder named `an introduction to eggspress.md` will be located at `https://<your-domain>/blog/introduction-to-eggspress`. 

Similarly, to attribute a post to an author whose profile is stored in the `my_authors` folder named `Eggie Shellvetica.md`, you would set the `author` key in the frontmatter of that post to `author: eggie-shellvetica`.

Because filenames are central to building links and references, you should avoid renaming files that you have already published. Doing so may cause existing links to break.

### Important frontmatter in posts
In the frontmatter of your posts, pay attention to the `title`, `description`, `snippet`, and `date`. These fields provide valuable information for both your readers as well as search engines that index your site. 

`description` is the text that displays in search engine results. `snippet` is a short blurb that displays in a list of posts on your site.

`date` is the date that appears on your post. It differs from `publishDate` or `expiryDate`, which determine the date range when your post should appear.[^6[^7]

For a complete list of frontmatter parameters you can set, see the [full documentation](https://eggspress.vercel.app).
## Custom pages
Custom pages (found in `my_pages`) and author profiles (`my_authors`) function very similarly to posts (`my_posts`). 

Pages are helpful for including one-off information.

## Author profiles
Author profiles contain information that Eggspress uses to generate author pages and author cards. These files may have optional content sections. If populated, content in profiles will appear under the list of that author's post in a section titled "Biography."^8

To attribute a post to an author, set the `author` field of a post to the filename of the author profile without its extension. For example, setting `author: "eggie"` will generate an author card using data found in `my_authors/eggie.md`.

You can list multiple authors on each post by separating author "slugs" with commas (e.g. `author: "eggie, beakster"`).

## Configuring your preferences
Unlike files in other `my_`-prefixed folders, files in `my_settings` should not be renamed.[^9]

Open and edit `metadata.md`. It contains important fields such as `title`, `tagline`, `metaTitle`, `metaDescription`, and `ogDescription`. 

If you have your own domain name for your Eggspress site, you must also update `metaBaseUrl`.

`links.md` contains a set of fields where you can add links to your footer.

`appearance.md` allows you to adjust the appearance of certain components on your site as well as set your color scheme.
## Tidying up
When you're ready to publish your next update, upload your workspace files again to your forked Eggspress repository.

To remove an unwanted post (or any other content item), navigate to its file and follow the directions for [deleting a file](https://docs.github.com/en/repositories/working-with-files/managing-files/deleting-files-in-a-repository). For example, you may wish to delete `welcome-to-eggspress.md`, a file you committed earlier, to prevent it from appearing on your site.

You may also hide files by prefixing it with "#". `#welcome_to_eggspress.md` will not appear on your site.

We suggest setting your repository's privacy settings so that they're only visible to you. You may do so by navigating to your repository, clicking the "settings" link near the top, and selecting "Change repository visibility."

Image files should ideally be kept in the same folder as the `.md` files that reference them or in a subfolder below the `.md` file. This is strongly recommended if you intend on adding many images with the possibility of more than one image having the same filename.

## You're all set!
If you've made it this far, then you know enough to set up and maintain your Eggspress site. 

A few reminders as you begin your next post:
- Copy and paste the frontmatter from `#.template.md` files to get a jump start on new posts and pages
- Filenames that you give to your posts, pages, and authors should be unique
- Avoid changing filenames to posts, pages, and authors that have been published

Happy blogging!

[^1]: If you anticipate high traffic and/or plan on sharing lots of images, please read about limits and pricing at [Vercel](https://vercel.com/docs/limits/overview) and at [Netlify](https://www.netlify.com/pricing/).
[^2]: For purposes of this guide, "build" in this context means preparing your files and directories so that the server can serve your site on the web. You may also opt to use a similar service like Netlify or AWS Amplify, although this guide does not cover deploying to those services.
[^3]: The other files and folders that are already in your repository are responsible for determining how each page is built as well as some behind-the-scenes functions that run during the build process. If you're relatively new to programming, but wish to adjust how your pages look, you can experiment by creating a new branch. Changes you make on the branch will not appear on your site, but you can preview builds of branches in Vercel. Read more about [branches](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) and [preview deployments](https://vercel.com/docs/deployments/preview-deployments).
[^4]: Try your best not to rename your post and pages once they have been published (and have had enough time to be read and indexed by search engines). Renaming a post or a page will break existing links pointing to them.
[^5]: If you are storing posts in different folders, take extra care to give each post its own unique filename. If two files have the same filename, only one will appear on your site. This also applies to pages and authors.
[^6]: The field `expiryDate` will only remove a post if a build takes place. If you need to hide a post at a set time, you should consider doing so manually.
[^7]: All date fields in the frontmatter for your posts are optional.
[^8]: Not all frontmatter fields in author profiles will appear in author cards. Most fields will appear only on author pages. When provided, content will display on author pages under the list of posts attributable to the author as a biography.
[^9]: Files in `my_settings` also differ from those in other `my_`-prefixed folders in that only their frontmatter is read during build. To provide further guidance on configuring your site, we've added helpful information in the content section of these files. You may add additional notes to the content section of these files for your own reference.