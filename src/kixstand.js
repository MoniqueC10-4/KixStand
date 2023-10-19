const fs = require("fs");
const { nanoid } = require("nanoid");
const path = require("path");
const dataFilePath = path.join(__dirname, "../data/products.json");
const cartFilePath = path.join(__dirname, "../data/box.json")
let kixInv = [];
let box = [];

function loadBoxItems() {
    try {
        const data =fs.readFileSync(cartFilePath);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveBoxItemsToFile(boxItems) {
    const dataToWrite = JSON.stringify(boxItems, null, 2);
    fs.writeFileSync(cartFilePath, dataToWrite);
}

loadBoxItems()

function addToBox() {
    const boxItems = loadBoxItems();
    for (let item of kixInv) {
        if (item.inStock) {
            boxItems.push(item)
        }
    }
    saveBoxItemsToFile(boxItems);
}

function viewBox() {
    const boxItems = loadBoxItems();
    for (let item of boxItems) {
        console.log(`Product: ${item.product}, Quantity: ${item.quantity}, Price: ${item.price}`);
    }
}

function loadKixInventory() {
    try {
        const data = fs.readFileSync(dataFilePath);
        kixInv = JSON.parse(data);
        console.log(kixInv);
    } catch (err) {
        kixInv = [];
    }
}

function loadBox() {
    try {
        const data = fs.readFileSync(cartFilePath);
        box = JSON.parse(data);
        console.log(box);
    } catch (err) {
        box = [];
    }
}
function saveKixInvToFile() {
    const dataToWrite = JSON.stringify(kixInv, null, 2);
    fs.writeFileSync(dataFilePath, dataToWrite);
}

loadKixInventory();

function createKix(name, priceInCents, inStock, colorway) {
    const id = nanoid(5);
    const freshKix = {id, name, priceInCents, inStock, colorway};
    kixInv.push(freshKix);
    saveKixInvToFile();
    return kixInv;
}

function listKix() {
    return kixInv;
}

function kixDetails(i) {
    if (i >= 0 && i < kixInv.length) {
        return kixInv[i];
    }
    return "Not found";
}

function deleteKix(i) {
    if (i >= 0 && i < kixInv.length) {
        kixInv.splice(i, 1);
        saveKixInvToFile();
        return "Dropkicked";
    }
    return "Not found";
}

function updateKix(i, name, priceInCents, inStock, colorway) {
if (i >= 0 && i < kixInv.length) {
    kixInv[i] = { id, name, priceInCents, inStock, colorway };
    saveKixInvToFile();
    return "Kicked Up";
}
return "Not found";
}

function viewBox() {
    for (let item of box) {
        console.log(`Product: ${item.product}, Quantity: ${item.quantity}, Price: ${item.price}`);
    }
}
function calculateTotalPrice() {
    let totalPrice = 0;
    for (let item of box) {
        totalPrice += Number(item.priceInCents) / 100;
    }
    return totalPrice
}

function emptyBox() {
    box.length = 0
    saveBoxItemsToFile(box)
}

module.exports = {
    createKix,
    listKix,
    kixDetails,
    deleteKix,
    updateKix,
    addToBox,
    viewBox,
    calculateTotalPrice,
    emptyBox
};
