var originURL = window.location.origin;

const logo = document.getElementById('logoimg');
const productName = document.getElementById('productName');

logo.addEventListener('click' , () =>{
  console.log('test')
  document.location.href = originURL;
});

productName.addEventListener('click' , () =>{
  console.log('test')
  document.location.href = originURL;
});