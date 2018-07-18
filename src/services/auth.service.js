import firebase from 'firebase/app'
import { Gallery } from '../class/gallery.class'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

const sesion = document.getElementById('Login')
const gallery = new Gallery()

export class AuthService {
  login () {
    const proveedor = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(proveedor).then(result => {
      sesion.setAttribute('value', 'Salir')
      gallery.addImage()
    })
      .catch(err => console.log(err.message))
  }

  renderLogin () {
    let isAut = this.isAuth()
    if (isAut) {
      let app = document.createElement('div')
      app.innerHTML = ` 
        <div class="app__upload">
          <h2 class="title-sub app__upload__title">Añade tú foto a la galeria</h2>
          <label for="fileUp" class="app__upload__label"> <img src="./assets/img/upload-white.png"> Add Image</label>
          <input type="file" name="fileUp" id="fileUp" class="app__upload__input">
          <div class="progress-bar">
              <div class="progress-bar__bar"></div>
          </div>
        </div>
      
        <div class="app__gallery" id="gallery">
      
        </div>`
      app.id = 'app'
      app.classList.add('app')
      document.body.appendChild(app)
    }
  }

  isAuth () {
    let user = firebase.auth().currentUser
    if (user) {
      return true
    } else {
      return false
    }
  }

  logOut () {
    return firebase.auth().signOut().then((result) => {
      window.localStorage.removeItem('data')
      sesion.setAttribute('value', 'Login With Google')
    }).catch(function (error) {
      console.log(error.message)
    })
  }
}
