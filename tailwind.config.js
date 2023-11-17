/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      
      boxShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": ["0 35px 35px -15px rgba(0, 0, 0, 0.25)"],
      },
      animation: {
        reveal: "reveal 0.5s ease-in-out forwards",
        slideUp:"slideUp 1s ease-in-out forwards",
        slideTop:"slideTop 1s ease-in-out forwards",
        slideBottom:"slideBottom 1s ease-in-out forwards",
        slideLeft:"slideLeft 1s ease-in-out forwards",
        modal:"modal 0.7s ease-in-out forwards",
        shine: 'shine 1s ease-in forwards',
        wiggle: 'wiggle 1s ease-in-out infinite',


      },
      keyframes: {
        reveal: {
          "0%": {
            transform: "scale(0)",
            opacity: 0,
            
          },
          "50%": {
            transform: "scale(0.7)",
            opacity: 0.8,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(30px)",
            // opacity: 0,
            transform:"scale(0.7)",
          },
          
          "100%": {
            transform: "translateY(0)",
            // opacity: 1,
            transform:"scale(1)",
          },
        },
        slideTop: {
          "0%": {
            transform: "translateY(-100%)",
            
            // transform:"scale(0.7)",
          },
          
          "100%": {
            transform: "translateX(0)",
            
            // transform:"scale(1)",
          },
        },
        slideBottom: {
          "0%": {
            transform: "translateY(10%)",
            
            // transform:"scale(0.7)",
          },
          
          "100%": {
            transform: "translateX(0)",
            
            // transform:"scale(1)",
          },
        },
        slideLeft: {
          "0%": {
            transform: "translateX(-100%)",
          
            // transform:"scale(0.7)",
          },
          
          "100%": {
            transform: "translateX(0)",
           
            // transform:"scale(1)",
          },
        },
        modal: {
          "0%": {
            transform: "translateY(-100px)",
            opacity: 0,
            transform:"scale(0)",
          },
          
          
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
            transform:"scale(1)",
          },
        },
        shine: {
          '100%': { left: '50%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        }
      },
    },
    plugins: [],
  },
  plugins: [],
}
