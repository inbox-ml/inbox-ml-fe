import { Circle, History } from "@mui/icons-material"
import { Drawer, Fab, Grid, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import "./MobileHistoryDrawer.css"
import {useState} from "react"
import { useAppSelector } from "../../../../hooks/reduxHooks"
import type { MainRespone } from "../../NewMailCheckPage"
import type { HistoryItemProps } from "../../../../redux/historySlice"

type MobileHistoryDrawerProps = {
    onSelect: (val: MainRespone) => void
}

export default function MobileHistoryDrawer(props: MobileHistoryDrawerProps){

    const historyList = useAppSelector((state) => state.history)

    const [open, setOpen] = useState<boolean>(false)

    function toggleDrawer(){
        setOpen(prev => !prev)
    }

    function selectItem(item: HistoryItemProps){
        const {summary, isScam} = item
        props.onSelect({summary, isScam})
        toggleDrawer()
    }

    function renderHistoryMenuAction(){
        return <Fab size="small" className="history-list-fab-btn" onClick={toggleDrawer}><History /></Fab>
    }

    function renderList(){
        return <Grid size={12}>
             <List>
            {historyList.map(item => <ListItemButton className="history-item-button" key={item.id} onClick={() => {selectItem(item)}}>
                <ListItemIcon><Circle fontSize="small" /></ListItemIcon>
                <ListItemText className="history-item-button-text" secondary={"Here will be date"}>{item.summaryTitle}</ListItemText>
            </ListItemButton>)}
        </List>
        </Grid>
    }

    function renderDrawer(){
        return <Drawer open={open} onClose={toggleDrawer}>
            <Grid container width="300px">
                {renderList()}
            </Grid>
        </Drawer>
    }

    return <>
        {renderHistoryMenuAction()}
        {renderDrawer()}
    </>
}