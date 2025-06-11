// usage: 
// http://localhost:4321/api/gh?url=https://github.com/groq/groq-api-cookbook/blob/main/README.md

export const prerender = false; // don't prerender astro

import type { APIRoute } from "astro";

function convertToRawUrls(githubUrl: string): string[] {
  const urls: string[] = [];
  
  // Method 1: refs/heads/ format (newer GitHub format)
  const refsHeadsUrl = githubUrl
    .replace('github.com', 'raw.githubusercontent.com')
    .replace('/blob/', '/refs/heads/')
    .replace('/tree/', '/refs/heads/');
  urls.push(refsHeadsUrl);
  
  // Method 2: direct branch format (older GitHub format)
  const directUrl = githubUrl
    .replace('github.com', 'raw.githubusercontent.com')
    .replace('/blob/', '/')
    .replace('/tree/', '/');
  urls.push(directUrl);
  
  // Method 3: handle edge case where URL might already be partially converted
  if (githubUrl.includes('raw.githubusercontent.com')) {
    urls.push(githubUrl);
  }
  
  return urls;
}

export const GET: APIRoute = async ({ params, request, url }) => {
  const githubUrl = url.searchParams.get('url');
  
  if (!githubUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }
  
  const possibleUrls = convertToRawUrls(githubUrl);
  
  // Try each URL format until one works
  for (const rawUrl of possibleUrls) {
    try {
      const response = await fetch(rawUrl);
      
      if (response.ok) {
        const content = await response.text();
        console.log(`Success with URL: ${rawUrl}`);
        return new Response(content, {
          headers: { "Content-Type": "text/plain" },
        });
      } else {
        console.log(`Failed with URL: ${rawUrl} (status: ${response.status})`);
      }
    } catch (error) {
      console.log(`Error with URL: ${rawUrl}`, error);
    }
  }
  
  // If all attempts failed
  return new Response(
    `Failed to fetch file from GitHub. Tried the following URLs:\n${possibleUrls.join('\n')}`, 
    { status: 404 }
  );
};