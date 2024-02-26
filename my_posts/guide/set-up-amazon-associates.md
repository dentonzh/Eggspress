---
title: Set up Amazon Associates
subtitle: ""
subheading: "Add your tracking ID to your Amazon links automatically"
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 50
date: 2024-01-07T12:01:57
author: "denton"
snippet: "Learn how to add your Amazon Associates tracking ID automatically to all Amazon links you insert into your content. This handy guide will walk you through the exact custom rule you need to add to your links settings."
description: "Learn how to add your Amazon Associates tracking ID automatically to all Amazon links you insert into your content."
sidebar: "eggspress_links"
category: "how-to"
prevPost: ""
nextPost: ""
relatedPost1: "modify-links-custom-rules"
relatedPost2: "linking-external-content"
relatedPost3: ""
relatedPost4: ""
relatedPost5: ""
relatedPost6: ""
relatedPost7: ""
relatedPost8: ""
relatedPost9: ""
---

Eggspress allows you to set custom rules to [modify links](my_posts/reference/modify-links-custom-rules.md) automatically. This feature allows you to add prefixes, suffixes, and even replace parts of your link.

These instructions apply specifically to Amazon Associates program. However, you may repurpose these instructions and apply them to most other affiliate programs.

Here's how you can use custom rules to add Amazon Associates tracking ID's to your content.

> **Good to know:** If you add affiliate links, ensure that you are compliant with FTC rules. You can read more about compliance in this [Amazon help page](https://affiliate-program.amazon.com/help/node/topic/GHQNZAU6669EZS98).

> **Caution:** Custom rules allow you to automate link creation, but you are responsible for checking that your links are working properly. Eggspress is not responsible for incorrect links, even if a malformed link is the result of a bug or error.

![](my_posts/guide/images/coins.jpg)
## Configuring links.md
To add your tracking ID to your amazon links, set `modifyLink` keys in the `my_settings/links.md` file to the following:

```
modifyLinkBaseUrl1: "amazon"
modifyLinkStrictMatch1: false
modifyLinkSetPrefix1: ""
modifyLinkSetSuffix1: "?tag=<your-amazon-tracking-id>"
modifyLinkSetNewBaseUrl1: ""
```

You must replace `<your-amazon-tracking-id>` with a valid tracking ID that associated with your Amazon Associates account.

Note that you may configure any set of keys prefixed with `modifyLink` (they do not necessarily need to end with `1`).

If you use custom rules to define your links, you should ensure that your existing links to Amazon pages do not already include the query parameter `tag`. If it does, you should manually remove it.

## Why these settings?
Amazon uses many different subdomains and top level domains to sell products and services. To ensure that clicks are attributed to you for these links, we set `modifyLinkStrictMatch` to `false` and `modifyLinkBaseUrl` to `"amazon"`.

This will allow us to add our tracking ID to these sites:
- amazon.com
- amazon.jp
- amazon.de
- amazon.fr
- amazon.com.mx
- fresh.amazon.com
- music.amazon.com

This is not an exhaustive list. There are many more Amazon-owned sites with other top level domains and subdomains. It would require a lot of entries if we were to try to match each of these one by one using strict matching.

> **Caution:** this rule does not apply to shortened links that do not contain "amazon" in the domain / host name. For example, this custom rule will not modify links pointing to `amzn.to`.

> **Good to know:** non-strict matching will also pick up other sites you link to that include the word "amazon" in the host / domain. For example, a link to `https://amazonrainforest.com` would also trigger our custom rule. This is unlikely to have any adverse effects.

## Why use custom rules over Amazon's tools?
Amazon offers a variety of tools to build and generate links for you. This is an acceptable solution and you may continue to use those tools.

Here's why you may want to use custom rules instead of Amazon's link builders:
- It's easier (just insert an Amazon link into your content for tracking)
- You'll be able to change your tracking ID in one place
- You'll be able to migrate between different Associates accounts in one place

> **Good to know:** you can insert links that contain query parameters without those query parameters affecting your custom rule. Eggspress will add the `tag` query parameter to all of your other existing query parameters.

