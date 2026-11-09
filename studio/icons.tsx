import { Icon } from '@sanity/icons'
import type { IconSymbol } from '@sanity/icons'
import type { ComponentType } from 'react'

/**
 * @sanity/icons v5 exports nur noch die generische <Icon symbol="..." />
 * Komponente statt einzelner PascalCase-Icons (z. B. "HomeIcon"). Diese
 * kleinen Wrapper geben den Schemas/der Struktur wieder benannte,
 * einsatzbereite Icon-Komponenten.
 */
function makeIcon(symbol: IconSymbol): ComponentType {
  return () => <Icon symbol={symbol} />
}

export const HomeIcon = makeIcon('home')
export const CogIcon = makeIcon('cog')
export const UsersIcon = makeIcon('users')
export const UserIcon = makeIcon('user')
export const TagIcon = makeIcon('tag')
export const SparklesIcon = makeIcon('sparkles')
export const ImagesIcon = makeIcon('images')
export const ImageIcon = makeIcon('image')
export const EnvelopeIcon = makeIcon('envelope')
export const DocumentTextIcon = makeIcon('document-text')
