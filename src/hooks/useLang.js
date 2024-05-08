


const useLang = () => {
  let lang = localStorage.getItem('lang')
  if (lang === "english") return true
  else return false
}

export default useLang
