import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: 'input-dialog.component.html',
  styleUrls: ['input-dialog.component.css']
})
export class InputDialogComponent {
  constructor(public dialogRef: MatDialogRef<InputDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  close(data: any) {
    this.dialogRef.close(data);
  }
}
