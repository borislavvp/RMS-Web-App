import { OrderProduct } from "./orderProduct.model";
import { PaymentDetails } from "./paymentDetails.model";

export class PlaceOrder{
    products: OrderProduct[];
    totalPrice: number;
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    paymentDetails: PaymentDetails;
}