*XLIDEJS - Créez des sliders et galeries sur votre site web à la volée*
*XLIDEJS - Create sliders and galleries on your website on the fly*


**Commençons par le commencement !**

**Let's start by the beginning !** 
>**Inclure la librairie || Include the library**
>
>La librairie est principalement composée de deux fichiers : xlide.css et xlide.js 
>
>The library is mainly composed of two files: xlide.css and xlide.js:
>
>
>***-xlide.css :***
>
>ce fichier définit le style de base de nos futurs sliders et galeries.  
>this file defines the basic style of our future sliders and galleries.
>
>
>Pour l'inclure rajoutez cette ligne entre les deux balises <body>..</body> de notre fichier html:  
>To include it, add this line between the two <body>..</body> tags of our html file:
>
>
>> ```html                            
>> <link href='xlide.css'/>
>> ```                         
>                        
>***-xlide.js :***
>
>c'est la librairie en tant que telle, toutes les classes et fonctions sont définies dedans. Pour le rajouter au projet rajoutons cette ligne.: 
>
>it's the library as such, all the classes and functions are defined in it. To add it to the project let's add this line:
>
>> ```html                        
>> <script src='xlide.js'>
>> </script>
>> ```                         
>C'est tout, nous n'avons plus qu'à créér nos sliders partout où on veut sur nos sites web.
>Une fois que la librairie est chargée nous avons accès aux fonctions qu'elle nous offre et pouvons nous faire plaisir :)

>That's all, we only have to create our sliders, everywhere we want on our websites.
>Once the library is loaded we have access to the functions it offers us and can make us happy :)

**Créons notre premier \*xlide !**

**Let's create our first \*xlide !** 

>**Définir la cible de notre slider || Define the target of our slider**
>
>Commençons par définir l'élément qui va contenir notre slider, prenons dans notre cas ce div :
>
>Let's start by defining the element that will contain our slider, take in our case this div:
>>```html
>><div class='simpleslide'>
>></div>
>>```
>C'est tout ce dont nous avons besoin côté html, tout le reste sera géré du côté de notre code javascript
>
>That's all we need on the html side, everything else will be handled on our javascript side
>







**La fonction `xl`**

**The `xl` function**
>
>La bibliothèque xlide nous fournit principalement deux fonctions : la fonction `xl` et la fonction `xg`
>
>Elles permettent respectivement la création de sliders simples (`xl`) et de galeries (`xg`).
>
>Ces fonctions renvoient un objet permettant de configurer et d'afficher nos sliders et galeries tel que nous le voulons sur nos pages.


>The xlide library mainly provides us with two functions: the `xl` function and the `xg` function.
>
>They allow the creation of simple sliders (`xl`) and galleries (`xg`), respectively.
>
>These functions return an object allowing us to configure and display our sliders and galleries as we want them on our pages.
>
>