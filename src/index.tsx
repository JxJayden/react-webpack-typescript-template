import * as React from 'react'
import * as ReactDOM from 'react-dom'

import moduleA from './moduleA'

class Index extends React.Component<any, any> {
    async componentWillMount() {
        const res = await moduleA()
        console.log(res) //
    }
    render () {
        return (
            <div className="title">
                Success
            </div>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('app'))
