import { split } from "postcss/lib/list";
import { getEggspressSettings } from "../utils";


const getContentClasses = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')
  let classes = []

  if (appearanceSettings.colorContentBodyHeadingDark) {classes.push(`dark:prose-headings:text-${appearanceSettings.colorContentBodyHeadingDark}`)}
  if (appearanceSettings.colorContentBodyHeadingLight) {classes.push(`prose-headings:text-${appearanceSettings.colorContentBodyHeadingLight}`)}
  if (appearanceSettings.colorContentBodyTextDark) {classes.push(`dark:prose-p:text-${appearanceSettings.colorContentBodyTextDark}`)}
  if (appearanceSettings.colorContentBodyTextLight) {classes.push(`prose-p:text-${appearanceSettings.colorContentBodyTextLight}`)}
  if (appearanceSettings.colorContentLinkTextDark) {classes.push(`dark:prose-a:text-${appearanceSettings.colorContentLinkTextDark}`)}
  if (appearanceSettings.colorContentLinkTextLight) {classes.push(`prose-a:text-${appearanceSettings.colorContentLinkTextLight}`)}

  return classes.join(' ')
}

export default getContentClasses