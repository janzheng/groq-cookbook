import { marked, Renderer } from "marked";
import { codeToHtml } from 'shiki';

interface CodeBlock {
  html: string;
  language: string;
  code: string;
}

export class CodeBlockProcessor {
  private codeBlocks = new Map<string, CodeBlock>();
  private codeBlockCounter = 0;
  private currentLanguage: string = 'text';

  async processContent(content: string): Promise<string> {
    // Reset for each processing
    this.codeBlocks.clear();
    this.codeBlockCounter = 0;

    // First pass: extract and process code blocks with Shiki
    await this.preprocessCodeBlocks(content);

    // Configure marked with custom renderers
    const renderer = this.createCustomRenderer();
    
    marked.setOptions({
      renderer: renderer,
      breaks: true,
      gfm: true
    });

    // Reset counter for rendering
    this.codeBlockCounter = 0;

    return marked(content);
  }

  private async preprocessCodeBlocks(content: string): Promise<void> {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'text';
      const code = match[2];
      const id = `code-block-${this.codeBlockCounter++}`;
      
      // Store current language for the addLineNumbers function
      this.currentLanguage = language;
      
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: 'github-light'
        });
        
        // Add line numbers to the generated HTML
        const htmlWithLineNumbers = this.addLineNumbers(html);
        
        this.codeBlocks.set(id, {
          html: htmlWithLineNumbers,
          language,
          code
        });
      } catch (error) {
        // Fallback for unsupported languages
        const lines = code.split('\n');
        const numberedLines = lines.map((line, index) => {
          const lineNumber = index + 1;
          const escapedLine = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          return `<span class="line"><span class="line-number">${lineNumber}</span><span class="line-content">${escapedLine}</span></span>`;
        }).join('\n');
        
        this.codeBlocks.set(id, {
          html: `<pre class="shiki github-light"><code class="language-${language}">${numberedLines}</code></pre>`,
          language,
          code
        });
      }
    }
  }

  private addLineNumbers(html: string): string {
    // Find the code content inside the pre/code tags
    const codeMatch = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
    if (!codeMatch) return html;
    
    let codeContent = codeMatch[1];
    
    // Simply trim any trailing whitespace/newlines from the entire content
    codeContent = codeContent.replace(/\s+$/, '');
    
    // Split by actual newlines to get each line
    const lines = codeContent.split('\n');
    
    // Remove empty lines at the end more aggressively
    // This handles both completely empty strings and lines with only HTML tags/whitespace
    while (lines.length > 0) {
      const lastLine = lines[lines.length - 1];
      // Check if line is empty or contains only whitespace/empty HTML elements
      const strippedLine = lastLine.replace(/<[^>]*>/g, '').trim();
      if (strippedLine === '') {
        lines.pop();
      } else {
        break;
      }
    }
    
    // Process each line and add line numbers
    const numberedLines = lines.map((line, index) => {
      const lineNumber = index + 1;
      const lineNumberSpan = `<span class="line-number">${lineNumber}</span>`;
      
      // Wrap the line with line number, preserving the original Shiki content
      return `<span class="line">${lineNumberSpan}<span class="line-content">${line}</span></span>`;
    });
    
    // Replace the original code content with numbered lines
    const numberedCode = numberedLines.join('\n');
    return html.replace(/<code[^>]*>[\s\S]*?<\/code>/, `<code class="language-${this.currentLanguage || 'text'}">${numberedCode}</code>`);
  }

  private createCustomRenderer(): Renderer {
    const renderer = new marked.Renderer();

    // Custom renderer for code blocks
    renderer.code = (token: any) => {
      const code = token.text;
      const language = token.lang;
      const id = `code-block-${this.codeBlockCounter++}`;
      const block = this.codeBlocks.get(id);
      
      if (!block) {
        return `<div class="code-fence-container bg-gray-100 rounded-lg p-4 my-6">
          <div class="code-fence-header flex items-center justify-between pb-2">
            <span class="language-label font-semibold text-gray-700 capitalize">${language || 'text'}</span>
            <button class="fence-copy-btn cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded transition-colors" onclick="copyFenceCode(this)" title="Copy code">
              <svg class="w-4 h-4 copy-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path>
              </svg>
              <svg class="w-4 h-4 check-icon hidden text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto"><code class="language-${language || 'text'}">${code}</code></pre>
        </div>`;
      }
      
      return this.renderCodeBlock(block);
    };

    // Custom renderer for inline code
    renderer.codespan = (code) => {
      return this.renderInlineCode(code);
    };

    return renderer;
  }

  private renderCodeBlock(block: CodeBlock): string {
    return `
      <div class="code-fence-container bg-gray-100 rounded-lg p-4 my-6">
        <div class="code-fence-header flex items-center justify-between pb-2">
          <span class="language-label font-semibold text-gray-700 capitalize">${block.language}</span>
          <button class="fence-copy-btn cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded transition-colors" onclick="copyFenceCode(this)" title="Copy code">
            <svg class="w-4 h-4 copy-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path>
            </svg>
            <svg class="w-4 h-4 check-icon hidden text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="code-content rounded overflow-hidden">
          ${block.html}
        </div>
      </div>
    `;
  }

  private renderInlineCode(code: any): string {
    // Handle the case where code might be an object or other type
    let codeText = '';
    
    if (typeof code === 'string') {
      codeText = code;
    } else if (code && typeof code === 'object' && code.text) {
      codeText = code.text;
    } else if (code && typeof code === 'object' && code.raw) {
      codeText = code.raw;
    } else {
      codeText = String(code || '');
    }
    
    const escapedCode = codeText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
      
    return `<code class="inline-code bg-gray-200 text-gray-800 px-2 py-1 rounded font-mono text-sm cursor-pointer transition-all duration-200" onclick="copyInlineCode(this)" title="Click to copy">${escapedCode}</code>`;
  }
}

// Export a convenience function for one-off processing
export async function processMarkdownWithCodeBlocks(content: string): Promise<string> {
  const processor = new CodeBlockProcessor();
  return await processor.processContent(content);
} 