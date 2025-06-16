import { useCallback, useEffect, useState } from "react"

export default function useIsMobile(breakPoint: number){
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < breakPoint)

    const handleResize = useCallback(() => {
         setIsMobile(window.innerWidth < breakPoint)
    }, [breakPoint])

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {window.removeEventListener("resize", handleResize)}
    }, [breakPoint, handleResize])

    return isMobile
}