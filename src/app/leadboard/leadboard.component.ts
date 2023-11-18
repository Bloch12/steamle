import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-leadboard',
  templateUrl: './leadboard.component.html',
  styleUrls: ['./leadboard.component.css']
})

export class LeadboardComponent {

  @Input() leadboard!: {name: string, score: number}[];

}
