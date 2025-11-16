# 3.0 Retrieval-Augmented Generation (RAG) Intro

**Goal:** Learn how to deal with context too large for you LLMs.

## Introductory Note

>
> Due to relative simple nature of the LLM Shop application, our only "large" documents are to be considered those under our `reports` functionality.
> 
> The `reports` are either an Excel or a PDF document displaying either the total revenue the shop has made or a list of the most bought products (note: they reports are generated for all existing `orders` in the database, they are not monthly or anything similar).
> 
> IMPORTANT: For the purpose of this training we are considering only the `PDF` version of the documents (due to the lack of availability of loaders for Excel filetype).
> 
> These documents are generated when you call the endpoint `POST` `/api/reports` and saved in the Database.
> 
> We are going to use them in our `RAG` functionality for simplicity’s sake.
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