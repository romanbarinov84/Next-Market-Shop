
import { GridCategoryBlockProps } from '@/src/types/categoryBlockProps';
import Image from 'next/image';
import Link from 'next/link';

const GridCategoryBlock = ({id , title , img}:GridCategoryBlockProps) => {
    return (
        
            <Link
                href={`category-${id}`}
                className="block h-full mb-2 relative overflow-hidden rounded-lg shadow-md group hover:shadow-xl transition-shadow duration-300"
            >
                <div className="relative w-full h-48 md:h-56 lg:h-64">
                    <Image
                        src={img}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                    <div
                        className="
                                      absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-t from-orange-800/20 via-red-500/20 to-transparent
                                      "
                    ></div>
                    <div className="absolute left-2.5 bottom-2.5 flex items-center">
                        <span className="text-[#fefefe] text-lg font-bold">
                            {title}
                        </span>
                    </div>
                </div>
            </Link>
        
    );
};

export default GridCategoryBlock;
