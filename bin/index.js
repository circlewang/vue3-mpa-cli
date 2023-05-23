#!/usr/bin/env node

const figlet = require("figlet");
console.log(`\r\n ${figlet.textSync('ra-cli', {
  font: 'Ghost',
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true,
})}`);

const program = require("commander");
const path=require('path');
program
  .name("circle") // 这个位置 demo 放的是新建项目的命令
  .usage("[options] <command> [<args>]")
  .version(`${require("../package.json").name} ${require("../package.json").version}`)
  .command("create <project-name>")
  .action((projectName, options) => {
    console.log(options,'options------')
    require(path.resolve(__dirname, "./combination.js"))(projectName, options);
  })

program.parse(process.argv)

