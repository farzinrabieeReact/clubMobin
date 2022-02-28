
export const handleNull = (value) => {
    if (!value || value === "null") {
        return "-"
    }
    return value
}

export const handleNumber = (value) => {
    if (+value === 0) {
        return 0
    }
    if (!value || value === "null") {
        return "-"
    }
    else if (typeof value !== "number") {
        return value
    }
    return parseFloat(value.toFixed(2)).toLocaleString();
}