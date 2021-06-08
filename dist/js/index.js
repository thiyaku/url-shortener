$( document ).ready(function() {
    $('.trigger').on('click', function() {
      $('.modal-wrapper').removeClass('open');
      return false;
    });
  });

const headers = {
   'Authorization': "193e7e796c9474b850a178d6a1e99f7caaee79ce",
   'Content-Type': 'application/json'
 };

 var longURL;

 function validateURL() {
   longURL = $('#url').val();

   if(longURL == ''){
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Please enter valid URL'
       });
   }

   else{

   regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
         if (regexp.test(longURL))
         {
            shortenURL();
         }
         else
         {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Please enter valid URL'
             });
           return false;
         }
      }
 }
 
 function shortenURL() {
   
   if (longURL) {
     fetch('https://api-ssl.bitly.com/v4/shorten', {
         method: 'POST',
         headers: headers,
         body: JSON.stringify({
           "long_url": longURL,
           "domain": "bit.ly"
         }),
       })
       .then(response => response.json())
       .then(data => {
         if(data.link == undefined){
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
               footer: 'Please try with http/https in URL.'
             })
         }
         else{
            Swal.fire({
               icon: 'info',
               showCancelButton: true,
               confirmButtonText: 'Copy URL',
               title: 'Your Shortened URL is',
               html:'<h1>'+data.link+'</h1>'
            }).then((result) => {
               if (result.isConfirmed) {
                 simplecopy(data.link);
                 Swal.fire({
                    icon:'success',
                    title:'Shortened URL copied to clipboard!',
                    timer: 2000 
                  })
               }
             })
         }
         $('#url').val('');
         return false;
       })
       .catch((error) => {
         console.log('Error:', error);
       });
 
   }
 
 }


 
 

// const clipboard = new ClipboardJS("#copy-btn");
 