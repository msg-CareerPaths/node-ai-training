# 4.0 Agents Orchestration 

**Goal:** We are going to improve our `chat` functionality to orchestrate the various implementations we have done over the previous chapters.

## Mandatory Materials

**Videos**

- [LangGraph Course](https://academy.langchain.com/courses/take/quickstart-langgraph-essentials-typescript/lessons/69449731-introduction) (you are going to need an account)

**Reading**

- [LangGraph: QuickStart](https://docs.langchain.com/oss/javascript/langgraph/quickstart)
- [LangGraph: Thinking in LangGraph](https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph)

## Online Shop

>
> Install [LangGraph](https://docs.langchain.com/oss/javascript/langgraph/install) in your `backend`
> 
> Create a state graph where the following `nodes` are available: 
> 
> - Health (to check your LLM connection is working)
> - Generate Product (to generate a product in your chat)
> - Report Context (when the user is asking data about a specific report, you will use the RAG implementation here)
> - Normal Chat
> 
> Create a router node, which based on the user input will decide on which `node` to follow with its functionality (e.g.: Health if asked "Is my LLM connection working?")
> 
> Integrate all of this in your `chat` functionality.
> 
> Test everything works.
> 