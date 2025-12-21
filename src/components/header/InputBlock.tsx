import Image from 'next/image';


const InputBlock = () => {
  return (
     <div className=" relative min-w-65  grow">
                <input
                    type="text"
                    placeholder="Знайти товар"
                    className="w-full h-10 rounded-sm py-2 px-4  outline-2  outline-(--color-primary) focus:shadow-(--shadow-button-default) text-[#8f8f8f] text-base leading-2.5"
                />
                <button className='absolute top-2 right-2 cursor-pointer'>
                    <Image
                        src="/лого хедера/searchBtn-headerInput.svg"
                        alt="Searching-Пошук"
                        width={24}
                        height={24}
                        
                    />
                </button>
            </div>
  )
}

export default InputBlock