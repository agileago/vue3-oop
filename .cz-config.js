const commitConf = require('./conventionalcommit.json')

const types = []
const scopes = Object.keys(commitConf.commonScopes).map((k) => ({ name: k }))
const scopeOverrides = {}

for (const type of Object.keys(commitConf.types)) {
  const itemType = commitConf.types[type]
  types.push({ value: type, name: itemType.description })
  if (itemType.scopes) {
    scopeOverrides[type] = Object.keys(itemType.scopes).map((k) => ({
      name: k,
    }))
  }
}

module.exports = {
  types,
  scopes,
  scopeOverrides,
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个模块 (可选):',
    customScope: '自定义模块:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  subjectLimit: 100,
  skipQuestions: ['body', 'footer'],
}
