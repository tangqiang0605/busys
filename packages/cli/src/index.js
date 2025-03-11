// generate.js
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mkdirp = require('mkdirp');
const argv = require('minimist')(process.argv.slice(2));

// 检查是否提供了资源名称
if (!argv._[0] || argv._[0] !== 'g') {
  console.error('Usage: 到指定目录下执行 npx busys g <resource_name>');
  process.exit(1);
}

const resourceName = argv._[1];
const resourceNameUpper = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
const resourceDir = path.join(process.cwd(), resourceName);

// 模板目录
const templatesDir = path.join(__dirname, '..', 'templates', argv._[3] ?? 'crud');

// 创建资源目录
mkdirp.sync(resourceDir);

// 渲染模板并生成文件
const templates = [
  { template: 'controller.txt', output: `${resourceName}.controller.ts` },
  { template: 'service.txt', output: `${resourceName}.service.ts` },
  { template: 'module.txt', output: `${resourceName}.module.ts` },
  // { template: 'entity.txt', output: `${resourceName}.entity.ts` },
  // { template: 'dto.txt', output: `${resourceName}.dto.ts` },
];

templates.forEach(({ template, output }) => {
  const templatePath = path.join(templatesDir, template);
  const outputPath = path.join(resourceDir, output);

  // <%= resourceNameUpper %>
  // <%= resourceName %>
  // 渲染模板
  ejs.renderFile(templatePath, { resourceName, resourceNameUpper }, (err, str) => {
    if (err) throw err;

    // 写入文件
    fs.writeFileSync(outputPath, str);
    console.log(`Generated: ${outputPath}`);
  });
});

console.log(`Resource '${resourceName}' generated successfully in '${resourceDir}'. 请马上在app.module中引入本module!!!`);