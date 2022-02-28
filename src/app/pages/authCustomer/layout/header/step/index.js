

import React from 'react';
import Styles from '../index.module.scss'
const handleStepOrange=()=>{

}


const Step = ({step}) => {
    return ( 
        <>
         <div className={Styles["header-step-parent"]}>
            <div className={step === 1?(`${Styles["header-step-circale-orange"] }`):(`${Styles["header-step-circale-orange-check"] }`)}>
                {step === 1 ? (<span style={{paddingTop:2,fontSize:18}}>1</span>):(<img src="/media/authCustomer/Path 2554@2x.png" style={{width:12,height:10}} alt="" />)} 
            </div>
            <div className={step === 2 || step === 3 || step === 4 || step === 5? (`${Styles["header-step-line-orange"] }`) : (`${Styles["header-step-line"] }`)}></div>
            <div className={step === 2 ?(`${Styles["header-step-circale-orange"] }`):step === 3 || step === 4 || step === 5 ? (`${Styles["header-step-circale-orange-check"] }`):(`${Styles["header-step-circale"] }`)}>
               {step === 2? (<span style={{paddingTop:2,fontSize:18}}>2</span>):step === 1 ? (<span style={{paddingTop:2}}>2</span>):((<img src="/media/authCustomer/Path 2554@2x.png" style={{width:12,height:10}} alt="" />))} 
            </div>
            <div className={step === 3 || step === 4 || step === 5? (`${Styles["header-step-line-orange"] }`):(`${Styles["header-step-line"] }`)}></div>
            <div className={step === 3? (`${Styles["header-step-circale-orange"] }`):step === 4 || step === 5?(`${Styles["header-step-circale-orange-check"] }`):(`${Styles["header-step-circale"] }`)}>
            {step === 4 || step === 5?((<img src="/media/authCustomer/Path 2554@2x.png" style={{width:12,height:10}} alt="" />)) :step === 3? (<span style={{paddingTop:2,fontSize:18}}>3</span>):(<span style={{paddingTop:2}}>3</span>)}
            </div>
        </div>
        <div className={Styles["header-title-step-parent"]}>
          <div className={Styles["header-title-step-text"]}>
              {step === 1 ? ("اطلاعات سجام"):(null)}
          </div>
          <div className={Styles["header-title-step-text"]}>
              {step === 2 ? ("بارگذاری مدارک و تایید قراردادها"):(null)}
          </div>
          <div className={Styles["header-title-step-text"]}>
              {step === 3 ? ("امضای قرارداد") : (null)}
          </div>
        </div>
        </>
     );
}
 
export default Step;