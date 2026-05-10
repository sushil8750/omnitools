import Fuse from 'fuse.js'
import { TOOLS, Tool } from '@/config/tools'

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'description', weight: 0.3 },
    { name: 'category', weight: 0.2 },
    { name: 'slug', weight: 0.1 }
  ],
  threshold: 0.3,
  includeScore: true,
  shouldSort: true
}

let fuse: Fuse<Tool> | null = null

export function getSearchEngine() {
  if (!fuse) {
    fuse = new Fuse(TOOLS, fuseOptions)
  }
  return fuse
}

export function searchTools(query: string) {
  if (!query) return []
  const engine = getSearchEngine()
  return engine.search(query).map(result => result.item)
}
