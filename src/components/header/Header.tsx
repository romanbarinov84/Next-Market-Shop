import HeaderUserBlock from "./UserBlock"
import LogoBlock from "./LogoBlock"
import SearchBlock from "./SearchBlock"



function Header() {
  return (
    <header className="w-full bg-white md:shadow-(--shadow-default) items-center flex flex-col md:flex-row md:gap-y-5 xl:gap-y-7 md:gap-10 md:p-2 justify-center relative z-90">
        <div className="flex flex-row gap-4 xl:gap-10 py-2 px-4 items-center shadow-md md:shadow-none">
          <LogoBlock/>
        <SearchBlock/>  
        </div>
        
        <nav aria-label="Загальне меню">
          <HeaderUserBlock/>  
        </nav>
        
    </header>
  )
}

export default Header