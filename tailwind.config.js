const { max } = require('rxjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        auth_proceed_button_bg : "#588585",
        auth_proceed_button_text : "#044305",
      },
      screens: {
        "size2" : { max : "200px" },
        "size2.5" : { max : "250px" },
        "size3" : { max : "300px" },
        "size3.5" : { max : "350px" },
        "size4" : { max : "400px" },
        "size4.5" : { max : "450px" },
        "size5" : { max : "500px" },
        "size5.5" : { max : "550px" },
        "size6" : { max : "600px" },
        "size6.5" : { max : "650px" },
        "size7" : { max : "700px" },
        "size7.5" : { max : "750px" },
        "size8" : { max : "800px" },
        "size8.5" : { max : "850px" },
        "size9" : { max : "900px" },
        "size9.5" : { max : "950px" },
        "size10" : { max : "1000px" },
        "size10.5" : { max : "1050px" },
        "size11" : { max : "1100px" },
        "size11.5" : { max : "1150px" },
        "size12" : { max : "1200px" },
        "size12.5" : { max : "1250px" },
        "size13" : { max : "1300px" },
        "size13.5" : { max : "1350px" },
        "size14" : { max : "1400px" },
        "size14.5" : { max : "1450px" },
        "size15" : { max : "1500px" },
        "size15.5" : { max : "1550px" },
        "size16" : { max : "1600px" },
        "size16.5" : { max : "1650px" },
        "size17" : { max : "1700px" },
        "xs" : "390px",
        "sm" : "640px",
        "md" : "868px",
        "lg" : "1004px",
        "xl" : "1138px",
        "2xl" : "1536px",
        "xs_max" : { max : "390px" },
        "sm_max" : { max : "640px" },
        "md_max" : { max : "868px" },
        "lg_max" : { max : "1004px" },
        "xl_max" : { max : "1138px" },
        "2xl_max" : { max : "1536px" }
      },
      fontFamily : {
        defaultFont :['Roboto Mono'],
        inter : ["Inter"]
      }
    },
  },
  plugins: [],
}

