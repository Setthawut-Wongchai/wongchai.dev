import fs from 'fs';
import path from 'path';

export interface DocItem {
  slug: string;
  title: string;
  description: string;
  content: string;
}

const docsDirectory = path.join(process.cwd(), 'content/docs');

export function getDocSlugs(): string[] {
  if (!fs.existsSync(docsDirectory)) return [];
  const files = fs.readdirSync(docsDirectory);
  return files
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.(mdx|md)$/, ''));
}

export function getDocBySlug(slug: string): DocItem | null {
  const normalizedSlug = slug === '' || slug === 'index' ? 'index' : slug;
  const fullPath = path.join(docsDirectory, `${normalizedSlug}.mdx`);
  const altPath = path.join(docsDirectory, `${normalizedSlug}.md`);

  let targetPath = '';
  if (fs.existsSync(fullPath)) targetPath = fullPath;
  else if (fs.existsSync(altPath)) targetPath = altPath;
  else return null;

  const fileContents = fs.readFileSync(targetPath, 'utf8');

  // Simple frontmatter parser
  let title = normalizedSlug;
  let description = '';
  let content = fileContents;

  if (fileContents.startsWith('---')) {
    const end = fileContents.indexOf('---', 3);
    if (end !== -1) {
      const frontmatter = fileContents.slice(3, end).trim();
      content = fileContents.slice(end + 3).trim();

      const titleMatch = frontmatter.match(/title:\s*(.+)/);
      if (titleMatch) title = titleMatch[1].trim();

      const descMatch = frontmatter.match(/description:\s*(.+)/);
      if (descMatch) description = descMatch[1].trim();
    }
  }

  return {
    slug: normalizedSlug,
    title,
    description,
    content,
  };
}

export function getAllDocs(): DocItem[] {
  const slugs = getDocSlugs();
  const docs: DocItem[] = [];
  for (const slug of slugs) {
    const doc = getDocBySlug(slug);
    if (doc) docs.push(doc);
  }
  return docs;
}
