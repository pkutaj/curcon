# The DRY & SOLID Currency Converter
## purpose
The aim of this project is to:
  - [x] write a currency converter
  - [x] use Node.Js on the back end
  - [x] follow the DRY and SOLID principles of clean code
  - [x] have a command line UI
  - [x] separate the UI layer from the main program and support an easy addition / removal of various types of input mechanisms (console, input into sourcefile, csv files)
  - [ ] have a **web application** UI / layer

## instructions
* you need to have node installed
* at the moment just navigate to the folder with the files and run `node app <transactionCurrency> <counterCurrency> <amount>` and you get the result
* if for any reason you'd like to put the variable inside of the source code, navigate to `sourceFileInput.js` and see the commented section

## ideas
* there could/should be a powershell core wrapper with a simple but powerfull UI
  * see <http://pavol.kutaj.com/2020/01/06/PS-set-permissions-ornaments.html> for the example of that solution
* there could be a possibility to point the script to the `.csv` file to iterate over and create an appended copy with the current conversion rate / result

## inspiration
* [Agile Tour 2017 Sherbrooke - Keynote with Uncle Bob](https://www.youtube.com/watch?v=VY4LYd2YfBk)