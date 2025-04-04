
import React from "react";

interface MarkdownRendererProps {
  markdown: string;
}

/**
 * Component to render markdown content as HTML
 */
const MarkdownRenderer = ({ markdown }: MarkdownRendererProps) => {
  return (
    <div 
      className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{
        __html: markdown
          .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
          .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
          .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
          .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>')
          .replace(/^\* (.*$)/gm, '<li>$1</li>')
          .replace(/^- (.*$)/gm, '<li>$1</li>')
          .replace(/<li>(.*)<\/li>/gm, '<ul class="list-disc pl-5 my-2"><li>$1</li></ul>')
          .replace(/```(typescript|javascript|tsx|jsx|js|ts)\n([\s\S]*?)```/gm, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$2</code></pre>')
          .replace(/\`\`\`([\s\S]*?)\`\`\`/gm, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
          .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/gm, '<em>$1</em>')
          .replace(/^---$/gm, '<hr class="my-6" />')
          .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2" class="text-primary hover:underline">$1</a>')
          .replace(/\n\n/gm, '</p><p class="my-3">')
          .replace(/\`(.*?)\`/gm, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
      }}
    />
  );
};

export default MarkdownRenderer;
