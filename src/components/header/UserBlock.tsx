import Profile from "./Profile"
import TopMenu from "./TopMenu"



const UserBlock = () => {
  return (
    <div className="h-14 md:h-auto fixed bottom-0 left-0 right-0 md:static flex flex-row justify-between items-center w-full px-4 py-2 shadow-md md:shadow-none text-[8px] md:text-[12px] bg-white z-50">
       <TopMenu/>
        <Profile/>
    </div>
  )
}

export default UserBlock