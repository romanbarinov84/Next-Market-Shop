import { Article } from '@/src/types/articles';
import Image from 'next/image';

const ArticleCard = ({img,title,text}:Article) => {
  return (
    <div>
           <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
                                            <div className="relative h-48 w-full">
                                                <Image
                                                    src={img}
                                                    alt={title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                                />
                                            </div>
        
                                            <div className="p-5 flex flex-col flex-grow">
                                                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                                                    {title}
                                                </h3>
        
                                                <p className="text-sm text-zinc-600 mb-4 line-clamp-3">
                                                    {text}
                                                </p>
        
                                                <button className="mt-auto text-sm font-medium text-indigo-600 hover:underline">
                                                    Читати далі →
                                                </button>
                                            </div>
                                        </div>
    </div>
  )
}

export default ArticleCard