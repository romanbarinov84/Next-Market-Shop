import Image from 'next/image';
import Link from 'next/link';

const InputBlock = () => {
    return (
        <div className=" relative w-80">
            <div className="relative  rounded-sm border-2 border-(--color-primary) shadow-(--shadow-button-default) leading-2.5">
                <input
                    type="text"
                    placeholder="Знайти товар"
                    className="w-full h-10 py-2 px-4  outline-none  text-[#8f8f8f] text-base"
                />

                <Image
                    className="absolute top-2 right-2 "
                    src="/лого хедера/searchBtn-headerInput.svg"
                    alt="Searching-Пошук"
                    width={24}
                    height={24}
                />
                <div className="absolute top-full left-0 w-full mt-1 max-h-63 overflow-y-auto bg-white -border-4 border-gray-300 border-t-0 rounded-b-sm  shadow-lg z-10">
                    <div className="p-2 flex flex-col gap-2.5">
                        <div className="flex flex-col gap-2.5 mt-0.5">
                            <Link
                                href="#"
                                className="flex items-center justify-between p-2 gap-x-2 hover:bg-gray-100 rounded wrap-break-word cursor-pointer"
                            >
                                <span className="text-gray-700 font-medium wrap-break-word cursor-pointer">
                                    Категорія
                                </span>
                                <div className="relative w-6 h-6">
                                    <Image
                                        src="/icon-burger.png"
                                        alt="категорія"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </Link>

                            <ul className='flex flex-col '>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <Link
                                        href="#"
                                        className="flex items-start gap-x-4 wrap-break-word cursor-pointer"
                                    >
                                        Товар 1
                                    </Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <Link href="#" className="flex items-start gap-x-4 wrap-break-word cursor-pointer">Товар 2</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <Link href="#" className="flex items-start gap-x-4 wrap-break-word cursor-pointer">Товар 3</Link>
                                </li>
                            </ul>
                            <div>Товари по запиту...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputBlock;
