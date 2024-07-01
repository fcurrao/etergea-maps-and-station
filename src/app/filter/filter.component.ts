import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../services/dataServices';
import { ToastService } from '../services/toastServices';
import { Response } from 'src/app/models/response';
import { data } from '../data'; // estoy probando la data....
// import { data } from '../models/data';

@Component({ 
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public etergeas: any;
  public datas: any = [];
  allChecked: boolean = false;
  alertToEndYetExist: boolean = false;
  alertToEndNotExist: boolean = false;
  somethingNew: boolean = false;

  constructor(
    private renderer: Renderer2,
    private DataServices: DataService,
    private ToastService: ToastService,
    
  ) { }


  ngOnInit() {
    // this.DataServices.getAllApis().subscribe((resp:Response<any>)=>{
    //   this.datas = resp.data
    //   this.etergeas = resp.data
    // })

    // this.datas.map((each : any)=>{
    //   this.DataServices.getOneEtergea(each.id).subscribe((resp:data)=>{
    //     const esteDataEtergeaOne = resp
    //     console.log("Cada etergea, los datos estan aca : ", esteDataEtergeaOne)
    //   }) 
    // })

  

    this.etergeas = data
    this.datas = []
    console.log("data", this.etergeas)
  }


  reebotThis(event: any) {
    console.log("reboot this:" + event);
  }


  deleteAll = () => {
    this.ToastService.show('Se borro toda la lista', { classname: 'toastInfo blue', delay: 5000 });
     this.datas = []
  }

  checkAll = () => {
    this.allChecked = !this.allChecked;
    this.datas.forEach((data: any) => data.checked = this.allChecked);
  }

  deleteOfList = (event: any) => {
    this.datas = this.datas.filter((data: any) => data.id !== event.id);
    this.ToastService.show("Se saco el " + event.name + " de la lista", { classname: 'toastInfo blue', delay: 5000 });
  }

  cleanInput = () => {
    let idResultValue = document.getElementById('idResult')! as HTMLInputElement
    // let idResultValue1 = document.getElementById('idResult1')! as HTMLInputElement
    // let idResultValue2 = document.getElementById('idResult2')! as HTMLInputElement
    idResultValue.value = ""
    // idResultValue1.value = ""
    // idResultValue2.value = ""
  }
  setInput = () => {

    let idResultValue = document.getElementById('idResult')! as HTMLInputElement
    // let idResultValue1 = document.getElementById('idResult1')! as HTMLInputElement
    // let idResultValue2 = document.getElementById('idResult2')! as HTMLInputElement
    let idResult = idResultValue.value
    // let idResult1 = idResultValue1.value
    // let idResult2 = idResultValue2.value
    let idResult1 = null // porque comente multiple
    let idResult2 = null // porque comente multiple
    if (idResult) {
      if (idResult1 || idResult2) {
        this.ToastService.show("Coloque un equipo solo o multiples solos, no ambas cosas", { classname: 'toastInfo red', delay: 5000 });
        return null;
      } else {
        return idResult;
      }

    }
    if (idResult1 || idResult2) {
      if (idResult) {
        this.ToastService.show("Coloque un equipo solo o multiples solos, no ambas cosas", { classname: 'toastInfo red', delay: 5000 });
        return null;
      } else {
        if (idResult1 && idResult2) {
          return [idResult1, idResult2]
        } else {
          this.ToastService.show("Coloque ambos equipos en  multiples", { classname: 'toastInfo red', delay: 5000 });
          return null;
        }
      }
    }
  }


  addEachOne=(resultInput:any , multiple?:boolean)=>{
      // logica para multiples 
      let newResult = this.etergeas.filter((data: any) => data.name == resultInput);  
     let yetExist = false
     let notExist = false
    
      this.datas.map((each: any) => {
        (each.name == resultInput) ? yetExist = true : "";
        let newResult = this.etergeas.filter((data: any) => data.name == resultInput);  
        (newResult)? notExist = true :"";
        

      })
      if (yetExist ) {
        (multiple) ? this.alertToEndYetExist = true : this.ToastService.show("El " + resultInput + " ya esta incorporado este etergea a la lista", { classname: 'toastInfo red', delay: 5000 });        
      } else { 
        if (newResult.length !== 0) {
          this.datas = this.datas.concat(newResult); 
          (multiple) ?this.somethingNew = true :  this.ToastService.show("El etergea "+ resultInput + " fue agregado", { classname: 'toastInfo blue', delay: 5000 });   
          this.cleanInput()
        } else { 
          (multiple && notExist) ? this.alertToEndNotExist = true : this.ToastService.show("No existe este Etergea", { classname: 'toastInfo red', delay: 5000 });
        } 
      }

  }


  addToList = () => {
    let resultInput = this.setInput();
    if (resultInput) {
      // logica para multiples
      if (Array.isArray(resultInput)) { 
      //   let numbersBetween: number[] = []; 
      //   let start  : Number; 
      //   let end  : Number; 
      //   start = Number(resultInput[0]);
      //   end  = Number(resultInput[1]);
      //   for (let i : any = start; i <= end; i++) {
      //     numbersBetween.push(i);
      //   }
      //   numbersBetween.map((number:any)=>{
      //     this.addEachOne(number, true)
      //   }) 
      //   if(this.alertToEndYetExist){
      //     this.ToastService.show("Uno o mas elementos ya estaban en la lista", { classname: 'toastInfo red', delay: 5000 })
      //     this.alertToEndYetExist = false
      //   } 
      //   if(this.alertToEndNotExist){
      //     this.ToastService.show("Uno o mas elementos No Existen", { classname: 'toastInfo red', delay: 5000 })
      //     this.alertToEndNotExist = false
      //   }
      //     this.cleanInput()
      //     if (this.somethingNew){
      //       this.somethingNew = false;
      //       setTimeout(() => {
      //         this.ToastService.show("Fueron agregados", { classname: 'toastInfo blue', delay: 5000 });  
      //       }, 600);
      //     }
          
      } else {
        // logica para unico
        let stringArray = resultInput.split(','); 
        let numberArray = stringArray.map(str => Number(str)); 
        numberArray.map((each:any)=>{
          this.addEachOne(each, false)
        })
      }
    } 
  };



}