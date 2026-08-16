import { getDocBySlug, getAllDocs } from '@/lib/docs';
import { DocsSidebar } from '@/components/DocsSidebar';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface DocsPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug.join('/') : 'index';
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: 'Documentation | James Dev Portal',
    };
  }

  return {
    title: `${doc.title} | James Dev Portal`,
    description: doc.description,
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug.join('/') : 'index';
  const doc = getDocBySlug(slug);
  const allDocs = getAllDocs();

  if (!doc) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <DocsSidebar currentSlug={slug} docs={allDocs} />

        {/* Content Area */}
        <main className="flex-1 py-8 px-4 sm:px-8 lg:px-12 max-w-4xl">
          <div className="mb-6 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              Docs / {doc.slug}
            </div>
            <p className="text-sm text-zinc-400">{doc.description}</p>
          </div>

          <MarkdownRenderer content={doc.content} />
        </main>
      </div>
    </div>
  );
}
