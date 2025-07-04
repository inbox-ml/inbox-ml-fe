import { Skeleton, type SkeletonProps } from "@mui/material";

type IMLLoaderProps = SkeletonProps

export default function IMLLoader(props: IMLLoaderProps){
    return <Skeleton {...props} />
}