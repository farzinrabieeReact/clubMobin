import React from 'react'
import CardFile from '../../../../../common/components/base64Images';
import { Box, makeStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

let useStyles = makeStyles({
    root: {
        width: '23%'
    }
})

export default function Index({ setFieldValue, values, touched, errors }) {

    let classes = useStyles()

    return (
        <div>
            <div>
                <h3>آپلود مدارک</h3>
            </div>
            <hr />
            <div className={'d-flex justify-content-between align-items-center flex-wrap'}>
                <Box className={classes['root']}>
                    <p>روی کارت ملی</p>
                    <CardFile value={values.file_National_r} setValues={(data) => setFieldValue('file_National_r', data)} />
                    {
                        touched.file_National_r && errors.file_National_r && (
                            <div className={'text-danger'}>
                                <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                            </div>
                        )
                    }
                </Box>
                <Box className={classes['root']}>
                    <p>پشت کارت ملی</p>
                    <CardFile value={values.file_National_p} setValues={(data) => setFieldValue('file_National_p', data)} />
                    {
                        touched.file_National_p && errors.file_National_p && (
                            <div className={'text-danger'}>
                                <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                            </div>
                        )
                    }
                </Box>
                <Box className={classes['root']}>
                    <p>صفحه اول شناسنامه</p>
                    <CardFile value={values.file_Identity} setValues={(data) => setFieldValue('file_Identity', data)} />
                    {
                        touched.file_Identity && errors.file_Identity && (
                            <div className={'text-danger'}>
                                <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                            </div>
                        )
                    }
                </Box>
                <Box className={classes['root']}>
                    <p>توضیحات شناسنامه  </p>
                    <CardFile value={values.file_Identity_d} setValues={(data) => setFieldValue('file_Identity_d', data)} />
                    {
                        touched.file_Identity_d && errors.file_Identity_d && (
                            <div className={'text-danger'}>
                                <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                            </div>
                        )
                    }
                </Box>
            </div>
        </div>
    )
}
