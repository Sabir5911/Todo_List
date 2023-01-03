// creating a todo list\
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import chalkAnimation from 'chalk-animation';
let todo_list = [];
figlet('TODO LIST', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.green(data));
});
async function todo() {
    const answers = await inquirer.prompt([{
            type: 'list',
            name: "options",
            message: "What operation you want to perform? ",
            choices: ["Add Task", "Display Task", "Remove Task"]
        }]);
    if (answers.options === "Add Task") {
        const newitem = await inquirer.prompt([{
                type: 'input',
                name: "Task",
                message: "Enter some thing to add in Todo List: "
            }]);
        todo_list.push(newitem.Task);
        console.log(chalk.green("Successfully added"));
    }
    else if (answers.options === "Display Task") {
        if (todo_list.length == 0) {
            console.log(chalk.red("Enter SomeThing in Todo List "));
        }
        todo_list.forEach(element => console.log(chalk.green(element)));
    }
    else if (answers.options == "Remove Task") {
        const item2 = await inquirer.prompt([{
                type: 'input',
                name: "remove",
                message: "what you want to remove?",
            }]);
        let index = todo_list.indexOf(item2.remove);
        if (index !== -1) {
            let rem = todo_list.splice(index, 1);
            console.log(chalk.green(`Your task  "${rem}" has been Removed`));
        }
        else if (index == -1) {
            console.log(chalk.red("Task Not Found"));
        }
        else if (todo_list.length == 0) {
            console.log(chalk.red("Enter SomeThing in Todo List"));
        }
    }
}
async function repeat() {
    do {
        await todo();
        var ans = await inquirer.prompt([{
                type: "list",
                name: "repeat",
                message: "If you want to continue press Y",
                choices: ["Yes", "No"]
            }]);
    } while (ans.repeat == "Y" || (ans.repeat == "y") || ans.repeat == "Yes");
    {
    }
    if (ans.repeat == "No") {
        const sleep = () => {
            return new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
        };
        async function welcome() {
            var by = chalkAnimation.rainbow("Thanks for using");
            await sleep();
            by.stop();
        }
        welcome();
    }
}
setTimeout(() => {
    repeat();
}, 1000);
