import React from 'react'
import { makeStyles, TextField, Box } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from "yup";
import { useIntl, FormattedMessage } from 'react-intl';


let useStyles = makeStyles({
    root: {
        width: 700,
        maxWidth: '100%',

    }
})

export default function Index({ setopen  , apiInsertGift}) {

    const intl = useIntl();
    let classes = useStyles();

    let initialValues = {
        phoneNumber: '',

    }

    const validateShcama = Yup.object().shape({
        phoneNumber:
        Yup.string()
        .required(
            intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD",
            })
        ),

    })


    let onSubmit = (values, { setSubmitting }) => {

        apiInsertGift(values)
        setSubmitting(false)
        setopen(prev => !prev)
    }



    return (
        <div className={`${classes['root']} `} >
            <div>
                <h4 className="modal-title">شارژ کیف پول</h4>
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
                        setFieldValue
                        /* and other goodies */
                    }) => (
                            <form onSubmit={handleSubmit}>
                                <Box className={'d-flex align-items-center justify-content-between flex-wrap w-100'}>
                                    <Box width="270px">
                                        <TextField
                                            id="outlined-name"
                                            label="شماره موبایل گیرنده را وارد کنید"
                                            value={values.phoneNumber}
                                            onChange={e => setFieldValue('phoneNumber', e.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                            
                                        />
                                          {
                                            touched.phoneNumber && errors.phoneNumber && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>
                                </Box>
                                <hr />
                                <div className={'d-flex justify-content-end align-items-center'}>
                                <button type="button" className="btn btn-outline-danger mr-5" onClick={() => setopen(prev => !prev)}>انصراف</button>
                                    <button type="submit" className="btn btn-success" disabled={isSubmitting} >ثبت </button>
                                </div>
                            </form>
                        )}
                </Formik>
            </div>

        </div >
    )
}
