import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './product.model';
import { UpdateproductComponent } from '../update-product/updateproduct.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  dataSource!: MatTableDataSource<Product>;
  products: Product[] = [];
  displayedColumns: string[] = ['productName', 'description', 'price', 'availability', 'actions'];
  constructor(
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<Product>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  product() {
    this.router.navigateByUrl('/createproduct');
  }

  changeAvailability(product: Product) {
    this.productService.changeAvailability(product.productId).subscribe(
      (response) => {
        const value = product.productAvailable ? 'unavailable' : 'available';
        this.toastrService.success('Product made '+value);
      },
      (error) => {
        console.error('Error changing availability', error);
        
      }
    );
  }

  updatePrice(product: Product) {

    const productId = product.productId;
    const form = new FormGroup({
      price: new FormControl(product.price, [Validators.required, Validators.min(1)]),
    });

    const dialogRef = this.dialog.open(UpdateproductComponent, {
      width: '400px',
      data: { form , productId: product.productId},
    });
  
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}

