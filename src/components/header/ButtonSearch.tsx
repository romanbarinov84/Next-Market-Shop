
import Image from 'next/image';

const ButtonSearch = () => {
  return (
    <div>
         <button className="bg-(--color-primary) hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) text-white p-2 rounded-sm justify-between hidden md:flex w-10 cursor-pointer duration-300 lg:w-25">
                        <Image
                            src="/лого хедера/header-burger-btn.svg"
                            alt="Searching-Пошук"
                            width={24}
                            height={24}
                            className="hidden md:block"
                        />
                        <span className="text-base text-white hidden lg:block">
                            Каталог
                        </span>
                    </button>
    </div>
  )
}

export default ButtonSearch