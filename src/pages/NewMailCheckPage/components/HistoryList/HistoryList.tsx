import { Grid, List, ListItemText, Divider, ListItem, IconButton, Menu, MenuItem  } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { updateHistoryItem, type HistoryItemProps } from "../../../../redux/historySlice"
import type { MainRespone } from "../../NewMailCheckPage"
import "./HistoryList.css"
import { Fragment } from "react/jsx-runtime"
import { MoreVert } from "@mui/icons-material"
import { useState } from "react"
import { archiveHistoryItem } from "../../../../api/history"

type HistoryListProps = {
    onSelect: (val: MainRespone) => void
}

type SelectedHistoryItemMenu = {
    el: HTMLButtonElement,
    itemId: string
}

export default function HistoryList(props: HistoryListProps){

    const [historyItemMenu, setHistoryItemMenu] = useState<SelectedHistoryItemMenu | null>(null)

    const dispatch = useAppDispatch()
    const historyList = useAppSelector((state) => state.history)
    const token  = useAppSelector((state) => state.user.token)

     function selectItem(item: HistoryItemProps){
        const {summary, isScam} = item
        props.onSelect({summary, isScam})
    }

    function openMenu(el: HTMLButtonElement, itemId: string){
        setHistoryItemMenu({el, itemId})
    }

    async function handleArchiveHistoryItem() {
        if(!historyItemMenu?.itemId){return}
        try{
            await archiveHistoryItem(token ?? "", historyItemMenu.itemId)
        }
        catch(err){
            console.error(err);
        }
        finally{
            dispatch(updateHistoryItem({id: historyItemMenu.itemId, status: "archived"}))
            setHistoryItemMenu(null)
        }
    }

    function renderHistoryItemMenuAction(itemId: string){
        return <IconButton 
        onClick={(e) => {
            e.stopPropagation();
            openMenu(e.currentTarget, itemId);
            }} >
            <MoreVert />
        </IconButton>
    }

    function renderHistoryItemMenu(){
        return <Menu 
        anchorEl={historyItemMenu?.el} 
        open={Boolean(historyItemMenu)} 
        onClose={() => {setHistoryItemMenu(null)}}>
            <MenuItem onClick={handleArchiveHistoryItem}>Archive</MenuItem>
        </Menu>
    }


    function renderList(){
         return <Grid size={12}>
             <List>
            {historyList.filter(item => item.status !== "archived").map(item => <Fragment key={item.id}>
                <ListItem className="history-item-button" onClick={() => {selectItem(item)}} secondaryAction={renderHistoryItemMenuAction(item.id)}>
                <ListItemText className="history-item-button-text" secondary={"Here will be date"}>{item.summaryTitle}</ListItemText>
            </ListItem>
            <Divider />
            </Fragment>)}
        </List>
        </Grid>
    }

    return <Grid container>
                {renderList()}
                {renderHistoryItemMenu()}
            </Grid>
}