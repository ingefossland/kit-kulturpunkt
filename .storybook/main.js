module.exports = {
    "stories": [
        //        "../src/**/*.stories.mdx",
        //        "../src/**/*.stories.@(js|jsx|ts|tsx)"
//        "../src/components/Kp*/*.stories.mdx",
//        "../src/components/Nav*/*.stories.@(js|jsx|ts|tsx|mdx)",
        "../src/components/*View/*.stories.@(js|jsx|ts|tsx|mdx)",
        "../src/components/Kp*/*.stories.@(js|jsx|ts|tsx|mdx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app"
    ]
}