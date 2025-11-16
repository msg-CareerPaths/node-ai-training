# 1.1 Prompt Integration

**Goal:** Integrate some basic prompting into the existing application.

## Mandatory Materials

**Videos**
- [Output Parsers (11:27)](https://youtu.be/vvZ4cyxl99Q?list=PL4HikwTaYE0EG379sViZZ6QsFMjJ5Lfwj&t=688) (note the API is different from official docs)

**Reading**
- [LangChain Structured Output: Zod](https://docs.langchain.com/oss/javascript/langchain/structured-output)
- [Structured Data with Zod and LangChain](https://www.wisp.blog/blog/how-to-use-zod-to-get-structured-data-with-langchain)
- [AWS Bedrock Models and Capabilities](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
- [Langchain: Messages](https://docs.langchain.com/oss/javascript/langchain/messages#basic-usage)
- [Zod](https://zod.dev/)

## Online Shop

>
> In the creation product flow on the LLM Shop `frontend`, there is a button to generate a new Product, currently unimplemented.
> 
> You are going to implement it to allow you to quickly generate new products with reasonable data for your shop.
> 
> Create a new `GET` endpoint under the `backend` called `/api/llm/products/generate`.
> 
> Call the LLM model to give you a `structured` output based on an `Zod` Entity schema for a Product, which you are going to create.
>

## Further Resources (Optional):

- [Structured Data Response with AWS Bedrock SDK](https://aws.amazon.com/blogs/machine-learning/structured-data-response-with-amazon-bedrock-prompt-engineering-and-tool-use/)
- 