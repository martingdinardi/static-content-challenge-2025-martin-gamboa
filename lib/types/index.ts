export interface Metadata {
  title?: string;
  description?: string;
  date?: string;
  [key: string]: any;
}

export interface ContentResult {
  content: string
  metadata: Metadata
  hasSubdirectories: boolean
  subdirectories: DirectoryInfo[]
}

export interface DirectoryInfo {
  name: string
  path: string
  title: string
  description?: string
  date?: string
}