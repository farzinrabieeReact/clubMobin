import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { dateConvertMiladiToShamsi } from '../../../../common/method/date';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundColor:'#fff !important',
    },
    title: {
        minHeight:50,
        fontFamily: "iransans!important",
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxHeight: 110,
        minHeight: 110
    },
});

export default function SimpleCard({ data }) {

    const classes = useStyles();
    const { push } = useHistory();



    const handelRout = () => {
        push({
            pathname:'/notifications/detailes',
            state:{data:data}
        })
    }

    

    return (
        <Card className={`${classes.root} bg-light m-5 p-4 rounded`}>
            <CardContent>
                <Typography variant="h5" component="h2" className={`${classes.title} text-center mb-3`}>
                    {data.body.name}
                </Typography>
                <Typography color="textSecondary" className={`${classes.pos} d-flex justify-content-start mb-3`}>
                    <span>
                        {dateConvertMiladiToShamsi(data.body.start_time.split(' ')[0])}
                    </span>
                    {/* <span>
                        {data.body.start_time.split(' ')[1]}
                    </span> */}
                </Typography>
                <Typography component="p" className={`${classes['content']} text-justify`}>

                    <span style={{ whiteSpace: 'normal' }} dangerouslySetInnerHTML={{ __html: data.body.content }}></span>

                </Typography>
            </CardContent>
            <CardActions className={'text-right '} dir="ltr">
                <Button className={'text-success'} size="small" onClick={()=>handelRout()}>نمایش اعلان</Button>
            </CardActions>
        </Card>
    );
}
