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

export default function Index({ setopen  , apiInsertGift }) {

    const intl = useIntl();
    let classes = useStyles();

    let initialValues = {
        provinceName: '',
        cityName: '',
        address: '',
        postalCode: '',
        mobile: '',
        personName: '',

    }

    const validateShcama = Yup.object().shape({
        provinceName:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
        cityName:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
        address:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
        postalCode:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
        mobile:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
        personName:
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
                <h4 className="modal-title">درخواست جوایز</h4>
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
                                    <Box width="270px">
                                        <TextField
                                            id="outlined-name"
                                            label="استان"
                                            value={values.provinceName}
                                            onChange={e => setFieldValue('provinceName', e.target.value)}
                                            margin="normal"
                                            variant="outlined"

                                        />
                                        {
                                            touched.provinceName && errors.provinceName && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>
                                    <Box width="270px">
                                        <TextField
                                            id="outlined-name"
                                            label="شهر"
                                            value={values.cityName}
                                            onChange={e => setFieldValue('cityName', e.target.value)}
                                            margin="normal"
                                            variant="outlined"

                                        />
                                        {
                                            touched.cityName && errors.cityName && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>
                                    <Box width="270px">
                                        <TextField
                                            id="outlined-name"
                                            label="آدرس"
                                            value={values.address}
                                            onChange={e => setFieldValue('address', e.target.value)}
                                            margin="normal"
                                            variant="outlined"

                                        />
                                        {
                                            touched.address && errors.address && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>
                                    <Box width="270px">
                                        <TextField
                                            id="outlined-name"
                                            label="کد پستی"
                                            value={values.postalCode}
                                            onChange={e => setFieldValue('postalCode', e.target.value)}
                                            margin="normal"
                                            variant="outlined"

                                        />
                                        {
                                            touched.postalCode && errors.postalCode && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>
                                    <Box width="270px">
                                        <TextField
                                            id="outlined-name"
                                            label="موبایل گیرنده"
                                            value={values.mobile}
                                            onChange={e => setFieldValue('mobile', e.target.value)}
                                            margin="normal"
                                            variant="outlined"

                                        />
                                        {
                                            touched.mobile && errors.mobile && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>
                                    <Box width="270px">
                                        <TextField
                                            id="outlined-name"
                                            label="نام گیرنده"
                                            value={values.personName}
                                            onChange={e => setFieldValue('personName', e.target.value)}
                                            margin="normal"
                                            variant="outlined"

                                        />
                                        {
                                            touched.personName && errors.personName && (
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
                                    <button type="submit" className="btn btn-success" disabled={isSubmitting || !isValid} >ثبت </button>
                                </div>
                            </form>
                        )}
                </Formik>
            </div>

        </div >
    )
}
