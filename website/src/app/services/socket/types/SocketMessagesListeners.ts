import { OrderAvailableMessage } from "../messages/server/OrderAvailableMessage";
import { OrderStatusChangeMessage } from "../messages/server/OrderStatusChangeMessage";

export interface SocketMessagesListeners{
   OrderAvailable: (orderAvailableMessage:OrderAvailableMessage) => void,
   OrderStatusChange?:  (orderStatusChangeMessage:OrderStatusChangeMessage) => void
}