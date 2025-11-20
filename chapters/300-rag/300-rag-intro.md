# 3.0 Retrieval-Augmented Generation (RAG) Intro

**Goal:** Learn how to deal with context too large for you LLMs.

## Introductory Note

>
> In the application we have a `Q&A` section for the users, the files are stored statically on the `backend` and served via REST to the frontend.
> 
> The `walkthrough` files are either an Excel or a PDF document, displaying instructions on information for users to navigate the app.
> 
> These files are going to bse used in our `RAG` implementation going forward.
> 

## Mandatory Materials

**Videos**

- [What is RAG](https://www.youtube.com/watch?v=T-D1OfcDW1M)
- [RAG Explained for Beginners](https://youtu.be/_HQ2H_0Ayy0)

**Reading**

- [Intro to RAG](https://blog.mlq.ai/intro-retrieval-augmented-generation-rag/)
- [What is RAG](https://aws.amazon.com/what-is/retrieval-augmented-generation/)
- [RAG for LLMs](https://www.promptingguide.ai/research/rag)

## RAG: Use Cases

- Enhance LLM Applications:
  - Long-term memory for LLM (e.g.: keeping historic user conversation)
  - Improve context information for LLM
- Searching: Can be used for image to image search, text to image search, image to search text
- Recommendations based on input
- Classification based on input

## Online shop

>
> Nothing to do here.
>

## Helpful Diagrams

### RAG Simple Diagram
![rag-simple-diagram.png](assets/rag-simple-diagram.webp)

### RAG Complex Diagram

![rag-complex-diagram.png](assets/rag-complex-diagram.webp)

## Further Resources (Optional):

- [Advanced RAG Applications](https://www.youtube.com/watch?v=TRjq7t2Ms5I)