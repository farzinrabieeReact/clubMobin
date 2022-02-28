import React, { useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import { TextField, Box } from '@material-ui/core'
import { useIntl, FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from './../../../../../redux/profile/clubmember_select_get_kyc_profile';

export default function Index({ setIndexChild, data, open }) {

    const intl = useIntl()
    const dispatch = useDispatch()

    const reducerProfile = useSelector(state => state.reducer_get_kyc_profile)

    useEffect(() => {
        if (reducerProfile.isOk) {
            setIndexChild(2)
        }
    }, [reducerProfile.isOk])//eslint-disable-line react-hooks/exhaustive-deps 


    let initialValues = {
        otp: ''
    }

    useEffect(() => {
        if (!open) {
            setIndexChild(0)
        }
    }, [open])//eslint-disable-line react-hooks/exhaustive-deps 

    const validateShcama = Yup.object().shape({
        otp:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
    });


    let onSubmit = (values, { setSubmitting }) => {

        let _data = {
            national_id: data.body.national_id,
            otp: values.otp
        }

        dispatch({ type: actionTypes.get_kyc_profileAsync, payload: _data })
    }



    return (
        <div>
            <div>
                <h3>بروزرسانی اطلاعات </h3>
            </div>
            <hr />
            <div>
                <p>
                    لطفا تا دریافت پیامک تایید از سمت سامانه سجام منتظر بمانید و از این صفحه خارج نشوید.
                </p>
            </div>
            <div>
                <Formik
                    initialValues={{ ...initialValues }}
                    validationSchema={validateShcama}
                    onSubmit={onSubmit} >
                    {
                        ({
                            values,
                            touched,
                            errors,
                            handleSubmit,
                            setFieldValue,
                        }
                        ) => (
                                <div className={'d-flex align-items-center'}>
                                    <div>
                                        <p className={`${touched.otp && errors.otp ? 'pb-10' : 'pb-5'} mr-3`}>
                                            کد تایید دریافت شده از سامانه سجام:
                                        </p>
                                    </div>
                                    <div>

                                        <form onSubmit={handleSubmit}>

                                            <Box width="270px">
                                                <TextField
                                                    id="outlined-name"
                                                    label="کد تایید"
                                                    value={values.otp}
                                                    onChange={event => setFieldValue('otp', event.target.value)}
                                                    margin="normal"
                                                    variant="outlined"

                                                />
                                                {
                                                    touched.otp && errors.otp && (
                                                        <div className={'text-danger'}>
                                                            <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                        </div>
                                                    )
                                                }
                                            </Box>
                                            <Box className={'text-right mt-3'}>
                                                <button className={'btn btn-success'} type="submit">ثبت درخواست</button>
                                            </Box>
                                        </form>

                                    </div>
                                </div>
                            )
                    }
                </Formik>
            </div>
        </div>
    )
}
