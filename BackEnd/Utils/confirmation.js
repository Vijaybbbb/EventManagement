const juice = require('juice');

const htmlContent = (email,ticket) =>{ 
  return`
<html>
<head>
    <title>Ticket Confirmation Email</title>
</head>
<body>
<div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4" style="font-family: sans-serif; min-width: 100%; min-height: 100%; background-color: #f3f4f6; padding-top: 2rem; padding-right: 1rem; padding-bottom: 2rem; padding-left: 1rem;">

<div class="mail__wrapper max-w-md mx-auto">

  <div class="mail__content bg-white p-8 shadow-md" style="background-color: #ffffff; padding-top: 2rem; padding-right: 2rem; padding-bottom: 2rem; padding-left: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);">

    <div class="content__header text-center tracking-wide border-b" style="text-align: center; letter-spacing: 0.05em; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cbd5e0;">
      <div class="text-red text-sm font-bold" style="color: #e53e3e; font-size: 0.875rem; font-weight: 700;">EVENTSZO</div>
      <h1 class="text-3xl h-48 flex items-center justify-center" style="font-size: 1.875rem; height: 12rem; display: flex; align-items: center; justify-content: center;">Ticket Confirmation</h1>
    </div>

    <div class="content__body py-8 border-b" style="padding-top: 2rem; padding-bottom: 2rem; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #cbd5e0;">
      <p>
        Hey, <br><br>We're thrilled to inform you that your ticket reservation has been successfully confirmed! Get ready for an unforgettable experience ahead.
      </p>
      <p>
        Event Name : ${ticket?.eventName}
      </p>
      <p>
         Organiser : ${ticket?.organizer}
      </p>
      <p>
        Ticket Price : ${ticket?.price}
      </p>
      <p>
      Ticket Tyoe: ${ticket?.ticketType}
       </p>
    
      <button class="text-white text-sm tracking-wide bg-red rounded w-full my-8 p-4 " style="color: #ffffff; font-size: 0.875rem; letter-spacing: 0.025em; background-color: #e53e3e; border-radius: 0.375rem; width: 100%; margin-top: 2rem; padding-top: 1rem; padding-right: 2rem; padding-bottom: 1rem; padding-left: 2rem;">TICKET CONFIRMED</button>
      <p class="text-sm" style="font-size: 0.875rem;">
        Keep Rockin'!<br> Your Eventszo team
      </p>
    </div>

    <div class="content__footer mt-8 text-center text-grey-darker" style="margin-top: 2rem; text-align: center; color: #4a5568;">
      <h3 class="text-base sm:text-lg mb-4" style="font-size: 1.125rem; margin-bottom: 1rem;">Thanks for using Eventszo !</h3>
      <p>www.Eventszo.io</p>
    </div>

  </div>

  <div class="mail__meta text-center text-sm text-grey-darker mt-8" style="text-align: center; font-size: 0.875rem; color: #4a5568; margin-top: 2rem;">

    <div class="meta__social flex justify-center my-4" style="display: flex; justify-content: center; margin-top: 1rem;">
      <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline" style="display: flex; align-items: center; justify-content: center; margin-right: 1rem; background-color: #000000; color: #ffffff; border-radius: 9999px; width: 2rem; height: 2rem; text-decoration: none;"><i class="fab fa-facebook-f"></i></a>
      <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline" style="display: flex; align-items: center; justify-content: center; margin-right: 1rem; background-color: #000000; color: #ffffff; border-radius: 9999px; width: 2rem; height: 2rem; text-decoration: none;"><i class="fab fa-instagram"></i></a>
      <a href="#" class="flex items-center justify-center bg-black text-white rounded-full w-8 h-8 no-underline" style="display: flex; align-items: center; justify-content: center; background-color: #000000; color: #ffffff; border-radius: 9999px; width: 2rem; height: 2rem; text-decoration: none;"><i class="fab fa-twitter"></i></a>
    </div>

    <div class="meta__help" style="margin-top: 1rem;">
      <p class="leading-loose">
        Questions or concerns? <a href="#" class="text-grey-darkest" style="color: #4a5568;">help@Eventszo.io</a>

        <br> Want to quit getting updates? <a href="#" class="text-grey-darkest" style="color: #4a5568;">Unsubscribe</a>
      </p>
    </div>

  </div>

</div>

</div>
</body>
</html>

`;
}

module.exports = { htmlContent };
