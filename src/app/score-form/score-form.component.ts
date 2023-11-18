import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-score-form',
  templateUrl: './score-form.component.html',
  styleUrls: ['./score-form.component.css']
})

export class ScoreFormComponent {
  name: string = "";
  message: string = "";
  constructor(public dialogRef: MatDialogRef<ScoreFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any ) { }

  validateInput(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9]*$/; // regex pattern for alphanumeric characters
    let inputChar = event.key;

    if(inputChar == "Enter"){
      this.onSumbit();
      return;
    }
  
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      this.message = "Solo se permiten caracteres alfanumericos";
      event.preventDefault();
    }
  }

  
  onSumbit(){
    
    if(this.name == ""){
      this.message = "El nombre no puede estar vacio";
      return;
    }

    this.dialogRef.close(this.name);
  }
}
