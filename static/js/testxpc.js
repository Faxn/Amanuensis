//temporary testing code

var xpc = require("./xpc.js")

console.log(xpc)

var testpc = {
    "name":"leai",
    "modifiers": [
        
    ]
}

var testmods = [
        {
            "stat":["dexterity"],
            "value":10,
            "note":'base'
        },
        {
            "stat":["strength"],
            "value":10,
            "note": 'base'
        },
        {
            "stat":["dexterity"],
            "type":"racial",
            "value":2
        },
        {
            "stat":["strength"],
            "type":"racial",
            "value":-2,
            "stacking":true
        },
        {
            "stat":["strength"],
            "type":"racial",
            "value":+4,
            "stacking":true
        }
]

var mods = xpc.merge_mods(testmods)
console.log("####################\n",mods)
var stats = xpc.calc_simple_stats(mods)
console.log("####################\n",stats)
