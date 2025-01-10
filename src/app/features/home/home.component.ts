import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { IconComponent } from '../../components/icon/icon.component';
import { InputComponent } from '../../components/input/input.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    IconComponent,
    TableComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  mockColumnConfig = [
    { id: 1, name: 'Name', icon: 'person', showProperty: 'name' },
    {
      id: 2,
      name: 'Age',
      icon: 'home',
      showProperty: 'age',
    },
    {
      id: 3,
      name: 'Status',
      icon: 'search',
      showProperty: 'status',
    },
    {
      id: 4,
      name: 'City',
      icon: 'check_circle',
      showProperty: 'city',
    },
  ];

  mockData = [
    { name: 'John Doe', age: 25, status: 'Active', city: 'Los Angeles' },
    { name: 'Jane Smith', age: 30, status: 'Inactive' },
    { name: 'Peter Parker', age: 22, status: 'Active' },
    { name: 'Aba Zoey', age: 65, status: 'Inactive' },
    { name: 'Sanno Mann', age: 70, status: 'Inactive' },
    { name: 'Hope Litt', age: 52, status: 'Inactive' },
  ];
}
