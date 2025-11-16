# 2.0 Chat Intro

> This chapter assumes you are going to do a WebSocket implementation for your chat, skip this chapter if you are not going to do this.
> 
> Theoretically, you could continue to do the rest of the chapters by using a more simple HTTP request/response model. But remember, you need a sample chat implementation for the following chapters.
> 

**Goal:** Building a more reactive application for your users.

This chapter in particular is to set up some of your `backend` and `frontend` implementation so you are more prepared to build your own chat agent.
In particular, we are not going to do anything `AI` related yet, but only create the initial implementation so we can work with streaming.

## Mandatory Materials

**Videos**

- [WebSocket in 100 seconds](https://youtu.be/1BfCnjr_Vjg)
- [How WebSockets work](https://youtu.be/G0_e02DdH7I)

**Reading**

- Backend
  - [Nest.js: Gateways](https://docs.nestjs.com/websockets/gateways)
  - [Socket.io: Server API](https://socket.io/docs/v4/server-api/)
- Frontend
  - [Socket.io: Client API](https://socket.io/docs/v4/client-api/)
- General Resources
  - [Basic CRUD API with Socket IO](https://socket.io/fr/get-started/basic-crud-application)
  - [Socket.io with Angular](https://medium.com/@sehban.alam/integrating-socket-io-with-angular-real-time-awesomeness-made-easy-039dabf97c7a)
- Manual API Testing
  - [Bruno: Install](https://docs.usebruno.com/get-started/bruno-basics/download) (alternative to Postman proprietary software)
  - [Bruno: WebSockets](https://docs.usebruno.com/send-requests/websocket/overview)

## Online Shop

>
> On the `backend` implement a new gateway for your chat using `socket.io`, add a proper namespace to it. You should respond with a `mock` message at this point.
> 
> Save the messages received and sent under a new `message.entity` in your database (update the migrations as needed).
> 
> Consider that in the future messages are going to be actually chunks of a whole message response that you are going to need to group them, when the response is finished.
> 
> Add a normal HTTP endpoint to receive all the messages based on the current logged-in user (that will be the identifier for our `chat session`).
> 
> On the UI side create a new service to handle the websocket connectivity and allow you to send or receive messages via observables.
> 
> Add the functionality to the chat widget component that is displayed in the application.
> 
> At the end of the functionality, you should be able to send messages via the UI, receive a `mock` response, and all of these messages are saved in the Database. 
> 
> If the user refreshes the page and opens the chat widget, he should see the history of its chat.
> 
> Consider adding a clear history button feature or do it manually yourself directly on the database.
> 

