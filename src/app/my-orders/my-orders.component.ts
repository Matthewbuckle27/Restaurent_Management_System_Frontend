import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../order.service'; 
import { OrderResponseDTO } from '../create-order/order.model';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<OrderResponseDTO>();
  
  displayedColumns: string[] = ['orderId', 'orderDate', 'totalPrice', 'status'];

  orders: OrderResponseDTO[] = [];

  constructor(private orderService: OrderService,  private router: Router) {} 

  ngOnInit(): void {
     this.orderService.getOrdersById(1).subscribe((data: OrderResponseDTO[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; 
    });
  }

  mapOrderStatus(statusCode: string): string {
    switch (statusCode) {
      case 'A':
        return 'Active';
      case 'C':
        return 'Completed';
      case 'X':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }

  goToCreateOrderPage() {
    this.router.navigate(['/createorder']);
  }

  // formatPrice(price: number | null): string {
  //   if (price === null) {
  //     return 'Price not available';
  //   }
  
  //   // Use the CurrencyPipe to format the price as Rupees (INR)
  //   return this.currencyPipe.transform(price, 'INR', 'symbol', '1.0-0') || '';
  // }
  
}
