const shoesAPI = require("./src/kixstand");

const { faker } = require("@faker-js/faker");
const fs = require("fs").promises;
const dataFolder = "data";
const dataFilePath = `${dataFolder}/products.json`;

function generateKix() {
    const kixNames = [
        "Kwondo1/Peaceminusone",
        "Air Force 1",
        "Air Max BW OG",
        "Air Max 90 NRG",
        "Air Jordan 1 MID"
    ];
    const colors = [
        "White",
        "Black",
        "Black/Persian Violet/White",
        "Summit White/Grey Fog/Black",
        "White/Tropical Twist/Black"
    ];

    const shoeInfo = [];

    for (let i = 0; i <= 5; i++) {
        shoeInfo.push({
            id: faker.random.alphaNumeric(5),
            name: kixNames[i - 1],
            priceInCents: faker.commerce.price(10000, 20000, 0),
            inStock: faker.datatype.boolean(),
            colorway: colors[i - 1],
        });
    }
    return shoeInfo;
}
function processInput() {
    const expectedCommand = process.argv[2];
    let result = "Error: command not found";

    if (expectedCommand === "create") {
        const [name, priceInCents, inStock, colorway] = process.argv.slice(3);
        const parsedPrice = parseFloat(priceInCents) / 100;
        const parsedStock = inStock === "true";
        result = shoesAPI.createKix(name, parsedPrice, parsedStock, colorway);
    } else if (expectedCommand === "list") {
        result = shoesAPI.listKix();
    } else if (expectedCommand === "details") {
        const index = parseInt(process.argv[3]);
        result = shoesAPI.kixDetails(index);
    } else if (expectedCommand === "delete") {
        const index = parseInt(process.argv[3]);
        result = shoesAPI.deleteKix(index);
    } else if (expectedCommand === "update") {
        const index = parseInt(process.argv[3]);
        const [name, price, stock] = process.argv.slice(4);
        const parsedPrice = parseFloat(price);
        const parsedStock = parseInt(stock);
        result = shoesAPI.updateKix(
            index,
            name,
            parsedPrice,
            parsedStock
        );
    } else if (expectedCommand === "generate") {
        const randomItems = generateKix();
        fs.writeFileSync(dataFilePath, JSON.stringify(randomItems, null, 2));
        result = "Random items generated and saved to products.json.";
    } else if (expectedCommand === "add") {
        shoesAPI.addToBox();
        result = "Kix added to the box.";
    } else if (expectedCommand === "view") {
        shoesAPI.viewBox();
        result = "View kix in the box."
    } else if (expectedCommand === "calculate") {
        const totalPrice = shoesAPI.calculateTotalPrice() 
            result = `Total Price: $${totalPrice.toFixed(2)}`;
        } else if (expectedCommand === "empty") {
            shoesAPI.emptyBox();
            result = "No kix in the box.";
        }
    console.log(result);
    }
    processInput();
