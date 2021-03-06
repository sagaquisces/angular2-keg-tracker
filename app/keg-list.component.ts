import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <select (change)="onChange($event.target.value)">
    <option value="allKegs" selected="selected">All Kegs</option>
    <option value="ipaKegs">IPA Kegs</option>
    <option value="paleAleKegs">Pale Ale Kegs</option>
  </select>

  <ul class="list-group">
    <li [class]="priceColor(currentKeg)" *ngFor="let currentKeg of childKegList | styleness:filterByStyleness">
      <ul class="list-group">
        <li class="list-group-item"><span class="label label-danger pull-right" *ngIf="currentKeg.alcoholContent>6">High Alcohol</span><strong>Name:</strong>{{currentKeg.name}}</li>
        <li class="list-group-item"><strong>Brand:</strong> {{currentKeg.brand}}</li>
        <li class="list-group-item"><strong>Style:</strong> {{currentKeg.style}}</li>
        <li class="list-group-item"><strong>Price:</strong> {{currentKeg.price}}</li>
        <li class="list-group-item"><strong>Alcohol Content:</strong> {{currentKeg.alcoholContent}}</li>
        <li class="list-group-item"><strong>Pints:</strong> {{currentKeg.pints}}</li>
      </ul>
      <div class="alert alert-danger" *ngIf="currentKeg.pints < 120">
        <strong>Danger!</strong> Keg is critically low.
      </div>
      <button (click)="editButtonHasBeenClicked(currentKeg)">Edit!</button>
      <button (click)="sellButtonHasBeenClicked(currentKeg)">Sell!</button>
    </li>
  </ul>
  `
})


export class KegListComponent {
  @Input() childKegList: Keg[];
  @Output() clickSenderEdit = new EventEmitter();
  @Output() clickSenderSell = new EventEmitter();
  filterByStyleness: string = "allKegs";

  priceColor(currentKeg){
    if (currentKeg.price >= 5){
      return "list-group-item list-group-item-success";
    } else {
      return "list-group-item list-group-item-info";
    }
  }

  editButtonHasBeenClicked(kegToEdit: Keg) {
    this.clickSenderEdit.emit(kegToEdit);
  }

  sellButtonHasBeenClicked(kegToEdit: Keg) {
      this.clickSenderSell.emit(kegToEdit);
  }

  onChange(optionFromMenu) {
    this.filterByStyleness = optionFromMenu;
  }

}
