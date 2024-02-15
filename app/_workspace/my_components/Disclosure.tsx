import Link from 'next/link'
import React from 'react'

/*
How to use this custom component:

Add this file to the `my_components` folder of your workspace.
You may use this component at any point by inserting the following directly into your content:

    <Disclosure />

This custom component accepts two optional properties:

    1. text
    2. page
    3. link-text


The property `text` allows you to replace the default text with your own text.
The property `page` allows you to provide a link to a custom page on your site (for example, "disclosure")
The property `linkText` allows you to provide a custom label for the page link specified in property `page`

One example of how you may apply these properties is as follows:

    <Disclosure text="Please consult with your physician before following the advice on this page" page="medical-disclosure" link-text="Learn more" />


You may also customize this component using React, Next.js, and Tailwind. It is recommended that you keep custom components self-contained within one file where possible.
*/

type DisclosureProps = {
  text?: string,
  page?: string,
  linkText?: string,
  children?: React.ReactNode
}

const Disclosure = ({text, page, linkText, children} : DisclosureProps) => {
  return (
    <div className="text-sm bg-gray-600/10 dark:bg-gray-100/10 rounded border border-gray-700/20 dark:border-gray-100/20 text-center py-1 px-3">
      <span className="">
        {text ? text : 'When you buy through links on this site, we may earn a commission'}
      </span>
      <span className="pl-2">
        {children}
      </span>
      {page && 
        <Link className="inline-block opacity-80 hover:opacity-100 pl-2" href={`/page/${page}`}>{linkText ? linkText : 'Read more'}</Link>
      }
    </div>
  )
}

export default Disclosure