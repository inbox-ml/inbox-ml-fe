import { Button, Card, Fab, Grid, Skeleton, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import { Add, EmailOutlined } from "@mui/icons-material";
import "./NewMailCheckPage.css"
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../hooks/reduxHooks";
import MobileHistoryDrawer from "./components/MobileHistoryList/MobileHistoryDrawer";

type MainQueryProps = {
    fileBlob: string | ArrayBuffer | null
}

export type MainRespone = {
    summary: string;
    isScam: boolean;
}

export default function NewMailCheckPage(){


    const isMobile = useIsMobile(768)
    const fileFieldRef = useRef<HTMLInputElement | null>(null)
    const user = useAppSelector(state => state.user)

    const [response, setResponse] = useState<MainRespone | null>(null)

    const {data, isPending, isSuccess, mutate, isError} = useMutation({mutationFn: async (props: MainQueryProps): Promise<MainRespone> => {
        const res = await fetch(
                "http://127.0.0.1:8000/agent/summurize", 
                {
                    method: "POST", 
                    body: JSON.stringify({fileBlob: props.fileBlob}),
                    headers: {
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${user.token}`
                    }
                })
        return res.json()        
    }
})


    useEffect(() => {
        if(isSuccess && data){
            setResponse(data)
        }
    }, [data, isSuccess])

    function handleFileUpload(file?: File){
        if(!file){
            console.error("No file!");
            return;
        }
         const reader = new FileReader();
         reader.readAsDataURL(file)
         reader.onload = async () => {
            mutate({fileBlob: reader.result})
            if(fileFieldRef.current){fileFieldRef.current.value = ""}
         }
         reader.onerror = () => {
            console.log(reader.error)
         }
         
    }

    console.log({response, isPending, isSuccess, isError})


    function renderSideMenu(){
        return  <Grid size={{xl: 3, xs: 2}} height={1}>
            <Card elevation={0} sx={{width: 1, height: 1, background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                <Grid container height={1} p={2}>
                    <Grid size={12}>
                        {!isMobile && <Button fullWidth variant="contained" sx={{background: "rgba(61, 89, 233, 0.6)"}} onClick={() => {setResponse(null)}}>New Check</Button>}
                        {isMobile && <Fab size="small" sx={{background: "rgba(61, 89, 233, 0.6)", color: "white"}} onClick={() => {setResponse(null)}}><Add /></Fab>}
                        {isMobile && <MobileHistoryDrawer onSelect={(val) => setResponse(val)}  />}
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    }

    function renderPendingState(){

        const LINE_COUNT = 8

       return <Grid size={10} display="flex" height={1} alignItems="center" justifyContent="center">
         <Grid container alignItems="center" justifyContent="center" width={1} spacing={2}>
            <Grid size={12} display="flex" justifyContent="center">
                <Skeleton variant="circular" height="13rem" width="13rem" />
            </Grid>
           {new Array(LINE_COUNT).map((_, indx) => <Grid key={indx} size={8} display="flex" justifyContent="center">
                <Skeleton variant="text" width="100%" />
            </Grid>)}
        </Grid>
       </Grid>
    }

    function renderResponseState(){
        return <Grid size={10} display="flex" height={1} alignItems="center" justifyContent="center">
            <Grid container alignItems="center" justifyContent="center" width={1} spacing={2}>
                <Grid size={10}>
                    <Card elevation={0} className="new-mail-check-page-card response-card">
                        <Typography variant="body1" textAlign="justify">{response?.summary}</Typography>
                </Card>
                </Grid>
            </Grid>
        </Grid>
    }

    function renderLoadImageSection(){

        const classes = ["upload-image-card", "new-mail-check-page-card"]

        return <Grid size={{xl: 9, xs: 10}}>
            <Grid container height={1} alignItems="center" justifyContent="center">
                <Grid size={isMobile ? 9 : 4}>
                    <Card className={classes.join(" ")} elevation={0} onClick={() => {fileFieldRef.current?.click()}}>
                    <EmailOutlined sx={{fontSize: "10rem", color: "rgba(61, 89, 233, 0.6)"}} />
                    <input 
                    type="file" 
                    accept=".jpeg, .jpg, .png" 
                    ref={fileFieldRef} style={{display: "none"}} 
                    multiple={false}
                    onChange={(event) => {handleFileUpload(event.target.files?.[0])}} />
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    }

    return <Grid container height={1} p={2} className="new-mail-check-page">
       {renderSideMenu()}
       {isPending && renderPendingState()}
       {!response && renderLoadImageSection()}
       {response && renderResponseState()}
    </Grid>
}