let counter = 0;

function counting() {
    setTimeout(() => {
        counter++;
        console.log(counter);
        counting(counter);
    }, 1000);
}


counting();