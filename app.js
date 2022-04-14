let fs = require("fs")
let path = require("path")

let finalContent = `# Summary\n- [Introduction](README.md)\n\n` //最终输出到文件的内容
let baseDir = "."                                               //遍历的起始文件夹
let exceptDir = ['_book', '.git', 'node_modules', 'unsorted', 'images']   //排除的文件
let targetFile = './SUMMARY.md'                                 //目标文件

//start
let start = () => {
    recursive(baseDir, 0)
    fs.writeFileSync(targetFile, finalContent);
}

//递归遍历
let recursive = (dir, num) => {
    fs.readdirSync(dir).forEach((it) => {
        if (exceptDir.includes(it)) return
        let isFile = fs.statSync(path.join(dir, it)).isFile()
        if (isFile) {
            if (dir == '.') return             //首层的文件排除
            generateLine(num, dir, it)
        } else {
            generateLine(num, it, null)
            recursive(`${dir}/${it}`, num + 1)
        }
    })
}

//生成一行数据
let generateLine = (num, dir, file) => {
    let blank = getBlank(num)
    if (file == null) {
        appendLine(`${blank}- ${dir}\n`)
    } else {
        let fileName = file.substring(0, file.lastIndexOf("."))
        appendLine(`${blank}- [${fileName}](${dir}/${file})\n`)
    }
}

//获取空格
let getBlank = (num) => {
    let result = ""
    let i = 0
    while (i++ < num) {
        result += "  "
    }
    return result
}

//追加一列，line需自带换行
let appendLine = (line) => {
    finalContent += line
}

start()
console.log("成功生成目录");