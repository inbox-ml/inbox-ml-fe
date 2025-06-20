import { Button, Card, Fab, Grid, Skeleton, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import { Add, EmailOutlined } from "@mui/icons-material";
import "./NewMailCheckPage.css"
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../hooks/reduxHooks";

type MainQueryProps = {
    fileBlob: string | ArrayBuffer | null
}

type MainRespone = {
    summary: string;
    is_scam: boolean
}

export default function NewMailCheckPage(){


    const isMobile = useIsMobile(768)

    const fileFieldRef = useRef<HTMLInputElement | null>(null)

    const user = useAppSelector(state => state.user)

    console.log({user})

    const {data, isPending, isSuccess, mutate, isError, reset} = useMutation({mutationFn: async (props: MainQueryProps): Promise<MainRespone> => {
        const res = await fetch(
                "http://127.0.0.1:8000/agent/summurize", 
                {
                    method: "POST", 
                    body: JSON.stringify({fileBlob: props.fileBlob}),
                    headers: {"Content-Type": "application/json"}
                })
        return res.json()        
    }
})

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

    console.log({data, isPending, isSuccess, isError})


    function renderSideMenu(){
        return  <Grid size={{xl: 3, xs: 2}} height={1}>
            <Card elevation={0} sx={{width: 1, height: 1, background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                <Grid container height={1} p={2}>
                    <Grid size={12}>
                        {!isMobile && <Button fullWidth variant="contained" sx={{background: "rgba(61, 89, 233, 0.6)"}} onClick={reset}>New Check</Button>}
                        {isMobile && <Fab size="small" sx={{background: "rgba(61, 89, 233, 0.6)", color: "white"}}><Add /></Fab>}
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
                        <Typography variant="body1" textAlign="justify">{data?.summary}</Typography>
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
       {!isPending && !data && renderLoadImageSection()}
       {isSuccess && data && renderResponseState()}
    </Grid>
}