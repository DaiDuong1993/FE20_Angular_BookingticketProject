import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { ShortcutPipe } from './shortcut.pipe';

@NgModule({
  declarations: [SafePipe, ShortcutPipe],
  imports: [
    CommonModule
  ],
  exports:[
    SafePipe,
    ShortcutPipe
  ]
})
export class PipeModule { }
