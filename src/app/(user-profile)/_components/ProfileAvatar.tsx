import Image from "next/image"



const ProfileAvatar = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <Image src="" 
         width={128}
         height={128}
         alt="Profile Avatar"
         className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
         priority/>
        <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-green-500 duration-300">
            <input type="file" 
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            />
        </label>
      </div>
    </div>
  )
}

export default ProfileAvatar