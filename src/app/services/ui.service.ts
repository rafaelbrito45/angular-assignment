import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddProduct: boolean = false;
  private showEditProduct: boolean = false;
  private showBooleans: object = {};
  private subject = new Subject<any>();

  constructor() {}

  toggleAddProduct(): void {
    this.showAddProduct = !this.showAddProduct;
    this.showEditProduct = false;

    this.showBooleans = {
      addProduct: this.showAddProduct,
      editProduct: this.showEditProduct,
    };
    this.subject.next(this.showBooleans);
  }
  toggleEditProduct(): void {
    this.showEditProduct = !this.showEditProduct;
    this.showAddProduct = false;

    this.showBooleans = {
      addProduct: this.showAddProduct,
      editProduct: this.showEditProduct,
    };
    this.subject.next(this.showBooleans);
  }
  toggleCloseAll(): void {
    this.showBooleans = {
      addProduct: false,
      editProduct: false,
    };

    this.subject.next(this.showBooleans);
  }
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
