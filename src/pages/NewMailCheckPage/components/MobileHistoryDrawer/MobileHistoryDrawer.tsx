import { History } from "@mui/icons-material"
import { Drawer, Fab} from "@mui/material"
import {useState} from "react"
import type { MainRespone } from "../../NewMailCheckPage"
import HistoryList from "../HistoryList/HistoryList"
import "./MobileHistoryDrawer.css"

type MobileHistoryDrawerProps = {
    onSelect: (val: MainRespone) => void
}

export default function MobileHistoryDrawer(props: MobileHistoryDrawerProps){

    const [open, setOpen] = useState<boolean>(false)

    function toggleDrawer(){
        setOpen(prev => !prev)
    }

    function selectItem(item: MainRespone){
        props.onSelect(item)
        toggleDrawer()
    }

    function renderHistoryMenuAction(){
        return <Fab size="small" className="history-list-fab-btn" onClick={toggleDrawer}><History /></Fab>
    }

    function renderDrawer(){
        return <Drawer open={open} onClose={toggleDrawer} sx={{width: "300px"}}>
           <HistoryList onSelect={selectItem} />
        </Drawer>
    }

    return <>
        {renderHistoryMenuAction()}
        {renderDrawer()}
    </>
}