# 2.1 Chat Streaming via WebSockets

**Goal:** Add the LLM agent integration into your chat integration.

## Initial Notes

>
> The chat functionality and communication is already implemented for you in the `frontend` and the `backend`.
> 
> The communication protocol is `Websockets` via `socket.io`.
> 
> Have a look over the [frontend chat feature](../../app/frontend/src/app/features/chat) and the [backend llm feature](../../app/backend/src/features/llm) (more exactly the chat.gateway).
>
> And have a look over how the chat actually functions, how the messages (both normal and info are sent). You will have to make some adjustments there in the future.
> 
> On the browser you should see the messages under the `network` tab under a websocket protocol request (do not clear the history as you might lose the connection request, filter by `Socket` ).
> 

## Reading to understand current implementation (Optional)
**Videos**

- [WebSocket in 100 seconds](https://youtu.be/1BfCnjr_Vjg)
- [How WebSockets work](https://youtu.be/G0_e02DdH7I)

**Reading**

- Backend
    - [Nest.js: Gateways](https://docs.nestjs.com/websockets/gateways)
    - [Socket.io: Server API](https://socket.io/docs/v4/server-api/)
- Frontend
    - [Socket.io: Client API](https://socket.io/docs/v4/client-api/)

## Mandatory Materials

**Reading**

- [LangChain: Streaming](https://docs.langchain.com/oss/javascript/langchain/streaming)
- [LangChain: Short Term Memory](https://docs.langchain.com/oss/javascript/langchain/short-term-memory#overview)

## Online Shop

>
> In your `ChatBedrockConverse` instantiation add the config option `streaming: true` 
> 
> Change your invocation from `invoke` to `stream`
> 
> Create a buffer (`AIMessageChunk`) and stream the content via a RxJs Subject as chunks arrives from the LLM. 
> 
> Take care to save the initial client message into the database.
> 
> The response content should be streamed to your socket as it comes and saved when it finishes.
> 
> On the UI the chunks of messages should be displayed as they come and grouped together (this is theoretically already done).
>
> Remember to add the chat history as context to you invocation of the LLM so the llm respond appropriately.
> 
> Integrate the tools you developed in the previous chapters (the ones from the `/api/llm/query`) and test how it behaves.
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