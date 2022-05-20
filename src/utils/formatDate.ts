export default function formatDate(date: Date) {

    let formattedDate: string;
    if (date == null) {
        formattedDate = "";
    }
    else if (isDateTomorrow(date)) {
        formattedDate = "tomorrow"
    } else {
        date = new Date(date);
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let mmStr: string = String(mm);
        let ddStr: string = String(dd);
        if (mm < 10) {
            mmStr = '0' + mm.toString();
        }
        if (dd < 10) {
            ddStr = '0' + dd.toString();
        }
        formattedDate = ddStr + '.' + mmStr + '.' + yyyy;

    }
    return formattedDate;
}

function isDateTomorrow(date: Date): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toDateString() === date.toDateString();
}