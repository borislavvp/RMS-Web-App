import { SocketMessagesListeners } from "../types/SocketMessagesListeners";

export const initializeSocketListeners = (): SocketMessagesListeners => {
    return {
        OrderAvailable: null,
        OrderStatusChange: null
    }
}