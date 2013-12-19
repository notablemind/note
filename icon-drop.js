
var d = React.DOM

var IconDrop = module.exports = React.createClass({
  render: function () {
    return d.div({className: 'icon-head'}, [
      d.i({
        className: 'fa fa-' + this.props.value.icon,
      }),
      !this.props.head && this.props.value.name
    ])
  }
})

