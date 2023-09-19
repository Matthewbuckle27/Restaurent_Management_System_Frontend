import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent {
  productForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }

  goToDashboardPage() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.http.post('http://localhost:8088/product', productData).subscribe(
        (response) => {
          console.log('Product created successfully', response);
          this.toastrService.success('Product created successfully');
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.error('Error creating product', error);
        }
      );
    } else {
    }
  }
}