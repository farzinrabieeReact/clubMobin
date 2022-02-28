export const requestStatus = (key) => {
    switch (key) {
        case "-2":
            return "در انتظار انصراف";
        case "-1":
            return "در صف انتظار";
        case "1":
            return "در انتظار تایید پذیرش";
        case "2":
            return "در انتظار تایید معامله گر";
        case "3":
            return "در انتظار اقدام";
        case "4":
            return "اقدام شده";
        case "5":
            return "ابطال شده";
        default:
            return "-";
         
    }
}

