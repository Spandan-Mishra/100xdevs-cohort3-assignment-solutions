const fs = require("fs");

fs.readFile("file.md", "utf-8", (err, data) => {
    const words = data.split(" ");
    let newData = "";
    
    for(let i=0; i<words.length; i++) {
        if(words[i].length != 0) {
            newData += words[i] + " ";
        }
    }

    fs.writeFile("file.md", newData, (err) => {
        if(err) {
            console.log("Error in writing to file");
        }
        else {
            console.log("Extra space removed successfully");
        }
    })
})
