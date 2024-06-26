import { Component } from '@angular/core'

import { MessageService } from 'primeng/api'

@Component({
    selector: 'app-sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss'],
})
export class SampleComponent {
    constructor(private messageService: MessageService){}
    onClick(){
        //console.log("Clicked")
        this.messageService.add({severity:'success', summary:'Success!', detail:'You clicked the button.'});
    }
}