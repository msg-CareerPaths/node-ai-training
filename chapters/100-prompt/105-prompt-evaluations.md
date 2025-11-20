# 1.5 Prompt Evaluations

**Goal:** Evaluate the results and qualities of your prompts

There are several ways to follow this chapter (with some advantages and disadvantage being self-evident):
1. By using LangSmith, a proprietary software provided by the LangChain team for such evaluations and observability.
2. By using an open source library (e.g.: [PromptFoo](https://www.promptfoo.dev/docs/intro/)), and creating by yourself the testing scripts and managing the datasets.

## Reading Materials

**Videos**

- [LangSmith Tutorial](https://youtu.be/tFXm5ijih98)
- [PromptFoo Tutorial](https://youtu.be/7Z6_7XkXwj0) 
- [LangSmith Essentials](https://academy.langchain.com/courses/quickstart-langsmith-essentials) (you will need an account)

**Reading**
- LangSmith
  - [LangSmith: Quick Start](https://docs.langchain.com/langsmith/evaluation-quickstart#evaluation-quickstart)
  - [LangSmith: DataSet Creation](https://docs.langchain.com/langsmith/manage-datasets-in-application)
  - [LangSmith: Running Evaluations](https://docs.langchain.com/langsmith/run-evaluation-from-prompt-playground)
- PromptFoo
  - [PromptFoo: Installation](https://www.promptfoo.dev/docs/installation/)
  - [PromptFoo: Getting Started](https://www.promptfoo.dev/docs/getting-started/)

**Notes**
- If using PromptFoo, create a new sub folder under the `app/evaluations/`.
- If using LangSmith, evaluate inside their provided UI for the moment and show them to your mentor. (or you can add them as programmatic files)

## Online Shop

>
> Evaluate the quality of some of your prompts by creating some basic tests.
> 

## Further Resources (Optional):

- [LangFuse](https://langfuse.com/)
- [OpenAI Eval](https://platform.openai.com/docs/guides/evals?api-mode=responses)