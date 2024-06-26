import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'gis',
    loadChildren: () => import('./gis/gis.module').then((m) => m.GisModule),
    data: {
      systemId: 'GIS',
    },
  },
  {
    path: 'sample',
    loadChildren: () => import('./sample/sample.module').then((m) => m.SampleModule),
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'assign8',
    loadChildren: () => import('./assign8/assign8.module').then((m) => m.Assign8Module),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
