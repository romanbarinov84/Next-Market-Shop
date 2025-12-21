import Link from 'next/link';
import Image from 'next/image';

const LogoBlock = () => {
  return (
    <Link
      href="/"
      className="flex flex-row  items-center cursor-pointer"
    >
      {/* Логотип */}
      <div className="relative w-10 h-8 md:w-12 md:h-10 xl:w-40 xl:h-30">
        <Image 
          src="/лого хедера/logo-1.png" 
          alt="Galya-Baluvanna" 
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
        />
      </div>
       <div className="relative w-10 h-8 md:w-12 md:h-10 xl:w-60 xl:h-30">
        <Image 
          src="/лого хедера/галя-балуванна-логотип.jpg" 
          alt="Galya-Baluvanna" 
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
        />
      </div>

     
      
    </Link>
  );
};

export default LogoBlock;
