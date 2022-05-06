export function popup(title, content){
    let event = new Event('popup')
    event.title = title
    event.content = content
    document.dispatchEvent(event)
}

export function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));  
}

export function formatTime(date) {
    var hours = date.getHours()
    var ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    var strTime = hours + ' ' + ampm
    return strTime
}