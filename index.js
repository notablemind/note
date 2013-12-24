
var d = React.DOM
  , types = require('./types')
  , IconDrop = require('./icon-drop')

  , _ = require('lodash')
  , DropIcon = require('dropicon')
  , Tags = require('tags')

function getType(types, name) {
  for (var i=0; i<types.length; i++) {
    if (types[i].name === name) return types[i]
  }
}

var Note = module.exports = React.createClass({
  onData: function (data) {
    this.setState({data: data || {}})
  },

  getDefaultProps: function () {
    return {
      types: types,
      className: '',
      themeClass: ''
    }
  },
  getInitialState: function () {
    return {
      selection: false,
      data: {
        type: 'normal',
        tags: [],
        text: ''
      }
    }
  },
  componentWillMount: function () {
    if (!this.props.on) return
    this.props.on('data', this.onData)
  },
  componentWillUnmount: function () {
    if (!this.props.off) return
    this.props.off('data', this.onData)
  },

  addText: function (text) {
    var full = this.state.data.text + text
      , pos = this.state.data.text.length
    this.changeData({
      text: full
    }, pos)
  },
  changeType: function (type) {
    this.changeData({type: type.name})
  },
  changeData: function (data, selection) {
    data = _.extend({}, this.state.data, data)
    this.setState({
      data: data,
      selection: selection || false
    })
    if (!this.props.set) return
    this.props.set('data', data)
  },
  bounceChange: function (data, selection) {
  },
  changeTags: function (tags) {
    this.changeData({tags: tags})
  },
  focus: function (start) {
    this.refs.input.focus(start)
  },
  selectInput: function () {
    this.refs.input.focus()
  },
  selectTags: function () {
    this.refs.tags.focus()
  },
  selectDrop: function () {
    this.refs.drop.focus()
  },
  boundActions: function () {
    if (!this.props.actions) return {}
    var createAfter = this.props.actions.createAfter
      , actions = _.extend({}, this.props.actions)
    actions.createAfter = function (data, after) {
      data = data || {text: ''}
      data.type = this.state.data.type
      data.tags = []
      createAfter(data, after)
    }.bind(this)
    return actions
  },
  render: function () {
    var type = getType(this.props.types, this.state.data.type || 'normal')
      , actions = this.boundActions()
    if (!type) {
      console.error('Invalid type', this.state.data.type, this.state.data)
      return d.div()
    }
    return d.div({
      className: 'note ' + this.props.className + ' ' + this.props.themeClass,
    }, [
      DropIcon({
        className: this.props.themeClass,
        showSelected: true,
        value: type,
        onChange: this.changeType,
        options: this.props.types,
        onNext: this.selectInput,
        view: IconDrop,
        ref: 'drop',
      }),
      type.view(this.state.data, this.changeData, {
        setSelection: this.state.selection,
        setFocus: this.state.setFocus || this.props.setFocus,
        onFocus: this.props.onFocus,
        onNext: this.selectTags,
        onPrev: this.selectDrop,
        actions: actions,
        keymap: this.props.keymap,
        className: 'body',
        ref: 'input'
      }),
      Tags({
        className: this.props.themeClass,
        onChange: this.changeTags,
        onPrev: this.selectInput,
        onNext: actions.goDown.bind(null, true, true),
        onReturn: actions.createAfter,
        value: this.state.data.tags || [],
        ref: 'tags'
      })
    ])
  }
})
