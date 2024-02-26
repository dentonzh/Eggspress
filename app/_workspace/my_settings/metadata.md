---
title: "Eggspress"
subtitle: "the lightweight blog anyone can deploy 🐣"
subheading: ""
subsubheading: ""

indexHeadlineSuffix: ""
indexSubtitlePrefix: " is "

indexTitle: ""
metaTitle: "Eggspress - Your ideas. Your voice. Your blog."
metaDescription: "Eggspress is a fast, free, and lightweight blogging platform that you control. Designed for easy deployment, Eggspress lets anyone with a little technical know-how launch their very own site. Publish as you please."
metaBaseUrl: ""

ogDescription: "A brand new Eggspress site is coming soon!"
ogImageFilename: "og_logo.png"
ogImageWidth: 192
ogImageHeight: 192
---

To use this settings file, set your desired parameters after a key. Your parameter should be in double quotes, like so:
title: "Eggspress"

If you need to use double quotes within a parameter, you must escape it by adding a backslash in front of it. For example:
title: "And so I said, \"I think everyone should use Eggspress!\""

indexTitle refers to the title of your page on your main index page ("frontpage"). If left blank, it will be your blog title by default.

Keys prefixed with "meta" help populate meta tags on your webpage. These tags are invisible to your readers, but help search engines and other bots index details about your pages. Eggspress will do its best to fall back to other values if these are not populated. For example, if metaTitle is empty or not available, title will be used instead.

Arguably, the two most important metadata fields are those for description and title. To learn more about metadata, see https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML.

- metaTitle is the title for your site that appears in search results
- metaDescription is the short snippet of text that appears in search results
- metaBaseUrl should contain your domain name if you have one and should include "https://" (for example, https://opencourser.com)

Keys prefixed with "og" represent Open Graph tags. Other websites use these tags to build cards for your pages. Common examples of these cards are when you or others share a link on a social media site. For more details, see https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/.

As with meta tags, Eggspress will fallback onto other existing fields to populate these fields if they are unavailable or empty.
