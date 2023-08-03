import { Component } from '@angular/core';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];
  editingProduct!: Product;

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(product: Product) {
    this.productsService
      .deleteProduct(product)
      .subscribe(
        () => (this.products = this.products.filter((p) => p.id !== product.id))
      );
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct(product)
      .subscribe((product) => this.products.unshift(product));
  }

  editProduct(product: Product) {
    this.productsService.editProduct(product).subscribe((product) => {
      this.products = this.products.filter((p) => p.id !== product.id);
      this.products.unshift(product);
    });
  }

  emitEditProduct(product: Product) {
    this.editingProduct = product;
  }
}
