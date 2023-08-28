export const addClass = (element, customClass) => {
  if (customClass) {
    element.classList.add(...customClass.split(' '))
  }
}

export const removeClass = (element, customClass) => {
  if (customClass) {
    element.classList.remove(...customClass.split(' '))
  }
}

export default {
  addClass,
  removeClass
}
