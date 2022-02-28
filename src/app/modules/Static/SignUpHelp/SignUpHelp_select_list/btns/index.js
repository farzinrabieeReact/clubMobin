import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Modal } from "react-bootstrap";

const useStyles = makeStyles(theme => ({
  btnActive: {
    width: "150px",
    height: "40px",
    backgroundColor: "#ff5f00",
    color: "white",
    border: "none",
    borderRadius: "10px",
    transition: "all .4s"
  },
  btn: {
    width: "150px",
    height: "40px",
    backgroundColor: "white",
    color: "gray",
    border: "none",
    borderRadius: "10px"
  }
}));

const Btns = ({ btn, state, setState, id, disable }) => {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const handleClick = id => {
    if (id > 0 && disable === "disabled") {
      setShow(true);
      setState(0);
    }

    setState(id);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <button
        className={
          state === id ? `${classes["btnActive"]} ` : `${classes["btn"]}`
        }
        onClick={() => handleClick(id)}
      >
        {btn.item}
      </button>
      <Modal show={show} onHide={() => handleClick(id)} className="rounded-lg">
        <Modal.Header closeButton>
          <Modal.Title> اخطار</Modal.Title>
        </Modal.Header>
        <Modal.Body>در حال حاضر فعال نمی باشد</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Btns;
