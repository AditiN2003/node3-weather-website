console.log('js')

//making http request from client side javascript - use fetch api - browser based api not part of js
//fetch takes in a string - url where you trying to get the data from and then method
//can use response to extract data or dump it in the browser




//to get input from the form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

// message1.textContent='w'

//adding event listener to submit the form
weatherForm.addEventListener('submit',(e) => {//runs everysingle time the form is submited 
   e.preventDefault()//prevents form from refreshing

   const location = search.value//extracts the vslue from input
   message1.textContent = 'loading message...'
   message2.textContent = ''
   fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            message1.textContent=data.error
        }else{
            message2.textContent = 'Forecast: ' + data.forecast 
            message1.textContent=' Location: ' + data.location
        }
    })
})
})

//web servr just comunicates-like a receptionist
//it takes an a request, checks fpr a route and sends a messaage back; the javascript code gets info 
//research about SQL and NON SQL