
var d = React.DOM

var IconDrop = module.exports = React.createClass({
  render: function () {
    return d.div({
      onClick: this.props.onSelect
    }, [
      d.i({
        className: 'fa fa-fw fa-' + this.props.value.icon,
      }),
      !this.props.head && this.props.value.name
    ])
  }
})

