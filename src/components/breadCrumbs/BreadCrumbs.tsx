"use client"

import { usePathname } from "next/navigation"

const BreadCrumbs = () => {

    const pathName = usePathname();

    if(pathName === "/") return null;

    const pathSegments = pathName.split("/").filter((segment) => segment !== "");
  return (
    <div></div>
  )
}

export default BreadCrumbs