import { Component, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/Product';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  @Output() onAddProduct: EventEmitter<Product> = new EventEmitter();

  title!: string;
  price!: string;
  description!: string;
  image!: string;
  category!: string;
  showBooleans!: { addProduct: boolean; editProduct: boolean };
  showAddProduct!: boolean;
  showEditProduct!: boolean;
  subscription!: Subscription;
  showValidationMessage!: boolean;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showBooleans = value));
  }

  toggleForms() {
    if (this.showBooleans) {
      if (this.showBooleans.addProduct && !this.showBooleans.editProduct) {
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
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image,
      category: this.category,
    };

    this.onAddProduct.emit(newProduct);

    this.title = '';
    this.price = '';
    this.description = '';
    this.image = '';
    this.category = '';
  }
}
