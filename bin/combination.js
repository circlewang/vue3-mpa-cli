const { promisify } = require("util");
const figlet = require("figlet");
const inquirer = require("inquirer");
const ora = require("ora")
const download = promisify(require("download-git-repo"));
const { commandSpawn } = require("./terminal");

const vueRepo = "direct:https://github.com/circlewang/vue3-mpa.git#master"; // 脚手架模板的远程仓库地址
const spinner = ora("加载中...");

const createProjectAction = async (projectName, options) => {
  await download(vueRepo, projectName,{ clone: true }).then(()=>{
    spinner.succeed("success!")
    console.log(`- cd ${projectName}`)
    console.log("- npm install     -- to install dependencies")
    console.log("- npm run dev       -- to run the project")
    console.log("- npm run build   -- to build the project")
 }).catch((error)=>{
    console.log(error,'error------')
    spinner.fail("error!",error)
 })
};

module.exports = function (projectName, options) {
  inquirer.prompt([
    {
      name: "project",
      type: "list",
      message: "请选择模板",
      choices: [
        {
          name: "私有脚手架", // 脚手架名称
          value: 1,
          description: "私有脚手架", // 脚手架描述
          checked: true,
        }
      ]
    }
  ]).then(data => {
    spinner.start();
    createProjectAction(projectName, options)
  })
}
