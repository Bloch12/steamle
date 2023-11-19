import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wining-sing',
  templateUrl: './wining-sing.component.html',
  styleUrls: ['./wining-sing.component.css']
})
export class WiningSingComponent {
  @Input() winingText!: string;
  @Input() shareText!: string;
 
  share() {
      navigator.clipboard.writeText(this.shareText);
      alert("contenido copiado en el portapapeles");
  }
  

}
