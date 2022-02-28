import { makeStyles } from '@material-ui/core';
import React from 'react';
const useStyle = makeStyles(() => ({
    title: {
        borderBottom: "1px solid #B2B2B2"
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 10
        }
    }
}));
export default function IpoRules() {
    const classes = useStyle();
    return <>
        <div className="bg-white rounded-lg shadow mb-10 " style={{height:"650px"}}>

            <div className={`${classes["title"]}  p-4 py-8 mb-2`}>
                <h3>شرایط و ضوابط</h3>


            </div>
            <div className='p-4'>
                <p>
                    به موجب این توافق نامه برای کاربرانی که درخواست خرید عرضه اولیه را ثبت نمایند، سفارش خرید به تعداد و قیمت درخواستی در روز عرضه ارسال می گردد.
                </p>
            </div>
            <div className='p-4'>
                <p>
                    جهت خرید کامل عرضه موردنظر علاوه بر ثبت درخواست در باشگاه مشتریان حتما توافقنامه خرید عرضه اولیه در آنلاین خود را فعال نمایید.(آموزش <a target='_blank' href='https://www.aparat.com/v/ayoHM'> https://www.aparat.com/v/ayoHM</a> )


                </p>
            </div>
            <div className='p-4'>
                <p>
                    در صورت عدم خرید به هر علتی، هیچ‌گونه مسئولیتی متوجه کارگزاری مبین سرمایه نخواهد بود.
                </p>
            </div>
            <div className='p-4'>
                <p>
                * کاربران با امضا این توافق‌نامه، رضایت خود مبنی خرید عرضه‌ اولیه فوق به وسیله اعتبار اعطایی از سوی کارگزاری را اعلام می‌کنند و این خریدها به صورت خودکار از سوی کارگزاری انجام خواهد گرفت. در صورت عدم تسویه اعتبار توسط مشتری، کارگزاری اختیار خواهد داشت که از محل فروش سهام خریداری شده، طلب خود را وصول نماید.
                </p>
            </div>
            <div className='p-4'>
                <p>
                به موجب مفاد این قرارداد، کاربر حق هرگونه ادعا و اعت راضی در این خصوص را از خود سلب و ساقط می‌نماید.
                </p>
            </div>
        </div>


    </>;
}
