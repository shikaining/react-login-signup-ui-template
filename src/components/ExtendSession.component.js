import React, { useEffect, useState } from 'react';
import Countdown from "react-countdown";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function ExtendSession() {


    const url = "http://expressbackend-env.eba-mmzyvbbv.us-east-1.elasticbeanstalk.com/extendSession";
    const authToken = window.localStorage.getItem("Auth-Token");

    const [expiryDate, setExpiryDate] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = useState(0);

    function renderModal(e) {
        setOpen(true);
    }

    function closeModal(e) {
        setOpen(false);
    }

    function continueHandler(e) {
        e.preventDefault();
        fetch(
            url, {
            headers:
            {
                Authorization: `Bearer ${authToken}`,
            },
        }
        )
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                window.localStorage.setItem("Auth-Token", data);
                window.localStorage.setItem("expiryDate", new Date(new Date().getTime() + 10 * 60 * 1000));
                setCount(count + 1);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
            });


    };

    useEffect(() => {
        let countDownTime = window.localStorage.getItem("expiryDate");
        if (countDownTime != null) {
            setExpiryDate(new Date(countDownTime));
        }
    }, [count]);

    return (
        <div>
            <Countdown date={expiryDate} onComplete={renderModal} />
            <Dialog
                open={open}
                onClose={closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Would you like to continue the session?</DialogTitle>

                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Log off</Button>
                    <Button onClick={continueHandler} color="primary" autoFocus>
                        Continue</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ExtendSession;
