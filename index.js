
var d = React.DOM
  , types = require('./types')
  , IconDrop = require('./icon-drop')

  , _ = require('lodash')
  , DropIcon = require('dropicon')
  , Tabs = require('tabs')

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
    }
  },
  componentWillMount: function () {
    if (!this.props.on) return
    this.props.on(this.onData)
  },
  componentWillUnmount: function () {
    if (!this.props.off) return
    this.props.off(this.onData)
  },

  addText: function (text) {
    var full = this.state.text + text
      , pos = this.state.text.length
    this.changeData({
      text: full
    }, this.state.text.length)
  },
  changeType: function (type) {
    this.setState({type: type.name})
  },
  changeData: function (data, selection) {
    data = _.extend({}, this.state.data, data)
    this.setState({
      data: data,
      selection: selection || false
    })
    this.props.set({data: data})
  },
  selectInput: function () {
    this.refs.input.focus()
  },
  render: function () {
    var type = this.props.types[this.state.data.type]
    return d.div({
      className: 'note',
    }, [
      DropIcon({
        className: 'simple-icon icon-drop',
        value: type,
        onChange: this.changeType,
        options: this.props.types,
        view: IconDrop
      }),
      type.view(this.state.data, this.changeData, {
        setSelection: this.state.selection,
        setFocus: this.state.setFocus || this.props.setFocus,
        onFocus: this.props.onFocus,
        actions: this.props.actions,
        keymap: this.props.keymap,
        ref: 'input'
      }),
      Tabs({
        onPrev: this.selectInput
      })
    ])
  }
})
