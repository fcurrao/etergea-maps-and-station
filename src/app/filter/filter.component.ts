import { Component, OnInit, Renderer2 } from '@angular/core'; 
import { data } from '../data'; // estoy probando la data....

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public datas : any;   
  
  constructor(private renderer: Renderer2) {}


  ngOnInit() {
    this.datas = data
    console.log("data", this.datas)
  }

 
    reebotThis(event: any) { 
      console.log("reboot this:" + event);  
  } 

  deleteOfList = (event:any) => {
    
    this.datas = this.datas.filter((data : any) => data.id !== event.id);

    alert("Se saco el " + event.info + "de la lista")
   
    // this.datas.map((x:any)=>{

    //   if(x.id === event.id){
    //     alert("Se saco el " + event.info + "de la lista")
        
    //   } else {
    //     alert("No se pudo eliminar de la lista")
    //   }
    // })

  }

  addToList = () => {
    let probando = false
    if(probando){
      
    } else{
      // poner un toast con esto:
      alert("no existe el o algun numero de equipo, corroborelo")
    } 
  };
 


}