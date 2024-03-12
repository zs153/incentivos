const getCookie = (key) => {
  let value = ''
  document.cookie.split(';').forEach((e) => {
    if (e.includes(key)) {
      value = e.split('=')[1]
    }
  })
  return value
}
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const deleteCookie = () => {
  document.cookie = 'filtro=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;'
}
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');
  errorDisplay.innerText = '';
  inputControl.classList.add('is-valid');
  element.classList.remove('is-invalid');
}
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');
  errorDisplay.innerText = message;
  element.classList.add('is-invalid');
  inputControl.classList.remove('is-valid');
}

const nifent = document.getElementById('nifent')
const desent = document.getElementById('desent')
const adment = document.getElementById('adment')
const obsent = document.getElementById('obsent')
const cbosta = document.getElementById('cbosta')

const validate = () => {
  const nifentValue = nifent.value.trim()
  const desentValue = desent.value.trim()
  const admentValue = adment.value.trim()
  const obsentValue = obsent.value.trim()
  const cbostaValue = cbosta.value

  if (nifentValue === '') {
    setError(nifent, 'CIF requerido')
    setTimeout(function () {
      setSuccess(nifent)
    }, 3000)
    return false
  }
  if (desentValue === '') {
    setError(desent, 'Nombre entidad')
    setTimeout(function () {
      setSuccess(desent)
    }, 3000)
    return false
  }
  if (admentValue === '') {
    setError(adment, 'Administración requerida')
    setTimeout(function () {
      setSuccess(adment)
    }, 3000)
    return false
  }
  if (obsentValue === '') {
    setError(obsent, 'Observación requerida')
    setTimeout(function () {
      setSuccess(obsent)
    }, 3000)
    return false
  }
  if (cbostaValue === '0') {
    setError(cbosta, 'Consta en el 182 requerido')
    setTimeout(function () {
      setSuccess(cbosta)
    }, 3000)
    return false
  }
  
  return true
}