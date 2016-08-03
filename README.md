Amanuensis
==========

Web application to handle character sheets for pathfinder games. Based on Node.js and MongoDB.

End User interface goals
========================

- Needs to look like a character sheet
- need custom versions of common values(trip for CMB)
- need to have full justification of values abailable.
- Needs to be readable on Computers, Tablets, and Phones.


Database/Model Goals
====================

- Needs to model multiple systems with the same structure
- needs to syscronize changes from multiple clients.
- Needs to support heiarchal changes, class and system changes need to reflect on Characters.


Structure
=========
sheets made up of cells
cells have
- name/**label**
- text **content**
- calculated **value**


Development Steps
=================

1. display cells as name:content table
2. display cells name|content|value
3. add support for formula content.
4. add display for arbitarly positioned cells.
5. add support for positioning and formatting cells.
6. add support for inheritance.




Setup
=====

1. install nodejs/npm. Procedure varies depending on os.

2. install grunt globally with `npm install -g grunt` (might need to 
run as root/admin)

2. run npm install --dev in the base directory to install prequsites.

3. use grunt to run the server or tests. grunt --help will list tasks. 
At this time 'server' and 'karma' are the most useful.
