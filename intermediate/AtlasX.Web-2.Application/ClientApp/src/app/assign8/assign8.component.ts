import { Component, ViewChild, AfterViewInit, ElementRef,OnInit } from '@angular/core';
import { AxRequestService} from '@atlasx/core/http-service'
import { AxAuthenticationService } from '@atlasx/core/authentication';
import { AxConfigurationService } from '@atlasx/core/configuration';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import { MessageService, ConfirmationService } from 'primeng/api'
import { FormGroup , FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-assign8',
  templateUrl: './assign8.component.html',
  styleUrls: ['./assign8.component.scss']
})
export class Assign8Component implements AfterViewInit, OnInit {
  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;
  view!: MapView;
  users: any[] = [];
  filteredUsers: any[] = [];
  searchControl = new FormControl('');
  userForm: FormGroup;
  editUser: any = null;
  editMode: boolean = false;
  userID: number;
  value: number = 0;

  constructor(
    private requestService: AxRequestService,
    public authService: AxAuthenticationService,
    public configService: AxConfigurationService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ){
      this.userForm = this.fb.group({
        name: ['',Validators.required],
        value: [0],
        surname: ['',Validators.required],
        gender: ['',Validators.required],
        phone: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        latitude: ['',Validators.required],
        longitude: ['',Validators.required]
      })
    }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value =>{
      this.filterUsers(value)
    })

    
    console.log(this.userForm.get('name').value)

  

    

    this.loadUser()
  }

  loadUser(): void {
    this.requestService.sp('TEMP_USER_Q','GET', {}).subscribe((response: any)=>{
      console.log(response);
      if(response && response.success){
        this.users = response.data
        this.filteredUsers = this.users
      }
    })
  }
  ngAfterViewInit(): void {
    const map = new Map({
        basemap: 'topo-vector'
      });
      this.view = new MapView({
        container: this.mapPanel.nativeElement,
        map: map,
        zoom: 10,
        center: [100, 13]
      });

      this.view.on('click', (event) => {
        const point = event.mapPoint;
        this.userForm.get('latitude').setValue(point.latitude)
        this.userForm.get('longitude').setValue(point.longitude)
        if(this.view){
          this.view.graphics.removeAll()
          const newPoint = new Point({
            longitude: point.longitude,
            latitude: point.latitude
          })
  
          const marker = new SimpleMarkerSymbol({
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 2
            }
          })
  
          const pointGraphic = new Graphic({
            geometry: newPoint,
            symbol: marker
          });
          this.view.graphics.add(pointGraphic)
  

        }
        
        console.log("latitude", this.userForm.get('latitude').value)
        console.log("longitude", this.userForm.get('longitude').value)

      });
  }

  filterUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        `${user.NAME} ${user.SURNAME}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onNameBlur(){
    console.log("name", this.userForm.get('name').value)
    this.requestService.request('https://localhost:5001/api/apphoro',
      'GET', 
      {},
      { NAME: this.userForm.get('name').value}
      )
      .subscribe((response: any) =>{
        this.value = response.star;
        this.userForm.get('value').setValue(response.star)
      })

  }
  
  onSave(){
    if(this.userForm.valid){
      if(this.editMode === true){
        //const index = this.items.indexOf(this.editUser)
        //this.items[index] = this.userForm.value
        this.requestService.sp('TEMP_USER_U', 'GET',{
          USER_ID: this.userID,
          NAME: this.userForm.get('name').value,
          SURNAME: this.userForm.get('surname').value,
          GENDER: this.userForm.get('gender').value,
          MOBILE: this.userForm.get('phone').value,
          LATITUDE: this.userForm.get('latitude').value,
          LONGITUDE: this.userForm.get('longitude').value
        })
        .subscribe((response: any) =>{
          if(response && response.success){
            this.messageService.add({severity:'success', summary:'Success!', detail:'แก้ไขข้อมูลผู้ใช้งานเรียบร้อยแล้ว'});
            this.loadUser()
          }
        })
        this.editMode = false;
      }else{
        //console.log('latitude', this.userForm.get('latitude').value)
        
        this.requestService.sp('TEMP_USER_I', 'POST',{
          NAME: this.userForm.get('name').value,
          SURNAME: this.userForm.get('surname').value,
          GENDER: this.userForm.get('gender').value,
          MOBILE: this.userForm.get('phone').value,
          LATITUDE: this.userForm.get('latitude').value,
          LONGITUDE: this.userForm.get('longitude').value
        })
        .subscribe((response: any) =>{
          if(response && response.success){
            this.messageService.add({severity:'success', summary:'Success!', detail:'เพิ่มชื่อผู้ใช้งานแล้ว'});
            this.loadUser()
          }
        })
      }
      this.userForm.reset();
      this.view.graphics.removeAll();
      this.value = 0;
    }
    

  }

  onReset(){
    this.userForm.reset();
    this.view.graphics.removeAll();
    this.value = 0;
  }

  onEdit(i: any){
    console.log("click",i.USER_ID);
    this.userID = i.USER_ID;
    //console.log("name", i.NAME)
    //console.log("latitude", i.LATITUDE)
    this.userForm.reset({
      name: i.NAME,
      surname: i.SURNAME,
      gender: i.GENDER,
      phone: i.MOBILE,
      latitude: i.LATITUDE,
      longitude: i.LONGITUDE
    })
    const newPoint = new Point({
      longitude: i.LONGITUDE,
      latitude: i.LATITUDE
    })

    const marker = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    })

    const pointGraphic = new Graphic({
      geometry: newPoint,
      symbol: marker
    });
    this.view.graphics.add(pointGraphic)
    this.view.goTo({
      center: newPoint,
      zoom: 10
    })

    this.editMode = true

    
  }

  onDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'คุณต้องการลบข้อมูลผู้ใช้งานนี้ใช่หรือไม่?',
      header: 'ลบข้อมูลผู้ใช้งาน',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.requestService.sp('TEMP_USER_D', 'GET',{
          USER_ID: this.userID
        })
       .subscribe((response: any) =>{
        if(response && response.success){
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'ลบผู้ใช้งานแล้ว'});
          
        }
       })
           
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Rejected', detail:'ยกเลิกการลบข้อมูลผู้ใช้งาน'});
      }
    })
    this.loadUser()
    
  }

  onAdd(){
    this.editMode = false;
    this.userForm.reset();
    this.view.graphics.removeAll();
    this.value = 0;
    
  
  }

}