import { APPEND, INSERT_AFTER, INSERT_BEFORE, PREPEND, REMOVE_AFTER, REMOVE_BEFORE, REMOVE_ALL, ERROR } from './vars.js'
import displayObject from './displayObject.js'

export const afterRefreshList = {
    callbackList: [],

    add(callback){
        this.callbackList.push(callback)
    },

    use(list){
        this.callbackList.forEach(callback => callback(list))
    }
}

export function refreshList(method, list, data) {
    switch (method){
        case APPEND:
            list.append(data.value)
            afterRefreshList.use(list)
            break
        case PREPEND:
            list.prepend(data.value)
            afterRefreshList.use(list)
            break
        case INSERT_AFTER:
            list.insertAfter(data.value, data.after)
            afterRefreshList.use(list)
            break
        case INSERT_BEFORE:
            list.insertBefore(data.value, data.before)
            afterRefreshList.use(list)
            break
        case REMOVE_AFTER:
            list.removeAfter(data.value, data.after)
            afterRefreshList.use(list)
            break
        case REMOVE_BEFORE:
            list.removeBefore(data.value, data.before)
            afterRefreshList.use(list)
            break
        case REMOVE_ALL:
            list.clearList()
            afterRefreshList.use(list)
            break
        default:
            break
    }
}

export function visualListInComponent(component) {
    return function (data) {
        const excludes = ['errorsHandlers']
        const content = displayObject(data, excludes)
        component.refreshContent(content)
    }
}

export function showMessage (box, type) {
    return function (messageText){
        const success = box.querySelector('.success')
        const error = box.querySelector('.error')
        clearMessage(success)
        clearMessage(error)

        const element = type === ERROR ? error : success
        element.textContent = messageText
        element.classList.add('_active')
        clearMessage(element, true)
    }

    function clearMessage (el, animation = false) {
        if(animation){
            setTimeout(() => el.classList.remove('_active'), 2000)
            setTimeout(() => el.textContent = '', 2200)
        } else {
            el.classList.remove('_active')
            el.textContent = ''
        }
    }
}
