
# Possible approaches for dealing with different systems.
1. Heavyweight client side module structure with rules. Systems can borrow parts of other systems but each winds up being a web app in it's own right.
    * Likley to result in repeated code, or fragile hiarchies.
2. Build all the directives we can think of and have modules just be 
html partials for character sheets (ama adds anything not included 
by force) 
3. add to the data schema a mapping of property->directive 
that can be configured by the user. Assuming sane users this will be 
fine.  Systems are more like templates, implemented just as empty 
json characters.


So the character itself is a $service,  
