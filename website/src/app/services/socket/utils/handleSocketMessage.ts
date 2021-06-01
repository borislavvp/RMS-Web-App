import { OrderAvailableMessage } from "../messages/server/OrderAvailableMessage";
import { OrderStatusChangeMessage } from "../messages/server/OrderStatusChangeMessage";
import { ServerMessage } from "../messages/server/ServerMessage";
import { ServerMessageType } from "../messages/server/ServerMessageType";
import { SocketMessagesListeners } from "../types/SocketMessagesListeners";

const IsMessage = (message: ServerMessage, expected: ServerMessageType) => message.type === expected;

export const handleSocketMessage = (message: ServerMessage, socketListeners: SocketMessagesListeners) => {
    if (IsMessage(message, ServerMessageType.ORDER_AVAILABLE)) {
        socketListeners.OrderAvailable?.(message as OrderAvailableMessage);
    }
    if (IsMessage(message,ServerMessageType.ORDER_STATUS_CHANGE)) {
        socketListeners.OrderStatusChange?.(message as OrderStatusChangeMessage);
    }
}