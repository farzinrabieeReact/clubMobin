import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from "yup";
// import { useIntl } from 'react-intl';


let useStyles = makeStyles({
    root: {
        width: 700,
        maxWidth: '100%',

    }
})

export default function Index({ setopen , apiInsertGift }) {


    // const intl = useIntl();
    let classes = useStyles();


    let initialValues = {
        OffCodeBonusRequestModalForm: "true",

    }

    const validateShcama = Yup.object().shape({
        // OffCodeBonusRequestModalForm:
        //     Yup.string()
        //         .required(
        //             intl.formatMessage({
        //                 id: "AUTH.VALIDATION.REQUIRED_FIELD",
        //             })
        //         ),
    })


    let onSubmit = (values, { setSubmitting }) => {

        apiInsertGift({})
        setSubmitting(false)
        setopen(prev => !prev)
    }



    return (
        <div className={`${classes['root']} `} >
            <div>
                <h4 className="modal-title">دریافت کالا </h4>
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
                                    <Box >
                                        <h5>آیا از دریافت این کالا اطمینان دارید؟</h5>
                                    </Box>
                                </Box>
                                <hr />
                                <div className={'d-flex justify-content-end align-items-center'}>
                                    <button type="submit" className="btn btn-success mr-5" disabled={isSubmitting } >بله </button>
                                    <button type="button" className="btn btn-outline-danger" disabled={isSubmitting} onClick={() => setopen(prev => !prev)}>خیر</button>
                                </div>
                            </form>
                        )}
                </Formik>
            </div>

        </div >
    )
}
