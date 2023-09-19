export interface OrderRequestDTO {
    userId: number;
    items: OrderItemDTO[];
  }
  
  export interface OrderItemDTO {
    productId: number;
    quantity: number;
  }
  
  export interface OrderResponseDTO {
    orderId: string;
    userName: string;
    orderDate: string;
    totalPrice: number;
    status: string;
  }
  