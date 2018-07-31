import { GalleryService } from './services/gallery.service'
import { ModalService } from './class/modal.class'
import { Gallery } from './class/gallery.class'
import { AuthService } from './services/auth.service'
import firebase from 'firebase/app'
import {
  APIKEY,
  AUTHDOMAIN,
  DBURL,
  MESSAGSENDERID,
  PROJECTID,
  STRBUCKET
} from './const'
import 'firebase/auth'
import './index.scss'

firebase.initializeApp({
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DBURL,
  projectId: PROJECTID,
  storageBucket: STRBUCKET,
  messagingSenderId: MESSAGSENDERID
})

const auth = new AuthService()
const gallery = new Gallery()

const imageUp = () => {
  const inputImage = document.getElementById('fileUp')
  inputImage.addEventListener('change', e => {
    const fileImg = e.target.files[0]
    GalleryService.imagenUp(fileImg)
  })

  modalImage(document.getElementById('gallery'))
}

const modalImage = galleryCont => {
  galleryCont.addEventListener('click', event => {
    let imageArrayData = [...galleryCont.querySelectorAll('img')]
    let i = imageArrayData.indexOf(event.target)
    if (event.target.tagName === 'IMG') {
      ModalService.inyectModal(i)
    }
  })
}

const LogIn = () => {
  const login = document.getElementById('Login')
  login.addEventListener('click', () => {
    if (auth.isAuth()) {
      auth.logOut().then(() => {
        let appContent = document.getElementById('app')
        document.body.removeChild(appContent)
      })
    } else {
      auth.login().then(() => {
        auth.renderLogin()
        imageUp()
      })
    }
  })
}

(function render () {
  console.log(auth.isAuth())
  if (!auth.isAuth()) {
    LogIn()
  } else {
    gallery.addImage()
  }
})()
