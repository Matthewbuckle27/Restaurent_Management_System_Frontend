import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequestDTO, OrderResponseDTO } from '../app/create-order/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8088/order';

  constructor(private http: HttpClient) {}

  createOrder(order: OrderRequestDTO): Observable<OrderResponseDTO> {
    return this.http.post<OrderResponseDTO>(this.apiUrl, order);
  }

  getOrdersById(userId: number): Observable<OrderResponseDTO[]> {
    const url = `${this.apiUrl}/id/${userId}`;
    return this.http.get<OrderResponseDTO[]>(url);
  }


}
