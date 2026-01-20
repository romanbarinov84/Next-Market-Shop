"use client";

import { PATH_TRANSLATIONS } from "@/UTILS/pathTranslations";
import Link from "next/link";
import { usePathname } from "next/navigation";




const BreadCrumbs = () => {
    const pathname = usePathname();

    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return {
            label: PATH_TRANSLATIONS[segment] || segment,
            href,
            isLast: index === segments.length - 1,
        };
    });

    breadcrumbs.unshift({
        label:"Головна",
        href:"/",
        isLast:false,
    })

    return (
        <nav aria-label="Breadcrumb" className="w-full overflow-x-auto">
            <ol className="flex items-center m-5 gap-2 text-sm text-gray-500 whitespace-nowrap">
                {breadcrumbs.map((item, index) => (
                    <li key={item.href} className="flex items-center gap-2">
                        {!item.isLast ? (
                            <>
                                <Link
                                    href={item.href}
                                    className="hover:text-orange-400 transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                                <span className="text-gray-400">/</span>
                            </>
                        ) : (
                            <span className="font-medium text-gray-900 truncate max-w-[140px] sm:max-w-none">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;
