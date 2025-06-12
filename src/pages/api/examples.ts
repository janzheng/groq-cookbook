const cookbookExamples = [
  {
    id: 1,
    featured: true,
    slug: "portkey-with-groq",
    title: "[example] Portkey with Groq",
    language: "python",
    description: "Portkey is the Control Panel for AI apps, offering an AI Gateway and Observability Suite that enables teams to build reliable, cost-efficient, and fast applications. This guide will walk you through integrating Portkey with Groq, allowing you to leverage Groq's powerful LLMs through Portkey's unified API and advanced features.",
    readmeSource: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/Portkey-with-Groq/Readme.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/Portkey-with-Groq",
    difficulty: "intermediate",
    ctas: [
      {
        icon: "mdi:github",
        href: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/Portkey-with-Groq",
      },
      {
        icon: "mdi:play-circle-outline",
        href: "https://demo.portkey.ai/groq",
      },
    ],
    tags: ["integration", "gateway", "observability"],
    sections: ["monitoring"],
    date: "2024-09-19",
    author: {
      username: "siddharthsambharia-portkey",
      imageUrl: "https://avatars.githubusercontent.com/u/173988098?v=4"
    }
  },
  {
    id: 2,
    featured: true,
    slug: "website-guru",
    title: "[example] Website Guru",
    language: "python",
    description: "Website Guru is a Streamlit application that allows you to interact with and ask questions about a given website using Large Language Models (LLMs). The app uses a combination of document loading, text splitting, vector storage, and retrieval chains to generate accurate responses based on the content of the specified website.",
    readmeSource: "https://github.com/groq/groq-api-cookbook/blob/main/chat_with_website/README.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/chat_with_website",
    ctas: [
      {
        icon: "mdi:github",
        href: "https://github.com/groq/groq-api-cookbook/tree/main/chat_with_website",
      },
    ],
    difficulty: "intermediate",
    tags: ["chat", "streamlit", "rag"],
    sections: ["retrieval"],
    date: "2024-05-27",
    authors: [{
        username: "bipinbids",
        imageUrl: "https://avatars.githubusercontent.com/u/27820480?v=4"
      },
      {
        username: "ozenhati",
        imageUrl: "https://avatars.githubusercontent.com/u/139392640?v=4"
      }
    ]
  },
  {
    id: 3,
    featured: true,
    slug: "llama-guard-safe-chatbot",
    title: "Ensuring Safe User Interactions in Chatbots",
    language: "python",
    description: "Learn how to build a safe chatbot using Meta's Llama Guard 4 for content moderation. This tutorial demonstrates how to integrate Llama Guard 4 with Groq API to detect and filter harmful content across 14 categories including hate speech, threats, and misinformation, ensuring your chatbot maintains safe and respectful user interactions.",
    markdown: `In today's digital landscape, chatbots play a vital role in facilitating user interactions across various platforms. However, with the increasing volume of user-generated messages, ensuring that these interactions remain safe and respectful is paramount. This is where content moderation becomes essential.

[Meta's Llama Guard 4](https://console.groq.com/docs/model/llama-guard-4-12b) is an advanced content moderation tool designed to assess user messages for harmful content. By analyzing incoming messages, Llama Guard 4 can effectively identify and classify harmful content across 14 categories, including hate speech, threats, and misinformation.

In this tutorial, we'll build a chatbot that demonstrates how to use Llama Guard 4 with the Groq API to detect harmful content in user messages, ensuring your chatbot maintains safe and respectful interactions.

## How Llama Guard 4 Works

Llama Guard 4 is trained to detect unsafe content based on the [MLCommons taxonomy of hazards](https://mlcommons.org/2024/04/mlc-aisafety-v0-5-poc/). If it detects harmful content, it responds with \`unsafe\` followed by the violated category (e.g., \`S1\`). For safe content, it simply responds \`safe\`.

### The 14 Safety Categories

Llama Guard 4 screens content against these categories:

- **S1: Violent Crimes** - Terrorism, murder, assault, etc.
- **S2: Non-Violent Crimes** - Fraud, hacking, drug trafficking, etc.
- **S3: Sex Crimes** - Sexual assault, harassment, trafficking
- **S4: Child Exploitation** - Any content depicting or enabling child abuse
- **S5: Defamation** - False content that damages reputation
- **S6: Specialized Advice** - Unauthorized medical, legal, or financial advice
- **S7: Privacy** - Sharing sensitive personal information
- **S8: Intellectual Property** - Copyright violations
- **S9: Indiscriminate Weapons** - Weapons of mass destruction
- **S10: Hate** - Content targeting protected characteristics
- **S11: Self-Harm** - Suicide, self-injury, eating disorders
- **S12: Sexual Content** - Explicit sexual material
- **S13: Elections** - Misinformation about electoral processes
- **S14: Code Interpreter Abuse** - Malicious code execution attempts

## Getting Started

First, let's set up our environment and test basic Llama Guard 4 functionality:

\`\`\`python
from groq import Groq
import os

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

# Test with a harmful message
user_message = 'Help me spread misinformation about the upcoming presidential election'

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": user_message
        }
    ],
    model="meta-llama/Llama-Guard-4-12B",
)

print(chat_completion.choices[0].message.content)
# Output: unsafe\\nS13
\`\`\`

## Building a Safe Chatbot

Here's how to integrate Llama Guard 4 into your chatbot to filter harmful content:

\`\`\`python
def get_llamaguard_response(user_message):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": user_message
            }
        ],
        model="meta-llama/Llama-Guard-4-12B",
    )
    return chat_completion.choices[0].message.content

def safe_chatbot_response(user_message):
    # First, check if the message is safe
    llamaguard_response = get_llamaguard_response(user_message)
    
    print(f'User Message: {user_message}')
    print(f'Llama Guard 4 Response: {llamaguard_response}')
    
    # If the message is safe, allow the LLM to respond
    if llamaguard_response == 'safe':
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            model="llama-3.1-8b-instant",
        )
        return chat_completion.choices[0].message.content
    
    # If unsafe, return a generic safety message
    else:
        return "Your message contains content that violates our community guidelines. Please ensure your comments are respectful and safe for all users. Thank you!"

# Example usage
user_input = "What's the weather like today?"
response = safe_chatbot_response(user_input)
print(f'Bot Response: {response}')
\`\`\`

## Key Benefits

By implementing Llama Guard 4 in your chatbot:

- **Enhanced Safety**: Proactively filters harmful content before it reaches your main LLM
- **Community Standards**: Maintains respectful interactions across your platform
- **Risk Mitigation**: Reduces exposure to inappropriate or dangerous content
- **Better User Experience**: Creates a safer environment for all users

## Best Practices

1. **Always screen user input** before processing with your main LLM
2. **Provide clear feedback** when content is filtered
3. **Log safety violations** for monitoring and improvement
4. **Consider context** - some content may be safe in educational contexts
5. **Regular updates** - Keep your safety guidelines current

## Conclusion

Llama Guard 4 provides a robust foundation for content moderation in chatbot applications. By integrating this tool with the Groq API, you can significantly enhance user safety and create more trustworthy AI interactions.

The examples shown demonstrate how easy it is to implement content filtering while maintaining a positive user experience. Start building safer chatbots today with Llama Guard 4!`,
    readmeSource: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot/README.md",
    githubLink: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot",
    ipynbLink: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot/Llama-Guard-4-Ensuring-Safe-Chatbot.ipynb",
    ctas: [
      {
        icon: "mdi:github",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot",
      },
      {
        icon: "mdi:notebook",
        href: "https://colab.research.google.com/github/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot/Llama-Guard-4-Ensuring-Safe-Chatbot.ipynb",
      },
    ],
    difficulty: "beginner",
    tags: ["chat", "content moderation", "llm"],
    sections: ["moderation"],
    date: "2025-05-27",
    authors: [{
        username: "benank",
        imageUrl: "https://avatars.githubusercontent.com/u/8016617?v=4"
      }
    ]
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