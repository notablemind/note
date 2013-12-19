
var d = React.DOM
  , types = require('./types')
  , _ = require('lodash')

var Note = module.exports = React.createClass({
  onData: function (data) {
    this.setState({data: data})
  },

  getDefaultProps: function () {
    return {
      types: types
    }
  },
  getInitialState: function () {
    return {
      selection: false
    },
  },
  componentWillMount: function () {
    if (!this.props.on) return
    this.props.on(this.onData)
  },
  componentWillUnmount: function () {
    if (!this.props.off) return
    this.props.off(this.onData)
  },


  changeType: function (type) {
    this.setState({type: type.name})
  },
  changeData: function (data) {
    data = _.extend({}, this.state.data, data)
    this.setState({
      data: data,
      selection: false
    })
    this.props.set({data: data})
  },
  render: function () {
    var type = this.props.types[this.state.data.type]
    return d.div({
      className: 'note',
    }, [
      DropIcon({
        className: 'simple-icon',
        value: type,
        onChange: this.changeType,
        options: this.props.types,
        view: IconDrop
      }),
      type.view(this.state.data, this.changeData, {
        setSelection: this.state.selection,
        setFocus: this.state.setFocus || this.props.setFocus,
        onFocus: this.props.onFocus,
        actions: this.props.actions
        keymap: this.props.keymap
      }),
      Tabs({
        onPrev: this.selectInput
      })
    ])
  }
})
    return (
      <div className="note">
        <DropIcon className="simple-icon" value={this.state.data.type}/>
      </div>
    )
  }

