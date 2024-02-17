import React from 'react'
import { getString } from '../utils'

const ContentMessage = async ({ frontmatter }: Record<any, any>) => {
  if (frontmatter?.isArchived || frontmatter?.isContentHidden || frontmatter?.contentMessage) {
    return (
      <div className="w-full mb-12 mt-6">
        <div className="bg-yellow-300 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100 mb-6 w-full text-center p-2 rounded border border-yellow-500">
          {frontmatter.contentMessage ? (
            <span>{frontmatter.contentMessage}</span>
          ) : frontmatter.isArchived && frontmatter.isContentHidden ? (
            <span>
              {await getString(
                'isContentArchivedAndHiddenMessage',
                'This page is archived and its contents are no longer available'
              )}
            </span>
          ) : frontmatter.isArchived ? (
            <span>{await getString('isContentArchivedMessage')}</span>
          ) : (
            <span>{await getString('isContentHiddenMessage')}</span>
          )}
        </div>
      </div>
    )
  }
}

export default ContentMessage
