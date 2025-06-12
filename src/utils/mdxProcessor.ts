import { compile } from '@mdx-js/mdx';

// Component registry with file paths
const componentRegistry: Record<string, string> = {
  TestDemo: 'src/components/Demos/TestDemo.astro',
  // Add more components here
};

export async function processMDXContent(content: string): Promise<string> {
  // Check if content has components
  const hasComponents = /<\w+([^>]*?)\/>/g.test(content);
  
  if (!hasComponents) {
    // Return regular markdown processing
    const { marked } = await import('marked');
    return marked(content);
  }

  // Convert component syntax to MDX imports and usage
  let mdxContent = `
import TestDemo from '../components/Demos/TestDemo.astro';

${content}
  `;

  try {
    // Compile MDX to JavaScript
    const compiled = await compile(mdxContent, {
      outputFormat: 'function-body',
      development: false,
      jsx: true,
    });

    // For now, let's just return a placeholder that shows it worked
    return `
      <div class="mdx-content">
        <div class="bg-green-50 border border-green-200 rounded p-4 mb-4">
          <p class="text-green-700">✅ MDX compilation successful! Component detected and processed.</p>
        </div>
        ${content.replace(/<(\w+)([^>]*?)\/>/g, '<div class="component-placeholder bg-blue-50 border border-blue-200 rounded p-4 my-4"><p class="text-blue-700">Component: $1 would render here</p></div>')}
      </div>
    `;
  } catch (error) {
    console.error('MDX compilation error:', error);
    // Fallback to regular markdown
    const { marked } = await import('marked');
    return marked(content);
  }
}

async function renderComponentFromFile(componentName: string, props: Record<string, any>): Promise<string> {
  const filePath = componentRegistry[componentName];
  
  try {
    // Read the component file
    const componentContent = await readFile(filePath, 'utf-8');
    
    // Remove frontmatter if any
    const content = componentContent.replace(/^---[\s\S]*?---\s*/, '');
    
    // Process as clean markdown without code fence styling
    return marked(content, {
      breaks: true,
      gfm: true,
      renderer: new marked.Renderer() // Clean renderer
    });
  } catch (error) {
    throw new Error(`Failed to read component file: ${filePath}`);
  }
}

function parseProps(propsString: string): Record<string, any> {
  const props: Record<string, any> = {};
  
  if (!propsString.trim()) return props;
  
  const propRegex = /(\w+)=["']([^"']+)["']/g;
  let match;
  
  while ((match = propRegex.exec(propsString)) !== null) {
    props[match[1]] = match[2];
  }
  
  return props;
} 