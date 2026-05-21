import Image from "next/image"



const FavoriteButton = ({productId}:{productId:string}) => {
  return (
    <>

         <div className="relative w-5 h-5">
      <Image
        src="/ProductCard/Shape (Stroke).svg"
        alt="Обране"
        fill
        className="object-contain"
        sizes="24px"
      />
    </div>
    </>
  )
}

export default FavoriteButton