const { getImage } = require('./getImage');


const main = async () => {
    const keyword = process.argv[2];
    let number = process.argv[3];

    // Exit if keyword isn't specified
    if (!keyword) {
        console.log("Please specify keywords");
        return;
    }

    // Set number to 10 if it isn't specified
    if (!number) {
        console.log("No quantity specified. Save 10 copies by default.");
        number = 10;
    }

    // Start to collecting
    console.log("start");
    res = await getImage(keyword, number);
    console.log("finish");

    if (!res) {
        console.log("Failed to collect images");
    }
};

main();
