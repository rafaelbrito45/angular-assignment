import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/Product';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() onDeleteProduct: EventEmitter<Product> = new EventEmitter();
  @Output() onEmitEditProduct: EventEmitter<Product> = new EventEmitter();
  subscription!: Subscription;
  showEditProduct!: boolean;

  faTimes = faTimes;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showEditProduct = value));
  }

  toggleEditProduct(product: Product) {
    this.uiService.toggleEditProduct();
    this.onEmitEditProduct.emit(product);
  }

  dynamicSrc() {
    return this.product.image
      ? this.product.image
      : '../../../assets/imagePlaceholder.png';
  }

  onDelete(product: Product) {
    this.onDeleteProduct.emit(product);
  }
}
