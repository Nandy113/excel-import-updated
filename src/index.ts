import { schema } from "./excel-schema/schema";
const readXlsxFile = require("read-excel-file/node");
import { addToDb } from "./addToDb";

async function excelToJson() {
  console.log("Inside exceltoJson");
  const file = __dirname + "\\assets\\Book2.xlsx";
  console.log(file);
  console.log("Converting excel to JSON...");
  let { rows, error } = await readXlsxFile(
    file,
    { schema },
    { sheetStubs: true }
  );
  if (error) {
    console.log("error :", error);
  }
  console.log("Adding to database...");
  var modulus = rows.length;
  for (var i = 0; i < rows.length; i += 100) {
    modulus = modulus - 100;
    if (modulus < 0) {
      var remaining = modulus + 100;
    } else {
      remaining = 100;
    }
    await addToDb(rows, i, remaining);
  }
  console.log("Done Uploaded to database..!");
}

excelToJson();
