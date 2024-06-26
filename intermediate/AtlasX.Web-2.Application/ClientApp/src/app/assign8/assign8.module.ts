import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { Assign8Component } from './assign8.component'
import { Assign8RoutingModule } from './assign8-routing.module' 

import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [Assign8Component],
    imports: [CommonModule, RatingModule, AvatarModule, AvatarGroupModule, ConfirmDialogModule, Assign8RoutingModule, ButtonModule, ToastModule, RadioButtonModule,ReactiveFormsModule],
    providers: [MessageService, ConfirmationService],
})
export class Assign8Module {}