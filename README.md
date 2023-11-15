Eggspress is a simple blogging platform built on Next.js and React. It's designed to let anyone launch a new site with little to no coding experience. You could do everything right from the browser—no command line needed. Best of all, it's completely free[^1] and lightning fast!

New to Git/Github? Need a live demo? Check out the [full documentation](https://eggspress.vercel.app).

## Features
- No-code publishing
- SEO ready
- Dark/light mode and color schemes
- Categories
- Support for multiple authors
- Custom pages and sidebars
- Table of contents generation
- Support for Markdown and MDX
- Easy to build on if you know React and Typescript
- Easy to migrate to a larger platform as your needs expand
- Coming soon: Google Analytics
- Coming soon: Automatic Amazon.com Associates tagging
- Coming soon: Better custom sidebars with images and input fields

[^1]: If you anticipate high traffic and/or plan on sharing lots of images, please read about limits and pricing at [Vercel](https://vercel.com/docs/limits/overview) and at [Netlify](https://www.netlify.com/pricing/).

## What you'll need
To use Eggspress, you'll need a:
- Github account ([sign up](https://github.com/join))
- Vercel account ([sign up](https://vercel.com/signup) using "Continue with Github")
- Markdown editor ([Obsidian](https://obsidian.md/) is recommended)

## Get Your Own Personal Eggspress
To create your own Eggspress site, you'll need to fork the Eggspress repository. You can do this with [this link](https://github.com/dentonzh/Eggspress/fork). 

Forking copies the main repository to your Github account. From there, you can edit and modify files in your repository as you see fit. You can even create multiple forks of Eggspress if you need more than one site.

Once you've created a fork, you should see it in your list of repositories. Click its name to view its contents.

Keep this tab open for now. We'll return to it in a moment.

## Deploy your site
In this guide, we'll use Vercel to build and host your site. To do this, we need to tell Vercel where our files are. If we've done this successfully, Vercel will not only build our initial site, but also build updates automatically every time a file changes in our repository.

In your Vercel account, start in the [dashboard view](https://vercel.com/dashboard) and add a new project by clicking "Add new..." and selecting "Project".

If you chose "Continue with Github" earlier when you created your Vercel account, you should see your repositories listed on this page. If not, please refer to Vercel's documentation on [importing projects](https://vercel.com/docs/getting-started-with-vercel/import).

Select the Eggspress repository you wish to import. When prompted for a Project Name, enter a name of your choosing. Under Framework Presets, select "Next.js" if it hasn't been selected already.

Finally, click "Deploy" and wait for your site to build. A new site should take under a minute to build. If the build is successful, you'll see a list of links under "Domains." The first link is public. Anyone clicking on it will now be able to view your new site!

## Working in Eggspress
Return to your repository on Github. Among the list of contents you see are a set of folders prefixed with the `my_`. Unless you are making changes to the underlying code, all of your changes and updates should occur in these folders.

Within the `my_`-prefixed folders are files ending in `.md`. Each of these are Markdown files containing two sections.

The first, called the "frontmatter," contains a set of "key-value" pairs between two sets of dashes ("`---`"). They include metadata and other configuration settings that tell Eggspress how to build a specific page on your site.

For example, to set the title of a post, you will assign a value to the key for "title" like so: `title: "My First Post"`. You may also leave a field empty. For example, if you don't wish to have an author's details appear in a post, you can set `author: ""`.

Everything below the frontmatter is your content, which you can format and style with Markdown. If you're new to Markdown, check out this [introduction](https://www.markdownguide.org/getting-started/) and the [syntax guide](https://www.markdownguide.org/basic-syntax/).

In each `my_`-prefixed folder (with the exception of `my_settings`) is a `.template` file. You can find a full set of frontmatter keys with default dummy values. Use these to copy to new files or as a reference.

For a more in-depth explanation on this and a few suggestions on best practices, refer to the [full documentation](https://eggspress.vercel.app). 

## Creating your first post
To create your first post, navigate to the `my_posts` folder and modify the existing file, `welcome-to-eggspress.md`. Clicking on this file will preview its contents.

From this preview page, click on the pencil icon on the upper-right corner. Doing so brings up Github's browser-based editor from which you can rename, [move](https://docs.github.com/en/repositories/working-with-files/managing-files/moving-a-file-to-a-new-location), and edit the contents of this file.

Eggspress uses the name of the file to determine its path on your site. For example, `welcome-to-eggspress.md` is located at `https://<your-domain>/welcome-to-eggspress`. 

Rename this file to match the path you desire, making sure to retain the `.md` extension at the end of it. One way to prevent a post from appearing on your site is to give it a new extension that does not contain "md," such as `first-draft.hidden`.

In the frontmatter, pay attention to the `title`, `description`, `snippet`, and `date`. `description` is the text that displays in search engine results. `snippet` is a short blurb that displays in a list of posts on your site. 

`date` is the date that appears on your post. It differs from `publishDate` or `expiryDate`, which determine the date range when your post should appear.

Make any other changes as needed. For a complete list of frontmatter parameters you can set, see the [full documentation](https://eggspress.vercel.app).

## Making your first commit
Once you've finished making your edits, save your changes by clicking "Commit changes..." and choosing "Commit changes" in the modal that appears. This will update your repository. 

Whenever your repository changes, Vercel will automatically build your site using the latest copy of it. It takes about a minute for your site to build and reflect new changes.

If changes do not appear, you may have errors stemming from improperly formed frontmatter or an error with filenames or images. For troubleshooting, see the [full documentation](https://eggspress.vercel.app). 

## Creating additional posts
To create new files, click on "Add file" in the upper-right corner. From this menu, you can choose either to create a file using the Github editor or upload existing files from your computer.

## Using Obsidian
We recommend using a desktop editor like [Obsidian](https://obsidian.md/). It improves the authoring experience by previewing your Markdown as you type, organizing your files, and automatically saving your images that you paste from the web. It also supports frontmatter. 

Obsidian is cross-platform, available on Windows, Mac, Linux, Android, and iOS.

If you decide to use Obsidian, you must make the following changes to the settings:
- Under Files & Links, disable "Use Wikilinks"
- Under Files & Links, set "Default location for new attachments" to "Same folder as current file"
## Pages and author profiles
You can create and edit pages and author profiles in the same way you create and edit posts. Some of the frontmatter keys are different, but the concept remains the same.

Pages are separate from the blog and do not appear as a post. They are helpful for including one-off information. For example, you may want an "about" page, `about.md`, that readers can find at `https://<your-domain>/about`.

Author profiles contain data necessary to render author cards. These cards appear in posts and display details about the author of a given post. They also link to author pages, which contain a list of posts written by a given author. Content in author profiles is optional. If provided, content is rendered under the "Biography" section.

To attribute a post to an author and display that author's details in a post, set your post's `author` field to match the filename of your author profile without its extension. For example, if you set `author: "eggie"`, it will try to look for `eggie.md` in `/my_authors/`. You can also have multiple authors for each post by separating author "slugs" with commas (e.g. `author: "eggie, beakster"`).

Note that both pages and author profiles are optional.
## Configuring your preferences
Out of the box, Eggspress includes default settings that you will likely want to update. Unlike files in other `my_`-prefixed folders, Eggspress looks for specific files in `my_settings`. To build your site properly, refrain from renaming files in this folder.

If you only update one file, it should be `metadata.md`. Important must-edit fields in this file include `title`, `tagline`, `metaTitle`, `metaDescription`, and `ogDescription`. 

If you have your own domain name that you are using for Eggspress, you must update `metaBaseUrl` to include it. For example, if your domain is [opencourser.com](), your setting should have the key-value pair `metaBaseUrl: "https://opencourser.com"`.

`links.md` includes settings where you can add links to your footer.

`appearance.md` allows you to make changes to the color scheme on your site.

## Tidying up
You may wish to set your repository's privacy settings so that only you can view its contents. You may do so by navigating to your repository, clicking the "settings" link near the top, and selecting "Change repository visibility."

Eggspress maintains a flexible system for how you organize your files. So long as the `my_`-prefixed folders are located at the very top and retain their name (i.e. do not move or rename these folders), you can organize your files within these folders as you wish.

Image files must be kept with the `.md` files that reference them. More specifically, they should either be in the same folder as that `.md` file or nested somewhere under said folder.

For example, if `image_of_eggie.jpg` appears in `/my_posts/eggie/eggie-post.md`, then `image_of_eggie.jpg` will appear when it is located at:

- `/my_posts/eggie/image_of_eggie.jpg`
- `/my_posts/eggie/images/image_of_eggie.jpg`
- `/my_posts/eggie/really/deeply/nested/directory/to/images/image_of_eggie.jpg`

But it will NOT appear if it is located at the following locations:
- `/image_of_eggie.jpg`
- `/my_posts/image_of_eggie.jpg`
- `/my_posts/beakster/image_of_eggie.jpg`

For more details about file organization, editor settings, and images, see the [full documentation](https://eggspress.vercel.app). 