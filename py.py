def fruitImgUrl(fruit):
    if fruit == 'banana' or fruit == 'BANANA':
        return 'url1'
    elif fruit == 'pineapple' or fruit == 'PINEAPPLE':
        return 'url2'
    elif fruit == 'pear' or fruit == 'PEAR':
        return 'url3'
    else:
        return 'no image'
