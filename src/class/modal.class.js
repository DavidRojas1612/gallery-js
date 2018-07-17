import 'firebase/storage'
import 'firebase/database'

let images = JSON.parse(window.localStorage.getItem('data'))

export class ModalService {
  static inyectModal (idx) {
    images = JSON.parse(window.localStorage.getItem('data'))
    let img = images[idx]
    this.render(img.url, idx)
  }

  static render (urlImg, idx) {
    let modalImg = document.createElement('div')

    modalImg.innerHTML = `
            <div class="modal__background" >
                <div class="modal__close" > <img src="./assets/img/close-modal.png"></div>
                <figure>
                    <img class="modal__img" src=${urlImg}/>
                    <figcaption>
                        <nav>
                        <a href="#" class="modal__btn-prev"> <img class="prev" src="./assets/img/left-arrow.png"> </a>
                        <a href="#" class="modal__btn-next"> <img class="next" src="./assets/img/right-arrow.png"> </a>
                        </nav>
                    </figcaption>
                </figure>
            </div>       
        `
    modalImg.id = 'app__modal'
    modalImg.classList.add('app__modal')
    document.body.appendChild(modalImg)
    this.closeModal(modalImg)
    this.renderToggle(modalImg, idx)
  }

  static renderToggle (element, idx) {
    let prevButton = element.querySelector('.prev')
    let nextButton = element.querySelector('.next')
    let imgModalToggle = element.querySelector('.modal__img')
    let closeButton = element.querySelector('.modal__close')

    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowRight') nextButton.click()
      if (e.key === 'ArrowLeft') prevButton.click()
      if (e.key === 'Escape') closeButton.click()
    })
    element.addEventListener('click', event => {
      event.preventDefault()
      let target = event.target

      if (target === prevButton) {
        if (idx > 0) {
          imgModalToggle.src = images[idx - 1].url
          idx--
        } else {
          imgModalToggle.src = images[images.length - 1].url
          idx = images.length - 1
        }
      } else if (target === nextButton) {
        if (idx < images.length - 1) {
          imgModalToggle.src = images[idx + 1].url
          idx++
        } else {
          imgModalToggle.src = images[0].url
          idx = 0
        }
      }
    })
  }

  static closeModal (element) {
    let close = element.querySelector('.modal__close')

    close.addEventListener('click', e => {
      document.body.removeChild(element)
    })
  }
}
