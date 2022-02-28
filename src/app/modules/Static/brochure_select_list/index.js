import React, { useEffect } from "react";
import BoxImage from "./boximage";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/static/brochure/brochure_select_list";
import { makeStyles } from '@material-ui/styles';
let useStyles = makeStyles({
  root : {
    display: 'flex',
    justifyContent:'center',
    flexWrap:'wrap',
  },
  children : {
    display: 'flex',
    justifyContent:'space-around',
    flexWrap:'wrap',
    width:'100%',
    padding:30,
  }
})
const Brochure = () => {
  const classes = useStyles();

  const allData = useSelector(state => state.reducer_brochure_select_list);

  let dataa = allData.data[0]
    ? JSON.parse(allData.data[0]?.body.content)
    : null;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actionTypes.brochureAsync });
  }, []);

  if (!dataa) {
    return null;
  }

  return (
    <div className={`${classes.root} container px-20`}>
      <div className={classes.children}> 
        {dataa.map((item, index) => (
          <BoxImage key={index} item={item}/>
        ))}
      </div>
    </div>
  );
};

export default Brochure;
