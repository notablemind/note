
var Input = require('input-tree')
  , ScriptureInput = require('scripture-input')
  , request = require('superagent')
  // , Twinputs = require('twinputs')
  // , ImageDrop = require('image-drop')

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
  props.onRefChange = function (reference) {
    change({reference: reference})
    request.get('http://localhost:8080/lookup?ref=' + encodeURIComponent(reference))
      .end(function (err, res) {
        if (err) return console.warn('Error', err)
        if (res.status !== 200) {
          return console.warn('Failed lookup', res.text)
        }
        change({text: res.text})
      })
  }
  props.onTextChange = function (text) {
    change({text: text})
  }
  return ScriptureInput(props, children)
}

function Image(data, change, props, children) {
  props.text = data.text
  props.imgdata = data.imgdata
  props.onChange = function (text, imgdata) {
    change({text: text, imgdata: imgdata})
  }
  return ImageDrop(props, children)
}

module.exports = [
  {
    name: 'normal',
    view: InputHead,
    icon: 'circle-o'
  }, {
    name: 'title',
    view: InputHead,
    icon: 'dot-circle-o'
  }, {
    name: 'idea',
    view: InputHead,
    icon: 'lightbulb-o'
  }, {
    name: 'think-about',
    view: InputHead,
    icon: 'cogs'
  }, {
    name: 'email',
    view: InputHead,
    icon: 'envelope-o',
  }, {
    name: 'todo',
    view: InputHead,
    icon: 'exclamation',
  }, {
    name: 'scripture',
    view: Scripture,
    icon: 'book',
    /*
  }, {
    name: 'question',
    view: Question,
    icon: 'question',
  }, {
    name: 'quote',
    view: Quote,
    icon: 'quote-left',
  }, {
    name: 'image',
    view: Image,
    icon: 'camera'
    */
  }
]

