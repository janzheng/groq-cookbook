const cookbookExamples = [
  {
    id: 1,
    featured: true,
    slug: "portkey-with-groq",
    title: "Portkey with Groq",
    language: "python",
    description: "Portkey is the Control Panel for AI apps, offering an AI Gateway and Observability Suite that enables teams to build reliable, cost-efficient, and fast applications. This guide will walk you through integrating Portkey with Groq, allowing you to leverage Groq's powerful LLMs through Portkey's unified API and advanced features.",
    readmeSource: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/Portkey-with-Groq/Readme.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/Portkey-with-Groq",
    tags: ["intermediate", "integration", "gateway", "observability"],
    sections: ["integration", "monitoring"],
    date: "2024-01-15",
    author: {
      username: "groq-team",
      imageUrl: "https://i.pinimg.com/736x/58/5e/55/585e554da2fac77facf8ea54d6ef70f6.jpg"
    }
  },
  {
    id: 2,
    featured: true,
    slug: "website-guru",
    title: "Website Guru",
    language: "python",
    description: "Website Guru is a Streamlit application that allows you to interact with and ask questions about a given website using Large Language Models (LLMs). The app uses a combination of document loading, text splitting, vector storage, and retrieval chains to generate accurate responses based on the content of the specified website.",
    readmeSource: "https://github.com/groq/groq-api-cookbook/blob/main/chat_with_website/README.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/chat_with_website",
    tags: ["intermediate", "chat", "streamlit", "website", "rag"],
    sections: ["streaming", "retrieval"],
    date: "2024-01-20",
    author: {
      username: "dev-advocate",
      imageUrl: "https://i.pinimg.com/736x/58/5e/55/585e554da2fac77facf8ea54d6ef70f6.jpg"
    }
  },
  {
    id: 3,
    slug: "function-calling-tutorial",
    title: "Function Calling with Groq",
    language: "python",
    description: "Master function calling capabilities with Groq API. Learn how to define functions, handle responses, and build interactive AI applications.",
    readmeSource: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/function-calling/README.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/function-calling",
    liveLink: "https://groq-functions-demo.vercel.app",
    tags: ["advanced", "functions", "api"],
    sections: ["streaming", "functions"],
    date: "2024-01-25",
    author: {
      username: "ai-engineer",
      imageUrl: "https://i.pinimg.com/736x/58/5e/55/585e554da2fac77facf8ea54d6ef70f6.jpg"
    }
  },
  {
    id: 4,
    slug: "authentication-guide",
    title: "Authentication & Security Best Practices",
    language: "python",
    description: "Comprehensive guide to securely authenticate with Groq API, manage API keys, and implement proper security measures in production applications.",
    readmeSource: "https://github.com/groq/groq-api-cookbook/blob/main/guides/authentication/README.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/guides/authentication",
    tags: ["beginner", "security", "setup"],
    sections: ["authentication", "security"],
    date: "2024-01-10",
    author: {
      username: "security-expert",
      imageUrl: "https://i.pinimg.com/736x/58/5e/55/585e554da2fac77facf8ea54d6ef70f6.jpg"
    }
  },
  {
    id: 5,
    slug: "real-time-chat-app",
    title: "Building Real-time Chat Applications",
    language: "python",
    description: "Create responsive chat applications with real-time streaming, message history, and user management using Groq's streaming capabilities.",
    readmeSource: "https://github.com/groq/groq-api-cookbook/blob/main/examples/chat-app/README.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/examples/chat-app",
    liveLink: "https://groq-realtime-chat.vercel.app",
    tags: ["intermediate", "chat", "realtime"],
    sections: ["streaming", "websockets"],
    date: "2024-02-01",
    author: {
      username: "frontend-dev",
      imageUrl: "https://i.pinimg.com/736x/58/5e/55/585e554da2fac77facf8ea54d6ef70f6.jpg"
    }
  },
  {
    id: 6,
    slug: "model-comparison-tool",
    title: "Model Performance Comparison",
    language: "typescript",
    description: "Compare different Groq models side-by-side, analyze performance metrics, and choose the best model for your specific use case.",
    readmeSource: "https://github.com/groq/groq-api-cookbook/blob/main/tools/model-comparison/README.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/tools/model-comparison",
    liveLink: "https://groq-model-compare.vercel.app",
    tags: ["advanced", "models", "analysis"],
    sections: ["models", "benchmarking"],
    date: "2024-02-05",
    author: {
      username: "ml-researcher",
      imageUrl: "https://i.pinimg.com/736x/58/5e/55/585e554da2fac77facf8ea54d6ef70f6.jpg"
    }
  }
];


export const prerender = false; // don't prerender astro

import type { APIRoute } from "astro";
export const GET: APIRoute = async ({ params, request, url }) => {
  const jsonUrl = url.searchParams.get('url');
  
  // If no URL parameter is provided, return the default examples
  if (!jsonUrl) {
    return new Response(JSON.stringify(cookbookExamples), {
      headers: { "Content-Type": "application/json" },
    });
  }
  
  // Convert GitHub URL to raw content URL if it's a GitHub URL
  const rawUrl = jsonUrl.includes('github.com') 
    ? jsonUrl
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/')
    : jsonUrl;

  const response = await fetch(rawUrl);

  if (!response.ok) {
    return new Response('Failed to fetch file', { status: response.status });
  }

  const content = await response.text();

  return new Response(content, {
    headers: { "Content-Type": "application/json" },
  });
};