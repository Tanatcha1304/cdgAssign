import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Assign8Component } from './assign8.component'

const routes: Routes = [
    {
        path: '',
        component: Assign8Component
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Assign8RoutingModule { }