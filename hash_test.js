//function to encrypt password
function encrypt(str){
    let result = ""
    let ascii_values =[]
    for(let i = 0;i<str.length;i++){
        ascii_values.push(str.charCodeAt(i)+5)
        result += String.fromCharCode(ascii_values[i]);
    }
    return result
}

// function to decrypt password
function decrypt(str){
    let result =''
    let ascii_values = []
    for(let i = 0;i<str.length;i++){
        ascii_values.push(str.charCodeAt(i)-5)
        result += String.fromCharCode(ascii_values[i]);
    }
    return result
}
