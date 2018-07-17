import 'firebase/storage'
import 'firebase/database'
import firebase from 'firebase/app'

export class Gallery {
  constructor () {
    this.render()
  }

  addImage () {
    firebase.database().ref().once('value', snapshot => {
      let images = Object.values(snapshot.val().Images)
      window.localStorage.setItem('data', JSON.stringify(images))
      this.render()
    })
  }

  render () {
    if (window.localStorage.getItem('data')) {
      let imagesUrl = JSON.parse(window.localStorage.getItem('data'))

      let images = imagesUrl.map((img) => `
                <img class="app__gallery__img" src=${img.url}>
                  `)

      document.getElementById('gallery').innerHTML = images.reduce((a, b) => a + b, '')
    }
  }
}
