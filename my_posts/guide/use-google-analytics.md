---
title: Use Google Analytics
subtitle: "on Eggspress"
subheading: "Learn how to set up Google Analytics on Eggspress"
isVisible: true
hideContent: false
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 50
date: 2024-01-09T14:01:30
author: ""
snippet: "Google Analytics gives you data about your visitors and how they engage with your content. In this how-to guide, we'll show you how to set up Google Analytics on your Eggspress site."
description: "In this how-to guide, we'll show you how to set up Google Analytics on your Eggspress site."
sidebar: "eggspress-links"
category: "how-to"
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

Google Analytics helps you collect data for your website. It can generate reports on this data, letting you see where your visitors are coming from and what pages they engage with on your site.

This can help you gain insights about what kind of content performs well and guide your content strategy. You could also use it to measure the efficacy of your efforts to promote your site.

> **Good to know:** Google Analytics is integrated into Eggspress, but it is not enabled until you provide your tag ID. If you prefer not to use Google Analytics, simply refrain from adding your tag ID to the settings.

![](my_posts/guide/images/meeting.jpg)

## Setting up Google Analytics
This guide does not cover setting up Google Analytics. If you do not have an account set up already, follow the steps outlined in these resources:
- [Set up analytics for a website](https://support.google.com/analytics/answer/9304153?hl=en&ref_topic=14088998&sjid=6757992472411238873-NA#stream)
- [Access your analytics account](https://support.google.com/analytics/answer/1009692?hl=en&ref_topic=14090456&sjid=6757992472411238873-NA)

## Retrieving your tag ID
In your Google Analytics dashboard, retrieve your Google tag ID. You can find it by following these steps:
1. Click the "Admin" button on the left-hand side of the dashboard
2. From your Admin view, click "Data streams"
3. From your Data streams, select the stream associated with your Eggspress site

You should see your tag ID listed in the modal that appears. Your tag ID begins with **"G-"** followed by a string of numbers and letters (in the format "G-XXXXXXXXXX").

Copy your tag ID so that you may paste it into your `variables.md` file.

If you have trouble locating it, please see [Find your Google tag ID](https://support.google.com/analytics/answer/9539598?hl=en).

## Adding your tag ID to Eggspress
To enable Google Analytics on Eggspress, we'll need to copy and paste (or manually type in) our tag ID into `my_settings/variables.md`:
1. Navigate to the `my_settings` folder of your workspace
2. Open `variables.md`
3. Look for the key `googleAnalyticsPropertyId`
4. Assign `googleAnalyticsPropertyId` the value that is your tag ID
5. Save this file onto your computer

```
googleAnalyticsPropertyId: "G-XXXXXXXXXX"
```

5. Replace the existing `my_settings/variables.md` file on Github

Upon committing, allow a few minutes for your new site to build.

## Test if Google Analytics is working
To see if Google Analytics is collecting data on your site, open the Realtime report by clicking the button labeled "Realtime" on the left-hand side of your dashboard.

See [Realtime report](https://support.google.com/analytics/answer/9271392?hl=en) if you cannot locate this button or wish to learn more about it.

In another tab or browser window, navigate to your site.

Within a minute or two, you should see new data about your most recent visit appear in your Realtime report.

## Troubleshooting Google Analytics
In some instances, Google Analytics may not track visits. This could happen if a visitor:
- Is using an ad blocker
- Has disabled JavaScript in their browser
- Is using a privacy-oriented browser or browser extension that disables tracking

If you do not see *any* data during testing, try using another device or browser.

Alternatively, if you are hosting Eggspress on Vercel, you may wish to look into [Vercel Analytics](https://vercel.com/docs/analytics).

