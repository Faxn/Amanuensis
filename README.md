Amanuensis
==========

Web application to handle character sheets for pathfinder games. Based on Node.js and MongoDB.


Data Schema
===========
XPC:
{
    "name":"Leai",
    "type": "Character",
    "templates":["pathfinder", "Grippli", ], // names of other XPCs. Treats modifiers on those XPCs as if they were on this one.
    "modifiers": [] //list of ids of modifiers
}
    
modifier
{
    "note":"base ac"           // description of why the modifier exists.
    "stat":["AC", "AC_touch"], // list of strings with the names of stats that this applies to.
    "type": ""
    "stacking": "yes"
    "value": "4"
}
