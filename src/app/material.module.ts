import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';

import { MatGridListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatRadioModule,
     MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    imports : [MatGridListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule,
         MatRadioModule, MatButtonModule, MatProgressSpinnerModule],
    exports : [MatGridListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule,
         MatRadioModule, MatButtonModule, MatProgressSpinnerModule]
})

export class MaterialModule {}
