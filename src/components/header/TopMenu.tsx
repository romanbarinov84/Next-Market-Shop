import Image from 'next/image';


const TopMenu = () => {
  return (
    <div>
        <ul className='flex flex-row gap-x-6 items-end'>
            <li className='flex flex-col md:hidden items-center gap-2  w-11 cursor-pointer'>
                <Image 
                src="/лого хедера/HeaderBtnCatalog.svg" 
                alt='Каталог'
                width={24}
                height={24}
                className='object-contain w-6 h-6'/>
                <span>Каталог</span>
            </li>
            <li className='flex flex-col items-center gap-2  w-11 cursor-pointer'>
                <Image 
                src="/лого хедера/HeaderUserBockHeart.svg" 
                alt='Обранне'
                width={24}
                height={24}
                className='object-contain w-6 h-6'/>
                <span>Обранне</span>
            </li>
            <li className='flex flex-col items-center gap-2  w-11 cursor-pointer'>
                <Image 
                src="/лого хедера/HeaderUserBlockBox.svg" 
                alt='Замовлення'
                width={24}
                height={24}
                className='object-contain w-6 h-6'/>
                <span>Замовлення</span>
            </li>
            <li className='flex flex-col items-center gap-2  w-11 cursor-pointer'>
                <Image 
                src="/лого хедера/HeaderUserBlockCartBox.svg" 
                alt='Кошик'
                width={24}
                height={24}
                className='object-contain w-6 h-6'/>
                <span>Кошик</span>
            </li>
          
        </ul>
    </div>
  )
}

export default TopMenu