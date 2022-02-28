import { Tooltip } from "@material-ui/core";
import React from "react";

// let useStyles = makeStyles(theme => ({
//   header: {
//     width: "100%",
//     height: 70,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//     padding: "0 10px",
//     boxShadow: "rgba(0, 0, 0, 0.15) 3px 3px 7px",
//     borderRadius: "0 0 10px 10px"
//   },
//   icons: {
//     width: "80%",
//     display: "flex",
//     justifyContent: "flex-end"
//   },
//   menuIcon: {
//     width: 30,
//     height: 30,
//     cursor: "pointer",
//     marginRight: 15
//   },
//   menuIcon2: {
//     width: 30,
//     height: 30,
//     cursor: "pointer",
//     marginRight: 15,
//     transform: "rotate(180deg)"
//   },
//   btn: {
//     border: "1px solid #ff5f00",
//     backgroundColor: "white",
//     color: "#ff5f00",
//     marginTop: "auto",
//     padding: "5px 8px",
//     borderRadius: 8,
//     width: "",
//     "&:hover": {
//       backgroundColor: "#ff5f00",
//       color: "white"
//     }
//   },
//   anime: {
//     // animation: `$myEffectExit 1000ms `,
//     visibility: "hidden",
//     opacity: 0,
//     // backgroundColor:'red'
//     transition: "all 0.5s"
//   },

//   // media:{
//   //   ['@media (max-width:576px)']: {
//   //     height:'100vh',
//   //   },
//   // },
//   animatedItem: {
//     animation: `$myEffect 500ms `,
//     display: "flex",
//     alignItems: "center"
//   },

//   "@keyframes myEffect": {
//     "0%": {
//       visibility: "hidden",
//       opacity: 0
//     },
//     "100%": {
//       visibility: "visibale",
//       opacity: 1
//     }
//   },

//   // animatedItemExit: {
//   //   animation: `$myEffectExit 1000ms `,
//   //   display: "flex",
//   //   alignItems: "center",
//   // },

//   "@keyframes myEffectExit": {
//     "0%": {
//       visibility: "hidden",
//       opacity: 0
//     },
//     "100%": {
//       visibility: "visibale",
//       opacity: 1
//     }
//   }
// }));

const Index = ({ handleSort, directionSort }) => {
  // const classes = useStyles();
  return (
    <>
      <div>
        {directionSort === "null" && (
          <>
            <Tooltip title="مرتب سازی براساس امتیاز" placement="bottom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
                color="black"
                className="bi bi-filter-left font-weight-bolder"
                onClick={() => handleSort()}
              >
                <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            </Tooltip>
          </>
        )}
        {directionSort === "up" && (
          <>
            <Tooltip title="مرتب سازی براساس امتیاز" placement="bottom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                fill="currentColor"
                className="bi bi-sort-up"
                viewBox="0 0 16 16"
                onClick={() => handleSort()}
                color="black"
              >
                <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
              </svg>
            </Tooltip>
          </>
        )}
        {directionSort === "down" && (
          <>
            <Tooltip title="مرتب سازی براساس امتیاز" placement="bottom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                fill="currentColor"
                className="bi bi-sort-down"
                viewBox="0 0 16 16"
                onClick={() => handleSort()}
                color="black"
              >
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
              </svg>
            </Tooltip>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
