import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SampleComponent } from './sample.component'
import { SampleRoutingModule } from './sample-routing.module'

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [SampleComponent],
    imports: [CommonModule, SampleRoutingModule, ButtonModule,ToastModule],
    providers: [MessageService],
})
export class SampleModule { }