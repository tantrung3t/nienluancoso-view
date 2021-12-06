
import { useHistory } from "react-router";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import "./News.css";

export default function News(props) {
    let history = useHistory();

    const readNews = () => {
        history.push("/" + props.id)
    }

    return (
        <div className="frame" onClick={readNews}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image = {props.src}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                    {props.title}
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                    {props.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}