import React from 'react'
import { makeStyles, TextField, Box } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from "yup";
import DatePicker from './../../../../../../common/components/DatePicker';
import {convertDigitToEnglish}  from '../../../../../../common/method/convertDigitToEnglish';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useIntl, FormattedMessage } from 'react-intl';


let useStyles = makeStyles({
    root: {
        width: 700,
        maxWidth: '100%',

    }
})


function Index({ setopen, apiInsertGift }) {

    let classes = useStyles();

    const intl = useIntl()

    let initialValues = {
        birthDate: null,
        gender: 'MALE',
        stateList: '',
        cityList: ''
    }


    const validateShcama = Yup.object().shape({
        birthDate:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
        gender:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
        stateList:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
        cityList:
            Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
    });


    let onSubmit = (values, { setSubmitting }) => {

        let date ={
            ...values,
            birthDate: convertDigitToEnglish(values['birthDate'].format("jYYYY/jMM/jDD"))
        }

        apiInsertGift(date)
        setSubmitting(false)
        setopen(prev => !prev)
    }



    return (
        <div className={`${classes['root']} `} >
            <div>
                <h4 className="modal-title">درخواست صدور بیمه نامه</h4>
            </div>
            <hr />
            <div>
                <Formik
                    initialValues={{ ...initialValues }}
                    validationSchema={validateShcama}
                    onSubmit={onSubmit} >
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
                                            value={values.stateList}
                                            onChange={event => setFieldValue('stateList', event.target.value)}
                                            margin="normal"
                                            variant="outlined"

                                        />
                                        {
                                            touched.stateList && errors.stateList && (
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
                                            value={values.cityList}
                                            onChange={event => setFieldValue('cityList', event.target.value)}
                                            margin="normal"
                                            variant="outlined"

                                        />
                                        {
                                            touched.cityList && errors.cityList && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>

                                    <Box width={270}>
                                        <DatePicker
                                            lable={"تاریخ تولد درخواست کننده بیمه"}
                                            value={values.birthDate}
                                            setValue={(data) => setFieldValue('birthDate', data)}
                                        />

                                        {
                                            touched.birthDate && errors.birthDate && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>
                                    <Box className={'m-3'}>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                onChange={(event) => setFieldValue('gender', event.target.value)}
                                                row aria-label="position" name="position" value={values.gender}>
                                                <FormControlLabel
                                                    value={'MALE'}
                                                    control={<Radio color="primary" />}
                                                    label="مرد"
                                                    name={'MALE'}
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value={"FEMALE"}
                                                    control={<Radio color="primary" />}
                                                    label="زن"
                                                    name={'FEMALE'}
                                                    labelPlacement="end"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        {
                                            touched.gender && errors.gender && (
                                                <div className={'text-danger'}>
                                                    <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                                                </div>
                                            )
                                        }
                                    </Box>

                                </Box>

                                <hr />
                                <div>
                                </div>
                                <div className={'d-flex justify-content-end align-items-center'}>
                                    <button type="submit" className="btn btn-success mr-5" disabled={isSubmitting || !isValid} >ثبت </button>
                                    <button type="button" className="btn btn-outline-danger" disabled={isSubmitting} onClick={() => setopen(prev => !prev)}>انصراف</button>
                                </div>
                            </form>
                        )}
                </Formik>
            </div>

        </div >
    )
}

export default Index
