const kit = require('nokit')

module.exports = (task, option) => {
    option('--env <string>', '设置 node env', 'development')

    task('default', ['dev'], 'default task', () => {
        kit.log('>>>>>>> start >>>>>>>')
    })

    task('tsc-w', 'watch typescript', (opt) => {
        const args = [
            './src/index.tsx',
            '-w',
            '--lib',
            'es2015,dom',
            '--jsx',
            'react'
        ]
        kit.spawn('./node_modules/typescript/bin/tsc', args, {
            prefix: 'TSC | :blue'
        })
    })

    task('tsc-p', 'typescript compile', kit.async(function * (opt) {
        const args = [
            '-p',
            './tsconfig.json'
        ]
        yield kit.spawn('./node_modules/typescript/bin/tsc', args, {
            prefix: 'TSC | :blue'
        })
    }))

    task('dev', ['tsc-w'], 'webpack-dev-server', (opt) => {
        kit.spawn('./node_modules/webpack-dev-server/bin/webpack-dev-server.js', [
            '--progress',
            '--env',
            opt.env,
            '--hot'
        ], {
            prefix: 'WEB | :green'
        })
    })

    task('production, build', ['tsc-p'], 'production build', (opt) => {
        kit.spawn('./node_modules/webpack/bin/webpack.js', [
            '--progress',
            '--env',
            opt.env
        ], {
            prefix: 'BUILD | :black'
        })
    })
}
