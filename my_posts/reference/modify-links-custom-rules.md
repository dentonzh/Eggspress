---
title: Modify Links
subtitle: "Using Custom Rules"
subheading: "Use rules to automatically modify links in your content"
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 50
date: 2024-01-07T12:01:61
author: "denton"
snippet: "Create custom rules to modify your links automatically. Add custom query parameters, replace a link's host or domain, add subdomains, and even replace protocols."
description: "Learn how to set custom rules that modify links in Eggspress."
sidebar: "eggspress_links"
category: "reference"
prevPost: ""
nextPost: ""
relatedPost1: "linking-external-content"
relatedPost2: "set-up-amazon-associates"
relatedPost3: ""
relatedPost4: ""
relatedPost5: ""
relatedPost6: ""
relatedPost7: ""
relatedPost8: ""
relatedPost9: ""
---

In Eggspress, you can set custom rules to modify your links automatically. These rules only target specific domains that you specify in `my_settings/links.md`.

If a link you insert into your content has a domain that matches one of the custom rules, then Eggspress will modify it accordingly.

In total, you may specify up to 20 custom rules.

Presently, you can:
- Add a prefix to a link
- Add a suffix to a link
- Replace the domain or hostname
- Replace the protocol

![](my_posts/reference/images/puzzle.jpg)
## When you should use this
The most common use case is to append a suffix to the end of an existing link. This is commonly used to add query parameters, which are commonly used to pass additional information to a server.

`https://opencourser.com/search?q=blogging&page=1`

In the URL above, everything starting with the "?" are query parameters, which come in key-value pairs. In the example, `q` is a key with value `blogging` and `page` has a value of `1`.

These query parameters are also useful for attribution and marketing purposes.

It's less common to add a prefix, replace the domain, or swap one protocol for another.

You may, for example, prefer to use X's domain over Twitter's. In this case, you would try to match `twitter.com` and create a custom rule to replace the base URL with `x.com`.

You could also set rules to add a prefix. This is useful if an external resource you link to has moved a set of pages to a new subdomain. For example, if pages on `yourfavoritesite.com` moves to `blog.yourfavoritesite.com`.

Very rarely will you need to replace the protocol. For example, if a site switches from `http://` to `https://`, you may wish to define a custom rule to update your links. Most modern sites use `https://` and will redirect requests made to `http://`.

## How to set custom rules
The file `my_settings/links.md` includes a set of keys that start with `modifyLink`. These keys allow you to set custom rules.

Out of the box, Eggspress comes preset with one rule as an example. You may replace this rule.

```
modifyLinkBaseUrl1: "opencourser.com"
modifyLinkStrictMatch1: true
modifyLinkSetPrefix1: ""
modifyLinkSetSuffix1: "?utm_source=eggspress&utm_medium=blog"
modifyLinkSetNewBaseUrl1: ""
```

`modifyLinkBaseUrl` refers to the host. The host includes the domain (`opencourser`) and top level domain (`.com`) and may also contain a subdomain (e.g. `www`).

In the above example, we define a rule that automatically adds the query parameters `utm_source` with the value `eggspress` and `utm_medium` with the value `blog` to all links that have the domain `opencourser.com`.

Only one custom rule may be applied to each link. If multiple rules may match, only the first rule (based on the number suffix of the `modifyLink` key) will apply.

> **Good to know:** If the link you've inserted into your content already has one or more query parameters, the "?" in `modifyLinkSetSuffix` will automatically become "&" to build on your existing query parameters

## Strict matching
By default, `modifyLinkStrictMatch` is set to `true`. That means that only inserted links with a host that is identical to `modifyLinkBaseUrl` will be affected.

In some instances, you may wish to match only part of the host. This is useful if you wish to target the same domain and include all subdomains and top level domains of that subdomain.

To achieve this, set `modifyLinkStrictMatch` to `false`.

In the above example, only links that have the domain `opencourser.com` will have a suffix added. A link that we insert into our content with the host `www.opencourser.com` or `opencourser.us` will not be modified.

The table below illustrates when a link will be modified given a custom rule's match settings and an inserted link.

| modifyLinkBaseUrl | modifyLinkStrictMatch | Inserted link | Modified? |
| ---- | ---- | ---- | ---- |
| opencourser.com | Yes | `https://opencourser.com/login` | Yes |
| opencourser.com | Yes | `https://www.opencourser.com/login` | No |
| opencourser.com | Yes | `https://opencourser.us/login` | No |
| opencourser.com | No | `https://opencourser.com/login` | Yes |
| opencourser.com | No | `https://www.opencourser.com/login` | Yes |
| opencourser.com | No | `https://opencourser.us/login` | No |
| opencourser | No | `https://opencourser.com/login` | Yes |
| opencourser | No | `https://www.opencourser.com/login` | Yes |
| opencourser | No | `https://opencourser.us/login` | Yes |

## Adding a prefix or changing the protocol
`modifyLinkSetPrefix` allows you to add a prefix and/or change the protocol.

This is commonly used to add a subdomain if one isn't specified. However, you may also specify a protocol or a protocol *and* a subdomain.

If you add a prefix alone *without* a protocol, that prefix will be inserted between the start of the protocol (`https://` by default) and `modifyLinkBaseUrl`.

| modifyLinkSetPrefix | Inserted link | Output link |
| ---- | ---- | ---- |
| `ftp://` | `https://opencourser.com` | `ftp://opencourser.com` |
| `ftp://www.` | `https://opencourser.com` | `ftp://www.opencourser.com` |
| `www` | `https://opencourser.com` | `https://www.opencourser.com` |
| `blog` | `https://opencourser.com` | `blog.opencourser.com` |

## Replacing a host
In rare instances, you may need to update a host. For example, a resource may have moved from one domain to another.

To replace a host, set `modifyLinkSetNewBaseUrl`. The value used in this key will replace the value in `modifyLinkBaseUrl`.

For example, to update all of your Twitter links to use the new domain for X, you would set:

```
modifyLinkBaseUrl1: "twitter.com"
modifyLinkStrictMatch1: true
modifyLinkSetPrefix1: ""
modifyLinkSetSuffix1: ""
modifyLinkSetNewBaseUrl1: "x.com"
```



