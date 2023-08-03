import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title: string = 'Fake store';
  showAddProduct: { addProduct: boolean; editProduct: boolean } = {
    addProduct: false,
    editProduct: false,
  };
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddProduct = value));
  }

  handleButtonContent() {
    if (this.showAddProduct) {
      if (this.showAddProduct.addProduct || this.showAddProduct.editProduct) {
        return true;
      } else {
        return false;
      }
    }
    return;
  }

  toggleAddProduct() {
    this.uiService.toggleAddProduct();
  }
}
