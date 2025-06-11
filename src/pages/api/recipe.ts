export const prerender = false;

import type { APIRoute } from "astro";

// Configuration for README preprocessing
const REMOVE_FIRST_HEADER_SECTION = true; // Set to false to keep first header section

/**
 * Preprocesses README content by:
 * 1. Adding leading "/" to image references (images/groq-logo.png -> /images/groq-logo.png)
 * 2. Optionally removing the first header section
 */
function preprocessReadme(content: string, removeFirstHeader: boolean = REMOVE_FIRST_HEADER_SECTION): string {
  let processed = content;
  
  // Fix image references - add leading "/" to images/ paths
  processed = processed.replace(/(?<!\/)images\//g, '/images/');
  
  // Optionally remove first header section
  if (removeFirstHeader) {
    // Find the first # header and everything up to the next header (# or ##, etc.)
    const firstHeaderMatch = processed.match(/^#\s+.*$/m);
    if (firstHeaderMatch) {
      const firstHeaderIndex = firstHeaderMatch.index!;
      
      // Find the next header after the first one
      const remainingContent = processed.slice(firstHeaderIndex);
      const nextHeaderMatch = remainingContent.match(/\n(#{1,6}\s+.*$)/m);
      
      if (nextHeaderMatch) {
        // Remove everything from start to the next header
        const nextHeaderIndex = firstHeaderIndex + nextHeaderMatch.index!;
        processed = processed.slice(nextHeaderIndex + 1); // +1 to skip the newline
      } else {
        // If no next header found, remove everything (entire content was first header section)
        processed = '';
      }
    }
  }
  
  return processed;
}

export const GET: APIRoute = async ({ params, request, url }) => {
  const slug = url.searchParams.get('slug');
  const removeFirstHeader = url.searchParams.get('removeFirstHeader') !== 'false'; // Default to true
  
  console.log('Example API called with slug:', slug);
  
  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 });
  }
  
  // Fetch examples from the /api/examples endpoint
  let examples;
  try {
    const examplesResponse = await fetch(`${url.origin}/api/examples`);
    if (!examplesResponse.ok) {
      throw new Error('Failed to fetch examples');
    }
    examples = await examplesResponse.json();
  } catch (error) {
    console.error('Failed to fetch examples:', error);
    return new Response('Failed to load examples', { status: 500 });
  }
  
  // Find the example by slug
  const example = examples.find((ex: any) => ex.slug === slug);
  
  if (!example) {
    return new Response('Example not found', { status: 404 });
  }
  
  // Fetch the README content using the /api/gh endpoint
  let readmeContent = '';
  if (example.readmeSource) {
    try {
      const ghResponse = await fetch(`${url.origin}/api/gh?url=${encodeURIComponent(example.readmeSource)}`);
      if (ghResponse.ok) {
        const rawContent = await ghResponse.text();
        // Preprocess the README content
        readmeContent = preprocessReadme(rawContent, removeFirstHeader);
      }
    } catch (error) {
      console.error('Failed to fetch README content:', error);
    }
  }
  
  // Return the example data with README content
  const result = {
    ...example,
    readmeContent
  };
  
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};
