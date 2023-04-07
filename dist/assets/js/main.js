let checkOneSizeLg = true
let checkOneSizeSm = true

const infoBenefits = document.querySelector('.info__benefits.info-benefits')
const infoFooter = document.querySelector('.info__footer')
const form = document.querySelector('.form')
const screenWidth = window.screen.width
let slides = document.querySelectorAll('.slide')
const sliderLine = document.querySelector('.slider-line')
const sliderNavigation = document.querySelector('.slider-navigation__number')
const contentBlockWrapper = document.querySelector('.content__block-wrapper')

let count = 0
let width

const height = {
	0: document.querySelector('.info__content').offsetHeight - 160,
	1: document.querySelector('.form.slide').offsetHeight - 20,
	2:
		document.querySelector('.info__benefits.info-benefits').offsetHeight +
		document.querySelector('.info__footer').offsetHeight +
		30,
}

function init(e) {
	if (e?.currentTarget?.innerWidth < 768 || e < 768) {
		form.insertAdjacentHTML('afterend', "<div class='numbers slide'></div>")
		const numbers = document.querySelector('.numbers')
		numbers.append(infoBenefits)
		numbers.append(infoFooter)
		checkOneSizeLg = false
	}

	if (e?.currentTarget?.innerWidth < 579 || e < 579) {
		if (checkOneSizeSm) {
			slides = document.querySelectorAll('.slide')
			document.querySelector('.slider-navigation__last-number').textContent =
				slides.length
			checkOneSizeSm = false
		}
		width = document.querySelector('.slider').offsetWidth
		sliderLine.style.width = width * slides.length + 'px'
		contentBlockWrapper.style.height = height[count] + 'px'
		slides.forEach(slide => {
			slide.style.width = width + 'px'
		})
		rollSlider()
		sliderNavigation.textContent = count === 0 ? '1' : count + 1
	}
}
addEventListener('resize', e => init(e))
init(screenWidth)

document
	.querySelector('.slider-navigation__prev')
	.addEventListener('click', () => {
		count--
		if (count < 0) {
			count = slides.length - 1
		}
		sliderNavigation.textContent = count + 1
		rollSlider()
	})

document
	.querySelector('.slider-navigation__next')
	.addEventListener('click', () => {
		count++
		if (count >= slides.length) {
			count = 0
		}
		sliderNavigation.textContent = count + 1
		document.querySelector('.content__block-wrapper').style.height =
			height[count] + 'px'
		rollSlider()
	})

function rollSlider() {
	sliderLine.style.transform = 'translate(-' + count * width + 'px)'
}