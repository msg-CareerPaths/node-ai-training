# 2.1 Chat Streaming via WebSockets

**Goal:** Add the LLM agent integration into your chat integration.

## Mandatory Materials

**Reading**

- [LangChain: Streaming](https://docs.langchain.com/oss/javascript/langchain/streaming)
- [LangChain: Short Term Memoy](https://docs.langchain.com/oss/javascript/langchain/short-term-memory#overview)

## Online Shop

>
> In your `ChatBedrockConverse` instantiation add the config option `streaming: true` 
> 
> Change your invocation from `invoke` to `stream`
> 
> Create a buffer (`AIMessageChunk`) and stream the content via a RxJs Subject as chunks arrives from the LLM. 
> 
> The response content should be streamed to your socket as it comes and saved when it finishes.
> 
> On the UI display the chunks of messages as they come and finally group the final response message.
>
> Remember to add the chat history as context to you invocation of the LLM.
> 
> Optionally, you could integrate the tools you developed in the previous chapters and test how it behaves.
> 

### Code Samples

```typescript
    this._streamModel = new ChatBedrockConverse({
        model: config.model,
        region: config.region,
        streaming: true
    });

    public async callStreamModel(
        client: Subject<string>,
        systemMessage: string,
        humanMessage: string
    ): Promise<string> {
        const messages: BaseLanguageModelInput = [
          ['system', systemMessage],
          ['human', humanMessage]
        ];
        
        let buffer: AIMessageChunk | null = null;
        try {
          const stream = await this._streamModel.stream(messages);
        
          for await (const chunk of stream) {
            buffer = buffer ? buffer.concat(chunk) : chunk;
            client.next(buffer.content as string);
          }
          client.complete();
        } catch (err) {
          throw new LlmBadRequestException(err);
        }
        return (buffer?.content as string) ?? '';
    }
```