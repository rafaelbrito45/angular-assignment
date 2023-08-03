import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/Product';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  @Input() product!: Product;
  @Output() onEditProduct: EventEmitter<Product> = new EventEmitter();
  subscription!: Subscription;
  showBooleans!: { addProduct: boolean; editProduct: boolean };
  title!: string;
  price!: string;
  description!: string;
  image!: string;
  category!: string;
  showValidationMessage!: boolean;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showBooleans = value));
  }

  assignFormValues() {
    this.title = this.product.title;
    this.price = this.product.price;
    this.description = this.product.description;
    this.image = this.product.image;
    this.category = this.product.category;
  }

  toggleForms() {
    if (this.showBooleans) {
      if (this.showBooleans.editProduct && !this.showBooleans.addProduct) {
        this.assignFormValues();
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        return true;
      } else {
        return false;
      }
    }
    return;
  }

  onSubmit() {
    if (!this.title || !this.price) {
      this.showValidationMessage = true;
      return;
    }
    const newProduct = {
      title: (<HTMLInputElement>document.getElementById('title')).value,
      price: (<HTMLInputElement>document.getElementById('price')).value,
      description: (<HTMLInputElement>document.getElementById('description'))
        .value,
      image: (<HTMLInputElement>document.getElementById('image')).value,
      category: (<HTMLInputElement>document.getElementById('category')).value,
      id: this.product.id,
    };

    this.onEditProduct.emit(newProduct);

    this.title = '';
    this.price = '';
    this.description = '';
    this.image = '';
    this.category = '';
  }
}
