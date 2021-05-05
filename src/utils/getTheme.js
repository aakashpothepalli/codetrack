
export default function getTheme(){
    if(typeof window ==='object'){
      let theme = localStorage.getItem('theme')
      if(theme){
        return theme
      }
      else {
        return 'light'
      }
    }
    else return 'light'
  }
