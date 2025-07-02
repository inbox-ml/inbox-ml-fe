import { Grid, List, ListItemButton, ListItemText, Divider  } from "@mui/material"
import { useAppSelector } from "../../../../hooks/reduxHooks"
import type { HistoryItemProps } from "../../../../redux/historySlice"
import type { MainRespone } from "../../NewMailCheckPage"
import "./HistoryList.css"
import { Fragment } from "react/jsx-runtime"

type HistoryListProps = {
    onSelect: (val: MainRespone) => void
}

export default function HistoryList(props: HistoryListProps){

    const historyList = useAppSelector((state) => state.history)

     function selectItem(item: HistoryItemProps){
        const {summary, isScam} = item
        props.onSelect({summary, isScam})
    }


    function renderList(){
         return <Grid size={12}>
             <List>
            {historyList.map(item => <Fragment key={item.id}>
                <ListItemButton className="history-item-button" onClick={() => {selectItem(item)}}>
                <ListItemText className="history-item-button-text" secondary={"Here will be date"}>{item.summaryTitle}</ListItemText>
            </ListItemButton>
            <Divider />
            </Fragment>)}
        </List>
        </Grid>
    }

    return <Grid container>
                {renderList()}
            </Grid>
}