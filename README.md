<a href="https://eggspress.vercel.app/blog/getting-started"><img align="left" alt="Eggspress app icon" src="public/assets/icon-72.webp"/></a>

Eggspress is a lightweight blogging platform built on Next.js and React. It's designed to help anyone publish on the web—no command line needed. Best of all, it's lightning fast and completely free.[^1]

For more detailed set up instructions and a demo, see the [Getting started guide](https://eggspress.vercel.app/getting-started). It's an Eggspress site that makes use of most of Eggspress' features.

## Features

- No-code setup and publishing
- Markdown based
- MDX-support (add React to content)
- Color schemes and dark mode
- Syntax highlighting in code blocks
- Marketing-friendly
  - SEO-ready
  - Google Analytics support
  - Bulk link editor
  - Share buttons
- Multiple authors
- Performance optimized

## Prerequisites

To use Eggspress, you'll need to have accounts on:

- Github ([sign up](https://github.com/join))
- Vercel ([sign up](https://vercel.com/signup) using "Continue with Github")

We also recommend a Markdown editor for your content. [Obsidian](https://obsidian.md/) is our editor of choice. When properly configured, it automates a lot of mundane tasks (like placing inserted images into the right directories) and makes publishing to Eggspress even easier.

> **Experienced Git users:** Some of the instructions below provide for a no-code setup experience. You can replace these steps with `git` commands run from the terminal.

## Forking Eggspress

Log into Github and [fork Eggspress](https://github.com/dentonzh/Eggspress/fork). Provide a name and description of your choosing and click "Create fork."

This process takes a few seconds. When completed, Github will direct you to a page containing your forked Eggspress repository.

Keep this tab open for later.

## Deploy your site

In a new tab, open [Vercel](https://vercel.com/), which will build and host our site.[^2] For this step, we'll tell Vercel where our forked repository is. Vercel will do the rest.

From the [dashboard view](https://vercel.com/dashboard), click the "Add new..." button and select "Project" from the dropdown menu. You'll be taken to a page where you can choose a project to import. Select your newly forked Eggspress repository.

When prompted for a Project Name, enter a name of your choosing. Under Framework Presets, select "Next.js". Click "Deploy" when you're ready. Vercel will show you the current status of your build, which on average takes between 40-50 seconds to complete.

When your new site is ready, Vercel will show you a "Congratulations" page. Click on the "Continue to Dashboard" button on the upper-right corner of this page. From your dashboard, click the "Visit" button, which is also on the upper-right corner.

You'll now see your new site, which is currently in "set up" mode. Save or bookmark the address to this page, which should look something like `https://<your-project-name>.vercel.app`. With this link, anyone will be able to see your new site!

Note: If you want a different URL, you can set your Vercel address or add a custom domain by following [these directions on custom domains](https://vercel.com/guides/how-do-i-add-a-custom-domain-to-my-vercel-project).

## Creating your workspace

Your workspace is a folder on your computer that contains all of your settings and content. To set up your initial workspace, create a new folder on your computer.

On your new site, click "Download Eggspress Starter Workspace" to save `eggspress_starter_workspace.zip` to your computer. Open this file and extract its contents to the workspace folder you just created.

This initial workspace contains a series of folders prefixed with `my_`, which separate your files into different content types. We'll return to these folders in a bit to explain how they work.

## Uploading your workspace to Github

To publish changes to your new site, you will upload files from your workspace to Github.

We'll upload everything at once. As your site grows, you may wish to upload files in smaller batches. This will prevent inadvertently publishing drafts that you aren't ready to share yet.

The easiest way to upload your files without using a command line or terminal is through Github's web interface. Here's how:

1. With your workspace folder open, return to the tab in your browser where Github is open
2. Navigate to your forked Eggspress repository if you aren't yet there
3. Above the list of files and folders listed, look for a button labeled "Add file"
4. From the dropdown that appears, select "Upload files"
5. From your workspace folder, drag all of the folders prefixed with `my_` into the rectangle labeled "Drag files here"

On the same page, Github will process your files. When all of your files are uploaded, scroll down and look for a section titled "Commit changes." You may wish to leave a commit message, but this is optional.

When you're done, click the green button labeled "Commit changes."

If you're new to Github and need a bit more help, take a look at the [second part of this page](https://eggspress.vercel.app/blog/create-your-workspace) from our guide.

## Building your site (again)

When you commit changes to Github, Vercel will automatically detect the commit. When it does, it will build a new version of your site that incorporates all of the changes you made to your repository. In this case, these changes take the form of new files you added from your workspace.

Wait a minute or two and try refreshing the tab containing your site. If everything went without a hitch, you'll now see your site filled with placeholder content! These placeholders are meant to give you an idea of what's possible on Eggspress and how you can implement certain features (like custom sidebars, author cards, custom pages, etc.).

If your changes do not appear after two minutes, you may have errors stemming from improperly formed frontmatter or improperly formatted filenames. For troubleshooting, see the [our troubleshooting docs](https://eggspress.vercel.app/troubleshooting).

## The `my_`-prefixed folders

Your Eggspress workspace contains a series of folders prefixed with `my_`. During the build process, Eggspress looks through each of these folders to put together the pages of your site.[^3]

These `my_`-prefixed folders can contain anything, but only files ending in in the extensions `.md` and `.mdx` will be read. These files will become either posts, pages, or settings that determine how your site appears and functions.

During build, Eggspress will automatically move images and videos referenced in the `.md` and `.mdx` files and update their links.

In general, you have a lot of flexibility when it comes to these folders. However, there are a few things you should know:

- You can organize your files inside of the `my_` folders however you like (using subfolders)
- You can tell Eggspress to skip building a file by adding a "#" in front of its filename
- You must avoid renaming or moving the `my_`-prefixed folders themselves
- You must avoid renaming files that end in `.md` in the `my_settings` folder

## Using Obsidian

To edit your content, you can use any text editor.

We recommend using a Markdown editor that's specifically suited to the task. Among the many Markdown editors that are available, we recommend [Obsidian](https://obsidian.md/).

If you are opening Obsidian for the first time, select "Open Folder As Vault" and select the folder that contains all of your `my_`-prefixed folders.

If you're an existing Obsidian user, you will need to "Open another vault."

At any time, you may create a new vault or select a different folder as your vault. You can do this by clicking the "Open Another Vault" button near the bottom-left corner of your Obsidian editor.

If you're using the starter workspace, it will include Obsidian settings that we've configured to work best with Eggspress. If you are having issues with linking other files or images, you may need to [configure Obsidian manually](https://eggspress.vercel.app/blog/configure-obsidian).

## Editing your content

Editing your content is easy although there is a small learning curve if you're new to Markdown.

To follow along in this section, open the file `welcome_to_eggspress.md`, which you can find in the `my_posts` folder. At a glance, you'll notice this file is structured into two parts. These are the frontmatter and the content.

### Frontmatter

The frontmatter section contains a set of "key-value" pairs. Each one represents a data point that Eggspress uses when building your post.

These pairs are sandwiched between two sets of dashes ("---"). They include metadata and other post-specific preferences.

For example, to set the title of a post, you will assign a value to the key for "title" like so:

`title: "My First Post"`.

You may also leave a field empty. For example, if you don't wish to have an author's details appear in a post, you can set your author as:

`author: ""`

Frontmatter can point to other files in your workspace folder. For example, if you set your sidebar like this in your post:

`sidebar: upcoming-events`

Your post will display a sidebar populated with information from `my_sidebars/upcoming_events.md`.

If your site runs into errors during the build process, it's possible that something in the frontmatter of one (or more) of your files is improperly formatted. To learn more, check out our note about [how frontmatter works on Eggspress](https://eggspress.vercel.app/blog/frontmatter).

### "Important" frontmatter

Frontmatter is optional in Eggspress, but very much recommended.

If you opt to use frontmatter, the most "important" keys are `title`, `description`, `snippet`, and `date`. These fields provide valuable information for both your readers. They also help search engines index your site.

`title` is the name of the content that appears in lists of posts on your site and in the header of a given content item's page. It's also the text that appears on search engines and in Open Graph cards.

`description` is the text that appears on search engines and in Open Graph cards.

`snippet` is the text that displays below the title in lists of posts that appear on your site. They do not appear on the content item's page.

`date` is the date that appears on your post. By default, Eggspress sorts your posts by date, although you can opt to change ordering to by alphabetical or by weight.

For a complete list of frontmatter parameters you can set, see [Editing Eggspress Content](https://eggspress.vercel.app/blog/editing-content).

### Content

Everything below the frontmatter is your content. This is where you will write the body of text that will make up your posts and pages.

Eggspress makes use of Markdown to style text. Markdown is widely used and very efficient for applying stylings quickly. If you're new to Markdown, check out this [introduction](https://www.markdownguide.org/getting-started/) and the [syntax guide](https://www.markdownguide.org/basic-syntax/).

For your convenience, we've added a Markdown reference to most template files where content is required. You can find these files in `my_templates`.

### Templates

You can create your content by copying frontmatter from `my_templates` or from an existing content file.

If you're using Obsidian, you can insert templates into a new file. To do this, open a newly created file in the editor and click the "Insert Template" icon found on the left-hand ribbon. This will display a pop-up modal where you can select the template you wish to use.

If you use this feature, Obsidian will automatically populate the `title` and `date` fields for you.

When linking internally to other pages on your site, use relative links. For example, to link to another blog post with the filename `my-second-post.md` with the text "here's my second post", you would use `[here's my second post](/blog/my-second-post)`.

Note: when using templates, you must select the template that corresponds with the content type you're using. For example, if you created a file in `my_posts`, you must use `#.post.md`.

### Filenames

The filename you give your files determine their paths on your site. Filenames may contain spaces and underscores, but these will be replaced with hyphens in your path.

For example, a file in your `my_posts` folder named `an introduction to eggspress.md` will have a path `https://<your-domain>/blog/an-introduction-to-eggspress`.

When referencing another file from your content frontmatter, you should also replace spaces and underscore with hyphens.

For example, to reference a file in the `my_authors` folder named `Eggie Shellvetica.md`, you would set the `author` key in the frontmatter of that post to `author: eggie-shellvetica`.

Where possible, avoid renaming files that you have already published. Doing so will cause existing links to break.

## Custom pages

Custom pages (found in `my_pages`) and author profiles (`my_authors`) are two content types on Eggspress that work very similarly to posts (`my_posts`).

Pages are helpful for including one-off information. They differ from posts in that they do not appear in any lists of posts. Their paths are also different. Where posts are located at `https://<your-domain>/blog/<post-slug>`, custom pages are located at `https://<your-domain>/<page-slug>`.

## Author profiles

Author profiles contain data used to generate author pages and author cards. These files have optional content sections. If populated, content in author profiles will appear under the list of that author's post in a section titled "Biography."

To attribute a post to an author, set the `author` frontmatter field.

For example, setting `author: "eggie"` will generate an author card using data found in `my_authors/eggie.md`.

You can list multiple authors on each post by separating author "slugs" with commas (e.g. `author: "eggie, beakster"`).

## Settings and Preferences

Unlike files in other `my_`-prefixed folders, files in `my_settings` should not be renamed.[^9]

Of these files, the only file you must edit is `metadata.md`. It contains important fields such as `title`, `subtitle`, `metaTitle`, `metaDescription`, and `ogDescription`. Fields prefixed with `meta` are used to insert data onto your pages that are not visible to your readers. These are read by web crawlers (like those belonging to search engines).

We recommend you update `metaBaseUrl` to the domain of your site. By default, Vercel assigns the domain `https://<project-name>.vercel.app`. If you are using your own custom domain, you must update `metaBaseUrl` or your Open Graph cards will not generate properly.

`links.md` contains a set of fields where you can add links to your footer. You can also set custom rules here to modify your links in bulk.

`appearance.md` allows you to adjust the appearance of your pages and toggle the visibility of certain elements. It also allows you to set the font and color scheme to be applied throughout your Eggspress site. It is possible to update colors manually by creating or modifying files in `my_settings/colors`.

The folder at `my_settings/brand` contains a set of `.png` files that you can replace. These files represent the favicon, brand logo that appears in the navbar and footer, and the Open Graph image.

## Tidying up

When you're ready to publish your next update, upload your workspace files again to your forked Eggspress repository.

To remove an unwanted post (or any other content item), navigate to its file and follow the directions for [deleting a file](https://docs.github.com/en/repositories/working-with-files/managing-files/deleting-files-in-a-repository).

For example, you may wish to delete `welcome-to-eggspress.md`, a file you committed earlier, to prevent it from appearing on your site.

To "hide" a file and prevent it from appearing on your site, you can set its `isVisible` frontmatter field to `false`. Note that Eggspress will still build files that are set with `isVisible: false`. Anyone with the direct link to the content will still be able to view it on the web.

To prevent a file from rendering at all, you may either:

- Remove it from your repository
- Prefix its filename with "#"

You can see an example of this convention used in files in `my_templates`. Prefixing a filename with "#" prevents it from rendering on your site, but allows them to remain in your workspace for your reference.

## You're all set!

A few reminders as you begin your next post:

- Copy and paste the frontmatter from existing files or templates to get a jump start on new posts and pages
- Filenames that you give to your posts, pages, and authors should be unique
- Avoid changing filenames to posts, pages, and authors that have been published

If you have any feedback about this README, [the docs](https://eggspress.org), or Eggspress itself, please get in touch @EggspressBlog on most social media platforms or email using (social media handle) at (gmail).

## More from Eggspress Docs

- [Reference](https://eggspress.vercel.app/reference)
- [How-To Guides](https://eggspress.vercel.app/how-to)
- [Troubleshooting](https://eggspress.vercel.app/troubleshooting)
- [Using Components](https://eggspress.vercel.app/blog/use-components)
- [Eggspress Chart](https://eggspress.vercel.app/blog/eggspress-chart)

[^1]: If you anticipate high traffic and/or plan on sharing lots of images, please read about limits and pricing at [Vercel](https://vercel.com/docs/limits/overview) and at [Netlify](https://www.netlify.com/pricing/).
[^2]: For purposes of this guide, "build" in this context means preparing your files and directories so that the server can serve your site on the web. You may also opt to use a similar service like Netlify or AWS Amplify, although this guide does not cover deploying to those services.
[^3]: The other files and folders that are already in your repository are responsible for determining how each page is built as well as some behind-the-scenes functions that run during the build process. If you're relatively new to programming, but wish to adjust how your pages look, you can experiment by creating a new branch. Changes you make on the branch will not appear on your site, but you can preview builds of branches in Vercel. Read more about [branches](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) and [preview deployments](https://vercel.com/docs/deployments/preview-deployments).
[^4]: Try your best not to rename your post and pages once they have been published (and have had enough time to be read and indexed by search engines). Renaming a post or a page will break existing links pointing to them.
[^5]: If you are storing posts in different folders, take extra care to give each post its own unique filename. If two files have the same filename, only one will appear on your site. This also applies to pages and authors.
[^6]: The field `expiryDate` will only remove a post if a build takes place. If you need to hide a post at a set time, you should consider doing so manually.
[^7]: All date fields in the frontmatter for your posts are optional.
[^8]: Not all frontmatter fields in author profiles will appear in author cards. Most fields will appear only on author pages. When provided, content will display on author pages under the list of posts attributable to the author as a biography.
[^9]: Files in `my_settings` also differ from those in other `my_`-prefixed folders in that only their frontmatter is read during build. To provide further guidance on configuring your site, we've added helpful information in the content section of these files. You may add additional notes to the content section of these files for your own reference.
