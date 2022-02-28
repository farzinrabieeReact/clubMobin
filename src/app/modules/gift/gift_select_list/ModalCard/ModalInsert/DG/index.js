import React from 'react'
import { makeStyles, TextField, Box } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from "yup";
import { useIntl, FormattedMessage } from 'react-intl';
import { regex_number_english, regx_phone } from '../../../../../../common/method/regex';


let useStyles = makeStyles({
    root: {
        width: 700,
        maxWidth: '100%',
    }
})

export default function Index({ setopen, apiInsertGift }) {

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
                )
                .matches(regex_number_english, 'موبایل گیرنده فقط می تواند شامل اعداد باشد')
                .matches(regx_phone, 'موبایل گیرنده را به درستی وارد کنید'),

    })


    let onSubmit = (values, { setSubmitting }) => {

        apiInsertGift(values)
        setSubmitting(false)
        setopen(prev => !prev)
    }



    return (
        <div className={`${classes['root']} `} >
            <div>
                <h4 className="modal-title"> شارژ کیف پول دیجی کالا </h4>
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
                                                <small id="emailHelp" className="form-text text-danger">
                                                    {errors.phoneNumber}
                                                </small>
                                            </div>
                                        )
                                    }
                                </Box>
                            </Box>
                            <hr />
                            <div className={'d-flex justify-content-end align-items-center'}>
                                <button type="submit" className="btn btn-success mr-5" disabled={isSubmitting} >ثبت </button>
                                <button type="button" className="btn btn-outline-danger" onClick={() => setopen(prev => !prev)}>انصراف</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>

        </div >
    )
}
