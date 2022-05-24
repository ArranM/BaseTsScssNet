import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
import clear from "rollup-plugin-clear"
import { isDev, files } from "./.build/Rollup"

export default [
    {
        input: [
            ...files("src/assets/ts"),
            ...files("src/assets/ts/pages")
        ],
        output: {
            dir: "wwwroot/assets/js",
            format: "system",
            sourcemap: isDev()
        },
        plugins: [
            clear({
                targets: ['wwwroot/assets/js'],
                watch: true
            }),
            typescript({
                tsconfig: "./tsconfig.json"
            }),
            !isDev() && terser({
                format: {
                    comments: false
                }
            })
        ],
    }, {
        input: 'node_modules/systemjs/dist/s.js',
        output: {
            file: 'wwwroot/assets/lib/system.js'
        },
        plugins: [
            terser({
                format: {
                    comments: false
                }
            })
        ]
    }
]
