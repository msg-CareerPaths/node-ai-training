import { inject, Injectable, OnDestroy } from '@angular/core';
import { EnvironmentConfig } from '../types/providers/environment-config';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WsClientService implements OnDestroy {
  private readonly environmentConfig = inject(EnvironmentConfig);
  private sockets = new Map<string, Socket>();

  initializeConnection(namespace: string): Observable<Socket> {
    return new Observable<Socket>((observer) => {
      if (this.sockets.has(namespace)) {
        const existingSocket = this.sockets.get(namespace);
        if (!existingSocket) {
          return;
        }
        if (existingSocket.connected) {
          observer.next(existingSocket);
          observer.complete();
          return;
        }
      }

      const url = `${this.environmentConfig.wsUrl}/${namespace}`;
      const socket = io(url, {
        autoConnect: false,
        withCredentials: false,
        transports: ['websocket'],
      });

      this.sockets.set(namespace, socket);

      socket.once('connect', () => {
        observer.next(socket);
        observer.complete();
      });

      socket.once('connect_error', (err: Error) => {
        observer.error(err);
      });

      socket.connect();
    });
  }

  terminateConnection(namespace: string): void {
    const socket = this.sockets.get(namespace);
    if (!socket) {
      return;
    }
    socket.disconnect();
    this.sockets.delete(namespace);
  }

  emit<T = object>(namespace: string, event: string, payload: T): void {
    const socket = this.sockets.get(namespace);
    if (!socket) {
      throw new Error(`Socket for namespace "${namespace}" is not connected.`);
    }
    socket.emit(event, payload);
  }

  listen<T = object>(namespace: string, event: string): Observable<T> {
    const socket = this.sockets.get(namespace);
    if (!socket) {
      throw new Error(`Socket for namespace "${namespace}" is not connected.`);
    }
    return fromEvent<T>(socket, event);
  }

  ngOnDestroy(): void {
    Array.from(this.sockets.keys()).forEach((namespace: string) => {
      this.terminateConnection(namespace);
    });
  }
}
