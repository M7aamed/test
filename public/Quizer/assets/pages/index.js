var sendEmail = document.getElementById("btn-send") ; 

sendEmail.addEventListener("click" , () => {
    console.log(1);
    Swal.fire({
        title: "Send Email Success",
        icon: "success"
      });
}) ;

