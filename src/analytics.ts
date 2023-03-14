import * as $ from "jquery";

function createAnalitycs(): object {
    let counter = 0
    let destroyed: boolean = false

    const listener = (): number => counter++

    $(document).on('click', listener)

    return {
        destroy() {
            $(document).off('click', listener)
            destroyed = true
        },

        getClicks() {
            if (destroyed) {
                return 'Analytics is gdfdfg'
            }
            return counter
        }
    }
}


window['analytics'] = createAnalitycs()