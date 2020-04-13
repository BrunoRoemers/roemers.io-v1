// main entrypoint for js

// fonts
require('typeface-quicksand')
require('typeface-raleway')

// TEMP: alert user when inactive link/button is clicked
window.addEventListener('DOMContentLoaded', (event) => {
    window.addEventListener('click', (event) => {
        const clickTarget = event.target || event.srcElement
        const inactiveLink = closestWith('data-inactive', clickTarget)

        if (inactiveLink === null) return

        alert(`This link is not yet active. I'm working on it :)`)
    })
})

function closestWith(dataLabel, el) {
    if (el === null) return null

    // element has dataLabel applied
    if (el.getAttribute(dataLabel) !== null) return el

    // drill down one level
    return closestWith(dataLabel, el.parentElement)
}
