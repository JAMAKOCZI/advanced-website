import {
  Activity,
  Globe2,
  Layers,
  Shield,
  Sparkles,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import type { FeatureIcon } from '../data/content'

export const featureIcons: Record<FeatureIcon, LucideIcon> = {
  Activity,
  Sparkles,
  Layers,
  Globe2,
  Shield,
  Terminal,
}

export function getFeatureIcon(name: FeatureIcon): LucideIcon {
  return featureIcons[name]
}
