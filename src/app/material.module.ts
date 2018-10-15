import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';

import { MatGridListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatRadioModule,
     MatButtonModule } from '@angular/material';

@NgModule({
    imports : [MatGridListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatRadioModule, MatButtonModule],
    exports : [MatGridListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatRadioModule, MatButtonModule]
})

export class MaterialModule {}
