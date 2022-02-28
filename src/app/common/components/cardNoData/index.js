import React, { useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        textAlign: "right",
    },

});



export default function OutlinedCard({ text }) {

    const classes = useStyles();
    const [state, setstate] = useState('در حال بارگذاری...')

    useEffect(() => {
        setTimeout(() => {
            setstate("داده ای برای نمایش وجود ندارد.")
        }, 5000);
    }, [])

    return (
        <Card className={`${classes.root} `} variant="outlined">
            <CardContent>
                <Typography variant="inherit" component="h5">
                    {text ? text :state }
                </Typography>
            </CardContent>
        </Card>
    );
}
