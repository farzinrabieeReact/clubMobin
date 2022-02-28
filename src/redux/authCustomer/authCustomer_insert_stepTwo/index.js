import axiosCustom from "../../../app/common/components/apiConfig";



export  function  authCustomerInsertStepTwo(data) {
    console.log("data",data)

    let config = {
        url: "insert_request",
    }

    let _data = {
        table: "brokercustomer",
        method_type: "insert_new_broker_customer",
        data: data ? data : {}
    }

    return axiosCustom(config, _data)

}
