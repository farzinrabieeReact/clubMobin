import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from "yup";

let useStyles = makeStyles({
    root: {
        width: 700,
        maxWidth: '100%',

    }
})

export default function Index({ setopen , apiInsertGift }) {

    let classes = useStyles();
    let initialValues = {
        GeneralBonusRequestModalForm: true

    }

    const validateShcama = Yup.object().shape({

    })


    let onSubmit = (values, { setSubmitting }) => {

        apiInsertGift({})
        setSubmitting(false)
        setopen(prev => !prev)

    }



    return (
        <div className={`${classes['root']} `} >
            <div>
                <h4 className="modal-title">دریافت جایزه</h4>
            </div>
            <hr />
            <div>
                <Formik
                    initialValues={{ ...initialValues }}
                    validationSchema={validateShcama}
                    onSubmit={onSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        isSubmitting,
                        isValid,
                        setFieldValue
                        /* and other goodies */
                    }) => (
                            <form onSubmit={handleSubmit}>
                                <Box className={'d-flex align-items-center justify-content-between flex-wrap w-100'}>
                                    <p>آیا اطمینان دارید؟</p>
                                </Box>
                                <hr />
                                <div className={'d-flex justify-content-end align-items-center'}>
                                    <button type="button" className="btn btn-outline-danger mr-5" disabled={isSubmitting} onClick={() => setopen(prev => !prev)}>خیر</button>
                                    <button type="submit" className="btn btn-success" disabled={isSubmitting || !isValid} >بله </button>
                                </div>
                            </form>
                        )}
                </Formik>
            </div>

        </div >
    )
}
