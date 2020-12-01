from tiki_bar import Tiki_Bar
import eel

# Set web files folder
eel.init('web')

my_bar = Tiki_Bar('all_drinks.csv')

@eel.expose
def all_ingredients():
    return my_bar.on_hand

@eel.expose
def by_ingredient(ingredient):
    if ingredient in my_bar.on_hand:
        my_bar.on_hand.remove(ingredient)
    else:
        
        my_bar.on_hand.append(ingredient)
    return my_bar.on_hand

@eel.expose
def can_make(exact):
    return my_bar.what_can_i_make(exact=exact)

eel.start('hello.html', size=(900, 550))  # Start




