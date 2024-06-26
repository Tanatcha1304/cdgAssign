import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core'
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';

import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
    @ViewChild('mapPanel', {static: true}) mapPanel: ElementRef;
    ngAfterViewInit(): void {
        const map = new Map({
            basemap:'topo-vector'
        });
        const view = new MapView({
            container: this.mapPanel.nativeElement,
            map: map,
            zoom: 15,
            center: [100, 13]
        });

        view.when(() => {
            console.log('MapView is ready.');

            const USALayer = new MapImageLayer({
                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer'
            
            })

            map.add(USALayer);
            
            const point = new Point({
                latitude: 13,
                longitude: 100
            });

            const pointSymbol = new SimpleMarkerSymbol({
                color: [226, 128, 0],
                outline: {
                    color: [255, 255, 255],
                    width: 3
                },
            });

            const pointGraphic = new Graphic({
                geometry: point,
                symbol: pointSymbol
            });

            view.graphics.add(pointGraphic);
    })

    view.on('click', (event) => {
        console.log('Map clicked', event)
    })
}
}