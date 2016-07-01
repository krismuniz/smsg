'use strict'

const _attachment = function () {
  let type = arguments[0].split('/')
  let text = typeof arguments[1] === 'string' ? arguments[1] : ''
  let buttons = arguments[2] instanceof Array ? arguments[2] : []
  let elements = arguments[1] instanceof Array ? arguments[1] : []

  let att = {}

  const isMedia = (s) => {
    switch (s) {
      case 'image':
      case 'video':
      case 'audio':
      case 'file':
        return true
      default:
        return false
    }
  }

  if (isMedia(type[0])) {
    att = {
      type: type[0],
      payload: {
        url: text
      }
    }
  } else if (type[0] === 'template') {
    switch (type[1]) {
      case 'button':
        att = {
          type: 'template',
          payload: {
            template_type: 'button',
            text: text,
            buttons: buttons
          }
        }
        break
      case 'generic':
        att = {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: elements
          }
        }
        break
      default:
        att = {
          type: type[0],
          payload: arguments[1]
        }
        att.payload.template_type = type[1]
    }
  }

  return {
    attachment: att
  }
}

const web_url = function (title, url) {
  if (typeof title !== 'string') {
    throw TypeError(`[smsg#web_url] 'title' must be a string.`)
  }

  if (typeof url !== 'string') {
    throw TypeError(`[smsg#web_url] 'url' must be a string.`)
  }

  return {
    title: title,
    url: url,
    type: 'web_url'
  }
}

const phone_number = function (title, payload) {
  if (typeof title !== 'string') {
    throw TypeError(`[smsg#phone_number] 'title' must be a string.`)
  }

  if (typeof url !== 'string') {
    throw TypeError(`[smsg#phone_number] 'payload' must be a string.`)
  }

  return {
    title: title,
    payload: payload,
    type: 'phone_number'
  }
}

const postback = function (title, payload) {
  if (typeof title !== 'string') {
    throw TypeError(`[smsg#postback] 'title' must be a string.`)
  }

  if (typeof payload !== 'string') {
    throw TypeError(`[smsg#postback] 'payload' must be a string.`)
  }

  return {
    title: title,
    payload: payload,
    type: 'postback'
  }
}

const generic_template = function (elements) {
  if (typeof elements !== 'object') {
    throw TypeError(`[smsg#generic_template] 'elements' must be an array or an object (for single elements).`)
  }

  elements = elements instanceof Array ? elements : [elements]

  return _attachment('template/generic', elements)
}

const image = function (url) {
  if (typeof url !== 'string') {
    throw TypeError(`[smsg#image] 'url' must be a string.`)
  }

  return _attachment('image', url)
}

const video = function (url) {
  if (typeof url !== 'string') {
    throw TypeError(`[smsg#video] 'url' must be a string.`)
  }

  return _attachment('video', url)
}

const audio = function (url) {
  if (typeof url !== 'string') {
    throw TypeError(`[smsg#audio] 'url' must be a string.`)
  }

  return _attachment('audio', url)
}

const file = function (url) {
  if (typeof url !== 'string') {
    throw TypeError(`[smsg#file] 'url' must be a string.`)
  }

  return _attachment('file', url)
}

const button_template = function (text, buttons) {
  if (typeof text !== 'string') {
    throw TypeError(`[smsg#button_template] 'text' must be a string.`)
  }

  if (typeof buttons !== 'object') {
    throw TypeError(`[smsg#button_template] 'buttons' must be an array or an object (for single buttons).`)
  }

  buttons = buttons instanceof Array ? buttons : [buttons]

  return _attachment('template/button', text, buttons)
}

const text = function (text) {
  if (typeof text !== 'string') {
    throw TypeError(`[smsg#text] 'text' must be a string.`)
  }

  return {
    text: text
  }
}

module.exports = {
  _attachment: _attachment,
  audio: audio,
  button_template: button_template,
  file: file,
  generic_template: generic_template,
  image: image,
  phone_number: phone_number,
  postback: postback,
  text: text,
  video: video,
  web_url: web_url
}
