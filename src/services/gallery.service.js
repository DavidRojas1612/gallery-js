import 'firebase/storage'
import 'firebase/database'
import firebase from 'firebase/app'
import { Gallery } from '../class/gallery.class'

const progressBar = document.body.querySelector('.progress-bar__bar')

export class GalleryService {
  static imagenUp (fileImg) {
    const refStorage = firebase.storage().ref(`/Images/${fileImg.name}`)
    const upImg = refStorage.put(fileImg)

    upImg.on('state_changed', snapshot => {
      progressBar.style.transform = `translateX(${Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)}%)`
    }, err => {
      console.error(err)
    }, () => {
      refStorage.getDownloadURL().then((urlImg) => {
        this.addDBImg(urlImg)
      })
    })
  }

  static addDBImg (urlImg) {
    const gallery = new Gallery()
    const fireDataBase = firebase.database().ref('Images')
    const newImage = fireDataBase.push()
    newImage.set({url: urlImg})

    firebase.database().ref('Images').once('child_added').then((snapshot) => {
      gallery.addImage()
    })
  }
}
