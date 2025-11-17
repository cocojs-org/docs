const fs = require('node:fs');
const path = require('node:path');
const packageJson = require('../package.json');

function updateDisplayVersion() {
    const filePath = path.resolve(process.cwd(), './src/view/header-bar.tsx');
    const headerBar = fs.readFileSync(filePath, 'utf8');
    const versionSpanRE = /<span>v(0.0.1.*)<\/span>/;
    const match = versionSpanRE.exec(headerBar);
    if (match) {
        let newVersion = packageJson.dependencies['@cocojs/mvc'];
        if (newVersion.startsWith('^')) {
            newVersion = newVersion.slice(1);
        }
        if (match[1] !== newVersion) {
            const newVersionSpan = `<span>v${newVersion}</span>`;
            const newHeaderBar = headerBar.replace(match[0], newVersionSpan);
            fs.writeFileSync(filePath, newHeaderBar);
        }
    } else {
        throw new Error('更新header-bar组件中的版本号失败！');
    }
}

updateDisplayVersion();
