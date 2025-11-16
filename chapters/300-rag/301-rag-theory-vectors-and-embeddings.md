# 3.1 RAG: Theory Vectors and Embeddings

**Goal:** Build a solid understanding of the fundamentals of RAG by learning how embeddings, vector representations, and vector search work.

## Mandatory Materials

**Videos**

- [RAG: How Vector Search and Semantic Rankings work](https://youtu.be/Xwx1DJ0OqCk)
- [RAG: Vector Databases](https://youtu.be/klTvEwg3oJ4)

**Reading**

- Theory
  - Embeddings
    - [OpenAI: What is a Vector Embedding](https://platform.openai.com/docs/guides/embeddings)
    - [AWS: What is a Vector Embedding](https://aws.amazon.com/what-is/embeddings-in-machine-learning/)
  - [What is a Vector Database](https://weaviate.io/blog/what-is-a-vector-database)
  - [Semantic Search](https://medium.com/@zahmed333/semantic-search-in-the-context-of-llms-7961308cd6ad)
- [Vector Database List](https://cookbook.openai.com/examples/vector_databases/readme)
  - [pgvector](https://github.com/pgvector/pgvector) 

## Online shop

>
> Nothing to do here.
>

## Formal Definitions

- **Vector Embeddings**: Vector embeddings numerically capture the semantic meaning of the objects in relation to other objects. Thus, similar objects are grouped together in the vector space, which means the closer two objects, the more similar they are.
- **Vector Search**: Vector embeddings allow us to find and retrieve similar objects from the vector database by searching for objects that are close to each other in the vector space, which is called vector search, similarity search, or semantic search.
- **Vector Indexing**: the underlying idea is to pre-calculate the distances between the vector embeddings and organize and store similar vectors close to each other (e.g., in clusters or a graph), so that you can later find similar objects faster
- **Vector Database**: A vector database indexes, stores, and provides access to structured or unstructured data (e.g., text or images) alongside its vector embeddings, which are the data's numerical representation. It allows users to find and retrieve similar objects quickly at scale in production

## Further Resources (Optional):

- [An intuitive introduction to text embeddings](https://stackoverflow.blog/2023/11/09/an-intuitive-introduction-to-text-embeddings/)
- [Comprehensive Guide To Approximate Nearest Neighbors Algorithms](https://towardsdatascience.com/comprehensive-guide-to-approximate-nearest-neighbors-algorithms-8b94f057d6b6)