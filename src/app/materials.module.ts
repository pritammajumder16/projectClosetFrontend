import { NgModule } from "@angular/core";

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from "@angular/common";
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    imports:[CommonModule],
    exports: [MatIconModule, MatFormFieldModule, MatInputModule,MatSelectModule,MatCardModule,MatRadioModule,MatDatepickerModule,  MatDatepickerModule,
        MatNativeDateModule ,MatButtonModule
    ],
})

export class materialModule { };