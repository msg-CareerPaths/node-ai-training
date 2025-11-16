# 3.2 RAG: Document Vectors and Parsing

**Goal:** Parse your first documents and save them in your vector database.

## Introductory Note

- The [App Docker Folder](../../app/docker) offers a commented `pgvector` image, the intent is to use this as the vector database, but the reading materials will offer you several alternatives.

## Mandatory Materials

### Reading

#### Parsing

- LangChain
  - [LangChain: Document Loaders](https://docs.langchain.com/oss/javascript/integrations/document_loaders)
  - [LangChain: PDF Loader](https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/pdf)
- AWS
  - [AWS Bedrock: Data Automation](https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html)
  - [AWS Textract](https://aws.amazon.com/textract/)

#### Vectors
- AWS Embedding Models
  - [LangChain: Bedrock Embeddings](https://docs.langchain.com/oss/javascript/integrations/text_embedding/bedrock)
- PGVector
  - [LangChain: TypeORM PGVector](https://docs.langchain.com/oss/javascript/integrations/vectorstores/typeorm)
  - [LangChain: PGVector Store](https://docs.langchain.com/oss/javascript/integrations/vectorstores/pgvector)
  - [pgvector](https://github.com/pgvector/pgvector)
- AWS Specific (note: you will likely not yet have LangChain support):
  - [S3 Vectors Store](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html)
  - [AWS S3 Vectors JS SDK: DOCS](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3vectors/)
  - [AWS S3 Vectors JS SDK: NPM](https://www.npmjs.com/package/@aws-sdk/client-s3vectors)
  - [AWS Vector DB Options](https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-an-aws-vector-database-for-rag-use-cases/vector-db-options.html)
  - [AWS Bedrock: Knowledge Bases](https://docs.langchain.com/oss/javascript/integrations/retrievers/bedrock-knowledge-bases)
- General
  - [LangChain: Embedding Models](https://docs.langchain.com/oss/javascript/integrations/text_embedding#overview)
  - [LangChain: Vector Store](https://docs.langchain.com/oss/javascript/integrations/vectorstores)
  - [LangChain: Splitters](https://docs.langchain.com/oss/javascript/integrations/splitters)


## Online shop

>
> When a new `pdf` report is generated, add a step to process, parse, chunk and embed the data into the vector store.
>