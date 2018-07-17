import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

const sesion = document.getElementById('Login')

export class AuthService {
  login () {
    const proveedor = new firebase.auth.GoogleAuthProvider()

    return firebase.auth().signInWithPopup(proveedor).then(result => {
      sesion.setAttribute('value', 'Salir')
    }).catch(err => console.log(err.message))
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
      sesion.setAttribute('value', 'Login With Google')
    }).catch(function (error) {
      console.log(error.message)
    })
  }
}
