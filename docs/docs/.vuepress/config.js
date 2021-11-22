
module.exports = {
  title: '板板',
  description: '食用指南',
  themeConfig: {
    nav: [{
      text: '首页',
      link: '/'
    }, {
      text: '板板',
      link: '/banban/help'
    }],
    sidebar: {
      '/': [
        {
          title: '板板',
          collapsable: false,
          children: [
            'banban/help.md'
          ]
        }
      ],
    }
  }
}
