import { Box, type BoxProps } from "@mui/material";
import IMLLoader from "../Loader/IMLLoader";
import type { PropsWithChildren } from "react";

type IMLPageProps = PropsWithChildren<{
    isLoading?: boolean;
} & BoxProps>

export default function IMLPage ({isLoading, children, ...props}: IMLPageProps){


    function renderLoader(){
        return <Box height={1} width={1} display="flex" justifyContent="center" alignItems="center">
            <IMLLoader variant="circular" height={80} width={80} />
        </Box>
    }

    return <Box {...props}>
        {isLoading && renderLoader()}
        {!isLoading && children}
    </Box>
}