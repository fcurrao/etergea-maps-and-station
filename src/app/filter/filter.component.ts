import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../services/dataServices';
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

  constructor(
    private renderer: Renderer2,
    private DataServices: DataService
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
    this.datas = []

  }

  checkAll = () => {
    this.allChecked = !this.allChecked;
    this.datas.forEach((data: any) => data.checked = this.allChecked);
  }

  deleteOfList = (event: any) => {
    this.datas = this.datas.filter((data: any) => data.id !== event.id);
        // poner un toast con esto:
    alert("Se saco el " + event.name + "de la lista")

  }

  cleanInput = () => {
    let idResultValue = document.getElementById('idResult')! as HTMLInputElement
    let idResultValue1 = document.getElementById('idResult1')! as HTMLInputElement
    let idResultValue2 = document.getElementById('idResult2')! as HTMLInputElement
    idResultValue.value = ""
    idResultValue1.value = ""
    idResultValue2.value = ""
  }
  setInput = () => {

    let idResultValue = document.getElementById('idResult')! as HTMLInputElement
    let idResultValue1 = document.getElementById('idResult1')! as HTMLInputElement
    let idResultValue2 = document.getElementById('idResult2')! as HTMLInputElement
    let idResult = idResultValue.value
    let idResult1 = idResultValue1.value
    let idResult2 = idResultValue2.value
    if (idResult) {
      if (idResult1 || idResult2) {
        // poner un toast con esto:
        alert("Coloque un equipo solo o multiples solos, no ambas cosas")
        return null;
      } else {
        return idResult;
      }

    }
    if (idResult1 || idResult2) {
      if (idResult) {
        // poner un toast con esto:
        alert("Coloque un equipo solo o multiples solos, no ambas cosas")
        return null;
      } else {
        if (idResult1 && idResult2) {
          return [idResult1, idResult2]
        } else {
          // poner un toast con esto:
          alert("Coloque ambos equipos en  multiples ")
          return null;
        }
      }
    }
  }


  addEachOne=(resultInput:any , multiple?:boolean)=>{
      // logica para multiples
      console.log("Resultado único:", resultInput);
     let yetExist = false
    
      this.datas.map((each: any) => {
        (each.name == resultInput) ? yetExist = true : "";
      })
      if (yetExist ) {
        // poner un toast con esto:
        (multiple) ? this.alertToEndYetExist = true : alert("Ya esta incorporado este etergea a la lista");
      } else {
        let newResult = this.etergeas.filter((data: any) => data.name == resultInput);
        console.log("newResult", newResult)
        if (newResult.length !== 0) {
          this.datas = this.datas.concat(newResult);
          this.cleanInput()
        } else {
          (multiple) ? this.alertToEndNotExist = true : alert("No existe esta etergea");
          // poner un toast con esto:
          
        } 
      }
  }


  addToList = () => {
    let resultInput = this.setInput();

    if (resultInput) {
      // logica para multiples
      if (Array.isArray(resultInput)) {
        console.log("Resultado múltiple:", resultInput);
        let numbersBetween: number[] = []; 
        for (let i : any = resultInput[0]; i <= resultInput[1]; i++) {
          numbersBetween.push(i);
        }

        numbersBetween.map((number:any)=>{
          this.addEachOne(number, true)
        }) 
        if(this.alertToEndYetExist){
          // poner un toast con esto:
          alert("Uno o mas elementos ya estaban en la lista") 
          this.alertToEndYetExist = false
        } 
        if(this.alertToEndNotExist){
// poner un toast con esto:
          alert("Uno o mas elementos No Existen") 
          this.alertToEndNotExist = true
        }
          this.cleanInput()
      } else {
        // logica para unico
        this.addEachOne(resultInput, false)
      }
    } 
  };



}