import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useRef } from 'react';

const useStyles = makeStyles(() => ({
    smsCodeVerification: {
        border: "1px solid #ef6d22",
        margin: "30px auto 0 auto",
        width: 170,
        height: 57,
        textAlign: "center",
        direction: "rtl",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        fontSize: 20,
        "& input": {
            fontSize: "20px !important",
            height: 20,
            textAlign: "center",
            width: 20,
            border: 0,
            "&:focus": {
                border: 0,
                fontSize: 20,
                outline: 0
            },
            "&::placeholder": {
                color: "black",
                position: "relative",
                top: -5
            }

        }
    },
}))



export default function Otp({ InputSmsCode, setInputSmsCode, numberOtp }) {
    const classes = useStyles()
    const refOneNode = useRef()

    const handelSmsCode = () => {
        const form = document.querySelector('[name="verifyForm"]');
        const inputs = form.querySelectorAll(".inputs input");

        const formData = new FormData();

        function shouldSubmit() {
            return [...inputs].every((input) => input.value.length > 0);
        }

        function handleSubmit(e) {
            e.preventDefault();

            if (shouldSubmit()) {
                const code = [...formData.values()].join("");
                alert(`CODE ${code} VERIFIED!`);
            }
        }

        function handleInput(e) {
            // check for data that was inputted
            // if there is a next input, focus on it
            const input = e.target;
            if (input.value) {
                formData.append(input.name, input.value);

                if (input.nextElementSibling) {
                    input.nextElementSibling.focus();
                }
            }
        }

        function handleFocus(e) {
            if (e.target.value) {
                e.target.select();
            }
        }

        function handlePaste(e) {
            const paste = e.clipboardData.getData("text");
            // loop over each input and populate with the index of that string
            inputs.forEach((input, i) => {
                input.value = paste[i] || "";
                formData.set(input.name, input.value);
            });

            if (shouldSubmit()) {
                handleSubmit();
            }
        }

        function handleKeyDown({ key, target }) {
            if (key !== "Backspace") {
                return;
            } else if (target.previousElementSibling) {
                formData.delete(target.name);
                target.value = "";
                // target.previousElementSibling.focus();
                refOneNode.current.focus()
            }
        }

        inputs[0].addEventListener("paste", handlePaste);

        form.addEventListener("input", handleInput);
        form.addEventListener("focusin", handleFocus);
        form.addEventListener("keydown", handleKeyDown);
        form.onsubmit = handleSubmit;
    };

    const handleChangeSmsCodeInput = (value, type) => {
        if (value === " " || value === "") {
            setInputSmsCode(() => ({
                1: "",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
            }));
        } else {
            setInputSmsCode((prev) => ({
                ...prev,
                [type]: value.toString(),
            }));
        }

    };

    return (
        <section className={classes.smsCodeVerification}>
            <div className="w-100">
                <form name="verifyForm" onClick={() => handelSmsCode()}>
                    <div className="inputs d-flex justify-content-center align-content-center w-100">
                        <input
                            type="text"
                            name="n1"
                            maxLength="1"
                            className="ml-2"
                            value={InputSmsCode["1"]}
                            onChange={(e) => handleChangeSmsCodeInput(e.target.value, 1)}
                            placeholder="_"
                            ref={refOneNode}
                        />
                        <input
                            type="text"
                            name="n2"
                            maxLength="1"
                            className="ml-2"
                            value={InputSmsCode["2"]}
                            onChange={(e) => handleChangeSmsCodeInput(e.target.value, 2)}
                            placeholder="_"
                        />
                        <input
                            type="text"
                            name="n3"
                            maxLength="1"
                            className="ml-2"
                            value={InputSmsCode["3"]}
                            onChange={(e) => handleChangeSmsCodeInput(e.target.value, 3)}
                            placeholder="_"
                        />
                        <input
                            type="text"
                            name="n4"
                            maxLength="1"
                            value={InputSmsCode["4"]}
                            onChange={(e) => handleChangeSmsCodeInput(e.target.value, 4)}
                            placeholder="_"
                        />
                        <input
                            type="text"
                            name="n5"
                            maxLength="1"
                            value={InputSmsCode["5"]}
                            onChange={(e) => handleChangeSmsCodeInput(e.target.value, 5)}
                            placeholder="_"
                        />
                        {
                            numberOtp === 6 && (
                                <input
                                    type="text"
                                    name="n6"
                                    maxLength="1"
                                    value={InputSmsCode["6"]}
                                    onChange={(e) => handleChangeSmsCodeInput(e.target.value, 6)}
                                    placeholder="_"
                                />
                            )
                        }
                    </div>
                    {/* <button type="submit">Verify code</button> */}
                </form>
            </div>
        </section>
    )
}
