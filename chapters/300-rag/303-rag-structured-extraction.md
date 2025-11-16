# 3.3 RAG: Structured Extraction

**Goal:** Extracting the data from your vector store and integrating in your chat.

## Mandatory Materials


**Reading**

- AWS Embedding Models
    - [LangChain: Bedrock Embeddings](https://docs.langchain.com/oss/javascript/integrations/text_embedding/bedrock)
- PGVector
    - [LangChain: TypeORM PGVector](https://docs.langchain.com/oss/javascript/integrations/vectorstores/typeorm)
    - [LangChain: PGVector Store](https://docs.langchain.com/oss/javascript/integrations/vectorstores/pgvector)
- AWS Specific (note: you will likely not yet have LangChain support):
    - [S3 Vectors Store](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html)
    - [AWS S3 Vectors JS SDK: DOCS](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3vectors/)
    - [AWS S3 Vectors JS SDK: NPM](https://www.npmjs.com/package/@aws-sdk/client-s3vectors)
    - [AWS: S3Vector Query](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3vectors/command/QueryVectorsCommand/)
  
## Online shop

>
> When the user communicate via the `chat` functionality, embed the user message using the embedding model used in your previous chapter
> 
> Use the embedding vector created to search your vector store for context and add it to the final prompt you are going to send to the LLM.
>
> Test your chat application by asking through the `chat` for information regarding the content of the files.
> 