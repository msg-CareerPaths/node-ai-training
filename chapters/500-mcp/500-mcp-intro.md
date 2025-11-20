# 5.0 MCP Intro

**Goal:** Building an MCP for your server application.

## Mandatory Materials

**Videos**

- [MCP Server in NestJS](https://www.youtube.com/watch?v=kqS5i6U-kHk)

**Reading**
- Theory
  - [MCP: intro](https://modelcontextprotocol.io/docs/getting-started/intro) 
  - [Antrophic: What is MCP](https://www.anthropic.com/news/model-context-protocol)
- Implementations Libraries:
  - Nest.js: [MCP Nest](https://github.com/rekog-labs/MCP-Nest)
  - TypeScript Generic: https://github.com/modelcontextprotocol/typescript-sdk
- Code Samples
  - [Pizza OpenAI](https://github.com/rinormaloku/MCP-Nest-Samples/tree/main/pizzaz-openai-apps-sdk) 
- App to test locally
  - [Anything LLM](https://anythingllm.com/) 
  - [Anything LLM: MCP Integration](https://docs.anythingllm.com/mcp-compatibility/overview)
  - [Anything LLM: MCP Integration on Desktop](https://docs.anythingllm.com/mcp-compatibility/desktop)

## Online Shop

>
> Install [MCP Nest](https://github.com/rekog-labs/MCP-Nest) and create an MCP which duplicates your REST API (for `products`, `orders`, `carts` and `q&a` features).
> 
> Do not add authentication mechanism to this. Add the `userId` as an additional parameter for your MCP, since this is intended for local and dev use, it is okay.
> 
> Test your MCP via any LLM Chat you are using (AnythingLLM, ChatGPT, Copilot, etc.) on your **local** machine. (you cannot use an internet version since it cannot connect to your local laptop)
> 