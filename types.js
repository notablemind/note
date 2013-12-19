
var Input = require('input-tree')
  , Twinputs = require('twinputs')
  , ScriptureInput = require('scripture')

function InputHead(data, change, props, children) {
  props.value = data.text
  props.onChange = function (text) {
    change({text: text})
  }
  return Input(props, children)
}

function Question(data, change, props, children) {
  props.value1 = data.text
  props.value2 = data.who
  props.onChange = function (v1, v2) {
    change({text: v1, who: v2})
  }
  return Twinputs(props, children)
}

function Quote(data, change, props, children) {
  props.value1 = data.source
  props.value2 = data.text
  props.onChange = function (v1, v2) {
    change({source: v1, text: v2})
  }
  return Twinputs(props, children)
}

function Scripture(data, change, props, children) {
  props.reference = data.reference
  props.text = data.text
  props.onChange = function (reference, text) {
    change({reference: reference, text: text})
  }
  return ScriptureInput(props, children)
}

module.exports = [
  {
    name: 'normal',
    view: InputHead,
    icon: 'bullet'
  }, {
    name: 'title',
    view: InputHead,
    icon: 'big-bullet'
  }, {
    name: 'idea',
    view: InputHead,
    icon: 'idea'
  }, {
    name: 'question',
    view: Question,
    icon: 'question-mark',
  }, {
    name: 'quote',
    view: Quote,
    icon: 'quotation-mark',
  }, {
    name: 'scripture',
    view: Scripture,
    icon: 'book',
  }
]

