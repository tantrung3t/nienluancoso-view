import { useHistory } from "react-router";


export default function ListItem(props){
    const history = useHistory();

    return(
        <li className="link" onClick={() => {
            history.push("/"+ props.chude +"/"+ props.machudebaiviet)
            // window.location.reload();
          }}>
            {props.tenchudechinh}
        </li>
    )
}