import { History } from "@mui/icons-material"
import { Drawer, Fab, Grid } from "@mui/material"
import "./MobileHistoryDrawer.css"
import { useState } from "react"

export default function MobileHistoryDrawer(){

    const [open, setOpen] = useState<boolean>(false)

    function toggleDrawer(){
        setOpen(prev => !prev)
    }

    function renderHistoryMenuAction(){
        return <Fab size="small" className="history-list-fab-btn" onClick={toggleDrawer}><History /></Fab>
    }

    function renderDrawer(){
        return <Drawer open={open} onClose={toggleDrawer}>
            <Grid container width="200px"></Grid>
        </Drawer>
    }

    return <>
        {renderHistoryMenuAction()}
        {renderDrawer()}
    </>
}