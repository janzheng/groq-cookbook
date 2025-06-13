export const cookbookExamples = [
  {
    id: 1,
    featured: false,
    slug: "portkey-with-groq",
    title: "Portkey with Groq",
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
    featured: false,
    slug: "website-guru",
    title: "Website Guru",
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
    featured: false,
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
    githubLink: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot",
    ipynbLink: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot/Llama-Guard-4-Ensuring-Safe-Chatbot.ipynb",
    ctas: [
      {
        icon: "mdi:github",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot",
      },
      {
        useColab: true,
        icon: "mdi:notebook",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/llama-guard-safe-chatbot/Llama-Guard-4-Ensuring-Safe-Chatbot.ipynb",
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
  },
  {
    id: 4,
    featured: false,
    slug: "parallel-tool-use",
    title: "Parallel Tool Use",
    language: "python",
    description: "Learn how to leverage parallel tool use with Groq API to build more sophisticated AI applications. This tutorial demonstrates how to enable LLMs to call multiple tools simultaneously, allowing them to gather dynamic data from external resources like APIs and databases. Discover how parallel tool calling with Llama 3.1 models can handle complex queries efficiently by executing multiple functions concurrently and combining their outputs for accurate responses.",
    markdown: `Parallel tool use is a powerful technique that allows Large Language Models (LLMs) to call multiple functions simultaneously, enabling more efficient and sophisticated AI applications. This tutorial demonstrates how to leverage parallel tool calling with Groq API using Llama 3.1 models to handle complex queries that require multiple data sources.

## What are Tools and Tool Use? 🤔

To extend the capabilities of Large Language Models (LLMs) in AI-powered applications, we can provide tools that allow them to interact with external resources like APIs, databases, and web services by:

- **Providing tools** (or predefined functions) to our LLM
- **Defining how tools should be used** to teach our LLM effective usage patterns
- **Letting the LLM autonomously decide** whether tools are needed for a user query

By providing LLMs with tools, we enable them to gather dynamic data that they wouldn't otherwise have access to in their pre-trained, static state.

## What is Parallel Tool Use? 🧰

Parallel tool use takes this concept further by enabling multiple tools to be used simultaneously. This allows for more efficient and effective responses by:

- **Calling multiple tools concurrently** instead of sequentially
- **Combining outputs from parallel tool calls** for comprehensive responses
- **Handling complex queries** that require data from multiple sources

## Groq API Support for Parallel Tool Use 💪

Tool use and parallel tool calling are supported across Groq's model lineup, with enhanced support for Llama 3.1 models that use native tool use formatting for better quality in multi-turn conversations.

**Recommended models for tool use:**
- \`meta-llama/llama-4-scout-17b-16e-instruct\`
- \`meta-llama/llama-4-maverick-17b-128e-instruct\`
- \`llama-3.3-70b-versatile\`
- \`llama-3.1-70b-versatile\`
- \`llama-3.1-8b-instant\`

## Tutorial Overview

In this tutorial, we'll build a bakery pricing system that demonstrates parallel tool use by fetching pricing information for multiple bakery items simultaneously.

### Key Learning Objectives:
- Set up tools and function definitions for Groq API
- Implement parallel tool calling for multiple data requests
- Process and combine results from concurrent tool calls
- Build responsive applications that handle complex queries efficiently

### What You'll Build:
A system that can handle queries like "What is the price for a cappuccino and croissant?" by making parallel calls to pricing functions and combining the results into a comprehensive response.

## Getting Started

The tutorial covers:

1. **Environment Setup** - Installing dependencies and configuring your Groq API key
2. **Tool Definition** - Creating functions that the LLM can invoke
3. **Parallel Execution** - Implementing concurrent tool calls
4. **Result Processing** - Combining outputs for accurate responses

### Prerequisites:
- Python environment with \`ipykernel\` and \`pip\`
- Groq API key (free at [console.groq.com](https://console.groq.com))
- Basic understanding of function calling concepts

## Why Parallel Tool Use Matters

Parallel tool use opens up possibilities for:
- **Efficient automation** with multiple data sources
- **Real-time information gathering** from various APIs
- **Complex query handling** that requires multiple calculations
- **Responsive user experiences** with faster data retrieval

This technique is fundamental for building agentic workflows and sophisticated AI applications that can handle real-world complexity through concurrent operations.

Ready to dive in? The complete implementation with code examples awaits in the interactive notebook: [Parallel Tool Use](https://github.com/groq/groq-api-cookbook/blob/main/tutorials/parallel-tool-use/parallel-tool-use.ipynb)`,
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/parallel-tool-use",
    ipynbLink: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/parallel-tool-use/parallel-tool-use.ipynb",
    ctas: [
      {
        icon: "mdi:github",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/parallel-tool-use",
      },
      {
        useColab: true,
        icon: "mdi:notebook",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/parallel-tool-use/parallel-tool-use.ipynb",
      },
    ],
    difficulty: "beginner",
    tags: ["tool use"],
    sections: ["basics"],
    date: "2025-05-27",
    authors: [{
      username: "benank",
      imageUrl: "https://avatars.githubusercontent.com/u/8016617?v=4"
    }
    ]
  },
  {
    id: 5,
    featured: true,
    slug: "audio-chunking",
    title: "Audio Chunking",
    language: "python",
    description: "Learn how to process long audio files efficiently using chunking methods with Groq API. This tutorial demonstrates how to break down audio files into manageable chunks while maintaining high transcription accuracy using Whisper Large V3, including smart overlapping chunks and seamless result merging for complete transcriptions.",
    markdown: `Processing long audio files can be challenging when working with API limits. Groq's speech endpoints support files up to 25MB, but what happens when you have longer recordings? The solution is audio chunking - breaking large files into smaller, manageable pieces.

Imagine you have a 2-hour podcast recording. Instead of being stuck at the 25MB limit, chunking lets you process any length of audio while maintaining transcription accuracy and taking advantage of Groq's fast inference speeds. Even hours of audio that we process into chunks can be transcribed in a matter of minutes thanks to Groq's lightning-fast performance.

## The Challenge: Avoiding Cut-Off Words

The tricky part isn't just splitting audio - it's doing it smartly. If you cut audio at random points, you might split words in half, creating transcription errors and missing content. Consider what happens with bad chunking:

- Chunk 1 ends: "The solution is very import..."
- Chunk 2 starts: "...ant for understanding"

This creates gaps and confusion in your final transcript. Smart chunking with overlap solves this problem:

- Chunk 1: "The solution is very important for understanding"
- Chunk 2: "important for understanding the next concept"

Notice how the overlapping section ensures we capture complete words and maintain context across boundaries.

## Our Chunking Strategy

We use **10-minute chunks with 10-second overlaps**. This configuration balances efficiency and accuracy perfectly:

\`\`\`python
# Configuration that balances efficiency and accuracy
CHUNK_LENGTH = 600  # 10 minutes
OVERLAP_DURATION = 10  # 10 seconds overlap
\`\`\`

The overlap ensures we don't lose context at boundaries, and 10 minutes gives Whisper enough context for accurate transcription. While Whisper was originally trained on 30-second segments, longer chunks actually provide better results when using Groq API because they offer more context for the model to work with.

## Step-by-Step Implementation

Let's walk through building our complete audio chunking pipeline, starting with preprocessing and working our way up to the full orchestration.

### 1. Preprocess the Audio

First, we optimize the audio for transcription. Whisper models require audio files to be 16,000 Hz mono format, and while Groq API will re-encode files automatically, preprocessing client-side can reduce file sizes significantly:

\`\`\`python
def preprocess_audio(input_file, output_file):
    audio = AudioSegment.from_file(input_file)
    # Convert to 16kHz mono (Whisper's preferred format)
    audio = audio.set_frame_rate(16000).set_channels(1)
    audio.export(output_file, format="flac")  # FLAC for lossless compression
\`\`\`

We recommend FLAC format because it provides lossless compression, making uploads faster without sacrificing quality. This preprocessing step can dramatically reduce file sizes, especially for high-quality recordings.

### 2. Split Into Overlapping Chunks

Next, we create our overlapping segments. The key here is calculating the overlap correctly so each chunk has enough context:

\`\`\`python
def create_chunks(audio_file, chunk_length=600, overlap=10):
    audio = AudioSegment.from_file(audio_file)
    chunks = []
    
    start = 0
    while start < len(audio):
        end = min(start + (chunk_length * 1000), len(audio))
        chunk = audio[start:end]
        chunks.append(chunk)
        
        # Move start position, accounting for overlap
        start = end - (overlap * 1000)
        
    return chunks
\`\`\`

This approach ensures that each chunk overlaps with the next by exactly 10 seconds, giving us the context we need to merge results seamlessly.

### 3. Transcribe Each Chunk

Now we process chunks individually with Groq. Each chunk gets transcribed using Whisper Large V3, and we specify the language for better accuracy:

\`\`\`python
def transcribe_chunk(chunk_audio):
    # Save chunk to temporary file
    with tempfile.NamedTemporaryFile(suffix=".flac", delete=False) as temp_file:
        chunk_audio.export(temp_file.name, format="flac")
        
        # Transcribe with Groq
        with open(temp_file.name, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                file=audio_file,
                model="whisper-large-v3",
                language="en",  # Specify language for better accuracy
                response_format="verbose_json"
            )
    
    return transcription
\`\`\`

We highly recommend specifying the language if you know it. Whisper analyzes the first 30 seconds of audio to determine language, but this can result in errors if your audio has background noise, music, or silence in that timeframe. Setting the language also speeds up requests since Whisper can skip the language detection step.

### 4. Handle Overlaps Intelligently

The overlapping sections need to be merged carefully to create a seamless final transcript. This is where the magic happens - we use a sophisticated algorithm that finds the best alignment between chunks:

\`\`\`python
def merge_overlapping_transcripts(transcripts):
    merged_text = transcripts[0].text
    
    for i in range(1, len(transcripts)):
        current_text = transcripts[i].text
        
        # Find the best overlap point using word matching
        overlap_point = find_best_overlap(merged_text, current_text)
        
        # Append only the non-overlapping part
        merged_text += current_text[overlap_point:]
    
    return merged_text
\`\`\`

Our merging algorithm uses a longest common sequence approach with sliding window alignment. It's designed to handle Whisper's quirks, like slight variations in how it transcribes the same words in different chunks, and can even handle partial word matches at boundaries.

## Real-World Performance

With this approach, you can transcribe hours of audio in just minutes. A 2-hour recording might be processed as 12 chunks of 10 minutes each, and when processed in parallel, you can get complete transcription in under 5 minutes. The efficiency gains are remarkable compared to trying to process the entire file at once.

## Understanding Chunk Overhead

When we use overlapping chunks, we're actually processing some audio multiple times. With our 600-second chunks and 10-second overlaps, we process 620 seconds for each 600-second chunk, creating just a 3.33% overhead. This is much more efficient than shorter chunks - for example, 60-second chunks with 5-second overlaps would have a 33.3% overhead!

This overhead matters because more overlap means more API calls, higher costs, and more potential for transcription errors at boundaries. Our 10-minute chunks with 10-second overlaps hit the sweet spot for most use cases.

## The Complete Pipeline

Putting it all together, here's how our complete transcription pipeline works:

\`\`\`python
def transcribe_long_audio(audio_file_path):
    # 1. Preprocess
    preprocessed_file = preprocess_audio(audio_file_path)
    
    # 2. Create chunks
    chunks = create_chunks(preprocessed_file)
    
    # 3. Transcribe each chunk
    transcripts = []
    for i, chunk in enumerate(chunks):
        print(f"Processing chunk {i+1}/{len(chunks)}")
        transcript = transcribe_chunk(chunk)
        transcripts.append(transcript)
    
    # 4. Merge results
    final_transcript = merge_overlapping_transcripts(transcripts)
    
    return final_transcript
\`\`\`

This chunking approach transforms an impossible transcription task into a manageable, efficient process. The pipeline handles everything from preprocessing to final output, giving you professional-quality transcriptions of any length audio file.

Ready to try it yourself? The complete implementation with detailed code examples and error handling is available in our interactive notebook, where you can experiment with different chunk sizes and overlap settings to find what works best for your specific use case.

Explore the complete implementation in our interactive notebook: [Audio Chunking](https://github.com/groq/groq-api-cookbook/blob/main/tutorials/audio-chunking/audio_chunking_tutorial.ipynb)`,
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/audio-chunking",
    ipynbLink: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/audio-chunking/audio_chunking_tutorial.ipynb",
    ctas: [
      {
        icon: "mdi:github",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/parallel-tool-use",
      },
      {
        useColab: true,
        icon: "mdi:notebook",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/audio-chunking/audio_chunking_tutorial.ipynb",
      },
    ],
    difficulty: "intermediate",
    tags: ["audio"],
    sections: ["audio"],
    date: "2025-03-16",
    authors: [{
      username: "ozenhati",
      imageUrl: "https://avatars.githubusercontent.com/u/139392640?v=4"
    }
    ]
  },
  {
    id: 6,
    featured: true,
    slug: "function-calling-sql",
    title: "Using JSON Mode and Function Calling for SQL Querying",
    language: "python",
    description: "With the rise of Large Language Models (LLMs), one of the first practical applications has been the 'chat with X' app. In this notebook we will explore methods for building 'chat with my database' tools with Groq API, exploring benefits and drawbacks of each and leveraging Groq API's JSON mode and tool use feature for function calling.",
    markdown: `With the rise of Large Language Models (LLMs), one of the first practical applications has been the "chat with X" app. In this notebook we will explore methods for building "chat with my database" tools with Groq API, exploring benefits and drawbacks of each and leveraging Groq API's JSON mode and tool use feature for function calling.

We will show two methods for using Groq API to query a database, and how leveraging tool use for function calling can improve the predictability and reliability of our outputs. We will use the DuckDB query language on local CSV files in this example, but the general framework could also work against standard data warehouse platforms like BigQuery.

## The Challenge: Reliable Database Interactions

When building "chat with your data" applications, you face a fundamental challenge: how do you ensure consistent, reliable results while maintaining the flexibility that makes LLMs so powerful? Traditional Text-to-SQL approaches can generate impressive queries on the fly, but they suffer from non-deterministic outputs that make them unsuitable for production environments.

This tutorial demonstrates two complementary approaches:
1. **Text-to-SQL**: Direct query generation for ad-hoc exploration
2. **Function Calling with Verified Queries**: Reliable, pre-tested queries for production use

## Setup and Dependencies

We'll be working with a simple employee purchase database using DuckDB, which provides an excellent SQL interface for CSV files without requiring a full database setup:

\`\`\`python
!pip install groq sqlparse duckdb

from groq import Groq
import os, json, sqlparse, duckdb, glob, yaml
from IPython.display import Markdown

client = Groq(api_key=os.getenv('GROQ_API_KEY'))
model = 'llama-3.3-70b-versatile'
\`\`\`

Our dataset consists of two CSV files:
- **employees.csv**: employee_id, name, email
- **purchases.csv**: purchase_id, purchase_date, employee_id, amount, product_name

## Method 1: Text-to-SQL with JSON Mode

Text-to-SQL lets the LLM generate queries dynamically based on natural language questions. We'll use Groq's JSON mode to ensure structured output:

\`\`\`python
system_prompt = '''
You are Groq Advisor, tasked with generating SQL queries for DuckDB based on user questions about data stored in two tables derived from CSV files:

Table: employees.csv
Columns:
- employee_id (INTEGER): A unique identifier for each employee
- name (VARCHAR): The full name of the employee  
- email (VARCHAR): employee's email address

Table: purchases.csv
Columns:
- purchase_id (INTEGER): A unique identifier for each purchase
- purchase_date (DATE): Date of purchase
- employee_id (INTEGER): References the employee_id from the employees table
- amount (FLOAT): The monetary value of the purchase
- product_name (STRING): The name of the product purchased

DuckDB Tips:
* Query from .csv files directly: SELECT * FROM employees.csv as employees
* All tables referenced MUST be aliased
* Use CURRENT_DATE for today's date
* Aggregated fields like COUNT(*) must be appropriately named

Dataset Rules:
* Never include employee_id in output - show employee name instead
* Valid product_name values: 'Tesla', 'iPhone', 'Humane pin'

Question: {user_question}

Respond as valid JSON:
* If answerable: {"sql": <sql here>}
* If not answerable: {"error": <explanation here>}
* Keep output on single line, use simple queries without subqueries
'''

def text_to_sql(client, system_prompt, user_question, model):
    completion = client.chat.completions.create(
        model=model,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_question}
        ]
    )
    return completion.choices[0].message.content
\`\`\`

### The Non-Determinism Problem

While Text-to-SQL can generate impressive results, it suffers from inconsistency:

\`\`\`python
user_question = 'What are the most recent purchases?'
llm_response = text_to_sql(client, system_prompt, user_question, model)
sql_json = json.loads(llm_response)
parsed_sql = sqlparse.format(sql_json['sql'], reindent=True, keyword_case='upper')

# Execute the query
execute_duckdb_query(parsed_sql)
\`\`\`

The same question might generate different queries each time:
- Different field selections
- Varying LIMIT clauses  
- Different interpretations of "recent"

This non-determinism makes Text-to-SQL unsuitable for production environments where consistency is critical.

## Method 2: Function Calling with Verified Queries

A more reliable approach uses pre-vetted queries that the LLM selects based on the user's question. This combines LLM intelligence with production reliability:

\`\`\`python
# Load verified queries from YAML files
def get_verified_queries(directory_path):
    verified_queries_dict = {}
    yaml_files = glob.glob(os.path.join(directory_path, '*.yaml'))
    
    for file in yaml_files:
        with open(file, 'r') as stream:
            file_name = file[len(directory_path):-5]
            verified_queries_dict[file_name] = yaml.safe_load(stream)
    
    return verified_queries_dict

verified_queries_dict = get_verified_queries('verified-queries/')
\`\`\`

Each verified query includes metadata for LLM selection:

\`\`\`yaml
# most-recent-purchases.yaml
description: "Five most recent purchases"
sql: |
  SELECT purchases.purchase_date,
         purchases.product_name,
         purchases.amount,
         employees.name
  FROM purchases.csv AS purchases
  JOIN employees.csv AS employees ON purchases.employee_id = employees.employee_id
  ORDER BY purchases.purchase_date DESC
  LIMIT 5;
\`\`\`

### Implementing Function Calling

The LLM uses tool calling to select and execute the appropriate verified query:

\`\`\`python
def call_verified_sql(user_question, verified_queries_dict, model):
    # Extract query descriptions for LLM selection
    query_descriptions = {key: subdict['description'] 
                         for key, subdict in verified_queries_dict.items()}
    
    messages = [
        {
            "role": "system",
            "content": f'''You are a function calling LLM that uses verified DuckDB queries to answer questions.
            
            Select the query whose description best matches the user's question from:
            {query_descriptions}'''
        },
        {"role": "user", "content": user_question}
    ]
    
    tools = [{
        "type": "function",
        "function": {
            "name": "execute_duckdb_query_function_calling",
            "description": "Executes a verified DuckDB SQL Query",
            "parameters": {
                "type": "object",
                "properties": {
                    "query_name": {
                        "type": "string",
                        "description": "The name of the verified query"
                    }
                },
                "required": ["query_name"]
            }
        }
    }]
    
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )
    
    # Execute the selected query
    tool_call = response.choices[0].message.tool_calls[0]
    function_args = json.loads(tool_call.function.arguments)
    query_name = function_args.get("query_name")
    
    return execute_verified_query(query_name, verified_queries_dict)
\`\`\`

### Consistent, Reliable Results

With verified queries, the same question always produces the same result:

\`\`\`python
user_prompt = 'What were the most recent purchases?'
result = call_verified_sql(user_prompt, verified_queries_dict, model)
# Always returns the same 5 most recent purchases with consistent formatting
\`\`\`

## Advanced: Parameterized Queries

You can extend this approach by adding parameters to verified queries:

\`\`\`yaml
# employee-purchases.yaml
description: "Purchases by specific employee"
sql: |
  SELECT purchase_date, product_name, amount
  FROM purchases.csv AS p
  JOIN employees.csv AS e ON p.employee_id = e.employee_id
  WHERE e.name = ?
  ORDER BY purchase_date DESC
parameters:
  - name: employee_name
    type: string
    description: "Name of the employee"
\`\`\`

The LLM can then extract parameters from natural language and inject them into verified queries, combining flexibility with reliability.

## Best Practices for Production

1. **Start with Verified Queries**: Build a core set of business-critical queries that are thoroughly tested
2. **Use Text-to-SQL for Exploration**: Allow ad-hoc queries for data exploration and discovery
3. **Promote Successful Queries**: When Text-to-SQL generates good results, add them to your verified query library
4. **Implement Fallbacks**: If no verified query matches, fall back to Text-to-SQL with appropriate warnings
5. **Monitor and Validate**: Log all queries and results for continuous improvement

## Conclusion

Both approaches have their place in a comprehensive "chat with your data" solution:

- **Text-to-SQL** excels at ad-hoc exploration and discovering new insights
- **Verified Queries with Function Calling** provides the reliability needed for production applications

The most effective systems combine both approaches, using verified queries for common business questions while allowing Text-to-SQL for exploration. This hybrid approach gives you the best of both worlds: the reliability of traditional BI tools with the flexibility and natural language interface that makes LLMs so powerful.

By following good data governance practices and gradually building your library of verified queries, you can create a robust, reliable system that truly democratizes data access in your organization.`,
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/function-calling-sql",
    ipynbLink: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/function-calling-sql/json-mode-function-calling-for-sql.ipynb",
    ctas: [
      {
        icon: "mdi:github",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/function-calling-sql",
      },
      {
        useColab: true,
        icon: "mdi:notebook",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/function-calling-sql/json-mode-function-calling-for-sql.ipynb",
      },
    ],
    difficulty: "intermediate",
    tags: ["SQL"],
    sections: ["SQL"],
    date: "2024-08-26",
    authors: [{
      username: "ozenhati",
      imageUrl: "https://avatars.githubusercontent.com/u/139392640?v=4"
    }
    ]
  },
  {
    id: 7,
    featured: true,
    slug: "mixture-of-agents",
    title: "Mixture of Agents Powered by Groq using Langchain LCEL",
    language: "python",
    description: "Mixture of Agents (MoA) combines multiple AI models to produce more robust responses than single-model approaches. This tutorial demonstrates implementing MoA architecture using Langchain and Groq, where multiple open source models collaborate to achieve performance on par with proprietary models like GPT-4.",
    markdown: `This notebook demonstrates the implementation of a Mixture of Agents (MoA) architecture using Langchain and Groq. The MoA approach combines multiple open source models to produce responses that are on par or better than SOTA proprietary models like GPT-4.

## What You'll Learn

This tutorial will walk you through how to:

1. Set up the environment and dependencies
2. Create helper functions for agent configuration
3. Configure and build the Mixture of Agents pipeline
4. Chat with the Agent system
5. (Optional) Add observability with Arize Phoenix

## The MoA Architecture

The Mixture of Agents approach works by having multiple specialized agents work together in layers:

- **Layer Agents**: Multiple models that process the same input in parallel, each bringing their unique strengths
- **Aggregation**: Responses from layer agents are combined and formatted
- **Main Agent**: A final agent that synthesizes all the layer responses into a coherent final answer

This creates a system where the collective intelligence of multiple models produces better results than any single model alone.

## Key Benefits

1. **Enhanced Accuracy**: Multiple models can catch errors and provide different perspectives
2. **Cost-Effective**: Uses smaller, open-source models that together match larger proprietary models
3. **Specialization**: Different agents can be optimized for different aspects of the task
4. **Reliability**: Reduces the impact of any single model's weaknesses

## Implementation Overview

The implementation uses Langchain's LCEL (LangChain Expression Language) to create a pipeline where:

1. **LAYER_AGENT**: Multiple agents run in parallel, each with specialized system prompts
2. **CYCLES**: The input can be processed multiple times through the layer agents for refinement
3. **MAIN_AGENT**: A final agent that produces the user-facing response

### Example Agent Configuration

\`\`\`python
LAYER_AGENT = {
    'planner_agent': create_agent(
        system_prompt="You are an expert planner agent. Break down and plan out how you can answer the user's question",
        model_name='llama-3.3-70b-versatile'
    ),
    'reasoning_agent': create_agent(
        system_prompt="Respond with a thought and then your response to the question",
        model_name='meta-llama/llama-4-scout-17b-16e-instruct'
    ),
    'step_by_step_agent': create_agent(
        system_prompt="Think through your response step by step",
        model_name='gemma2-9b-it'
    )
}
\`\`\`

## Getting Started

You'll need a free Groq API key from [console.groq.com](https://console.groq.com/) to follow along with this tutorial.

The notebook includes:
- Complete setup instructions
- Helper functions for creating agents
- Pipeline configuration
- Interactive chat interface
- Optional observability with Phoenix tracing

## Production Considerations

While this implementation demonstrates the core concepts, production systems should consider:

1. **Error Handling**: Robust error handling for model failures
2. **Rate Limiting**: Managing API rate limits across multiple models
3. **Caching**: Caching responses to reduce costs and latency
4. **Evaluation**: Systematic evaluation of agent performance
5. **Monitoring**: Comprehensive logging and monitoring

## Research Foundation

This implementation is based on the research paper "Mixture-of-Agents Enhances Large Language Model Capabilities" by Wang et al. (2024), which demonstrates that MoA can significantly improve performance across various benchmarks.

The approach shows that by leveraging the collective strengths of multiple models, we can achieve better results while maintaining cost efficiency through the use of smaller, specialized models.`,
    githubLink: "https://github.com/groq/groq-api-cookbook/tree/main/tutorials/function-calling-sql",
    ipynbLink: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/function-calling-sql/json-mode-function-calling-for-sql.ipynb",
    ctas: [
      {
        icon: "mdi:github",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/function-calling-sql",
      },
      {
        useColab: true,
        icon: "mdi:notebook",
        href: "https://github.com/groq/groq-api-cookbook/blob/main/tutorials/function-calling-sql/json-mode-function-calling-for-sql.ipynb",
      },
    ],
    difficulty: "intermediate",
    tags: ["SQL"],
    sections: ["SQL"],
    date: "2024-08-26",
    authors: [
      {
        username: "ozenhati",
        imageUrl: "https://avatars.githubusercontent.com/u/139392640?v=4"
      },
      {
        username: "jgilhuly",
        imageUrl: "https://avatars.githubusercontent.com/u/8853560?v=4"
      },
      {
        username: "benank",
        imageUrl: "https://avatars.githubusercontent.com/u/8016617?v=4"
      }
    ]
  },
]






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
