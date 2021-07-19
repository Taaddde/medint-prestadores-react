

export const getCurrentMonthAndYear = () => {
    const date = new Date();
    const today = date.toISOString().slice(0,7);
    return today;
}

export const getPreviousMonthAndYear = () => {
    const date = new Date();
    let month = date.getMonth();
    const year = date.getFullYear();

    if(month < 10)  month = `0${month}`;
    

    return `${year}-${month}`
}