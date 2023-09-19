import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})

export class UpdateproductComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService, 
    public dialogRef: MatDialogRef<UpdateproductComponent>,
    private toastrService: ToastrService 
  ) {}

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const productId = this.data.productId;
      const newPrice = form.value.price;

      this.productService.updateProductPrice(productId, newPrice).subscribe(
        (response) => {
          this.toastrService.success('Product price updated');
          this.dialogRef.close(); 
        },
        (error) => {

        }
      );
    }
  }
}