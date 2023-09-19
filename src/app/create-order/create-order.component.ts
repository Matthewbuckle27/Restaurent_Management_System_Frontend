import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Product } from '../product-home/product.model';
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createorder',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateorderComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  quantityControls: FormControl[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private toastrService: ToastrService,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      userId: [1],
      items: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data.filter((product) => product.productAvailable);

      this.quantityControls = this.products.map(() => new FormControl('', [ Validators.min(1)]));
    });
  }

  createItemFormGroup() {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get orderItems() {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    this.orderItems.push(this.createItemFormGroup());
  }

  removeItem(index: number) {
    this.orderItems.removeAt(index);
  }

  submitOrder() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      orderData.items = [];
  
      this.products.forEach((product, index) => {
        const quantity = this.quantityControls[index].value;
        if (quantity > 0) {
          orderData.items.push({
            productId: product.productId,
            quantity: quantity,
          });
        }
      });
  
      if (orderData.items.length > 0) {
        this.orderService.createOrder(orderData).subscribe((response) => {
          console.log('Order created successfully', response);
          this.toastrService.success('Order created successfully');
        });
      } else {
        console.error('At least one item must be selected.');
        this.snackBar.open('Please add at least one item to your order.', 'Close', {
          duration: 5000,
        });
      }
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 5000,
      });
    }
  }
  
}

