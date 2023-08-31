const { program } = require("commander")
const fs = require("fs/promises")
const chalk = require("chalk")
const QUOTE_FILE = "quotes.txt"

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0")

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      const quotes = await fs.readFile(QUOTE_FILE, 'UTF-8');
      const quoteArray = quotes.split('\n');
      const randomQuote = Math.floor(Math.random() * quoteArray.length);
      const [quote, author] = quoteArray[randomQuote].split('|');
            console.log(chalk.magenta.italic(quote) + chalk.yellow(author));
    } catch (err) {
      console.log(err);
    }
    // TODO: Pull a random quote from the quotes.txt file
    // console log the quote and author
    // You may style the text with chalk as you wish
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      const newQuote = `\n${quote}.|${author ||'Anonymous' ||'undefined'}\n`;
      await fs.appendFile(QUOTE_FILE, newQuote);

      const checkArray = await fs.readFile(QUOTE_FILE, 'UTF-8');
      const removeEmpty = checkArray.split('\n').filter(line => line.trim() !== '').join('\n');
      fs.writeFile(QUOTE_FILE, removeEmpty);

      console.log(chalk.bgYellow.bold('Your quote has been added to the file.'));
    } catch (err) {
      console.log(err);
    } 
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
    // filter empty line out .txt
  });

program.parse();