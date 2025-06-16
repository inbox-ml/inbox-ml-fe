import { Card, type CardProps } from "@mui/material"
import "./IMLCard.css"

type IMLCardProps = {} & React.PropsWithChildren & Omit<CardProps, "elevation">

export default function IMLCard({children, className, ...rest}: IMLCardProps){
    return <Card elevation={0} className={`iml-card ${className ?? ""}`} {...rest}>
        {children}
    </Card>
}