import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lose-sing',
  templateUrl: './lose-sing.component.html',
  styleUrls: ['./lose-sing.component.css']
})
export class LoseSingComponent {
  constructor(public dialogRef: MatDialogRef<LoseSingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }
    
}
