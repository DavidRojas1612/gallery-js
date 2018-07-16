import "firebase/storage";
import "firebase/database";
import firebase from "firebase/app";
import { GalleryService} from "../services/gallery.service"

export class Gallery{
    constructor(){

        this.render();
  
    }

    addImage(){
        
        firebase.database().ref().once('value', snapshot =>{
            let images = Object.values(snapshot.val().Images) 
            localStorage.setItem("data", JSON.stringify(images));
            this.render();

        });        

    }

    render(){

        if(localStorage.getItem("data")){
             
            let imagesUrl = JSON.parse(localStorage.getItem("data"));
            
            let images = imagesUrl.map(( img ) => `
                <img class="app__gallery__img" src=${img.url}>
                  `);

             document.getElementById('gallery').innerHTML = images.reduce((a,b)=>a+b,'');
        }

        
    }
}


