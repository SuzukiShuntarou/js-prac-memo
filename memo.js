import minimist from "minimist";
import CommandLineInterface from "./commandlineinterface.js";
import MemoOptions from "./memooptions.js";

class Memo {
  constructor(args) {
    this.memoOptions = new MemoOptions(args);
  }

  async exec() {
    const cli = new CommandLineInterface();
    await cli.build();
    try {
      if (this.memoOptions.isList()) {
        await cli.showTitles();
      } else if (this.memoOptions.isRead()) {
        await cli.showContent();
      } else if (this.memoOptions.isDelete()) {
        await cli.deleteMemo();
      } else {
        await cli.createMemo();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      await cli.close();
    }
  }
}

const args = minimist(process.argv.slice(2));
const memo = new Memo(args);
memo.exec();
